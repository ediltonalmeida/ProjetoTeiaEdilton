import { NgZone } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import "jquery";
import * as signalR from "@microsoft/signalr";
declare var $: JQueryStatic;

import { ConnectionData } from './connection-data.model';
import { CallbackMethod } from './callback-method.model';

export abstract class SignalRService<TReturn> {
    private originalConnectionId: string;
    private connectionData: ConnectionData;
    private callbackMethods: CallbackMethod[] = [];

    constructor(private ngZone: NgZone) {
        this.registerCallbacks();
    }

    abstract get hubName(): string;
    abstract registerCallbacks(): void;

    createObservable(
        httpObservableFunction: (connectionId: string) => Observable<TReturn>,
        progressSubscription: Subscription,
        cancellation: Subject<void>
    ): Observable<TReturn> {

        return new Observable((observer) => {
            let theConnectionId: string;

            this.getConnectionId()
                .subscribe(
                    (connectionId) => {
                        theConnectionId = connectionId;

                        httpObservableFunction(connectionId)
                            .pipe(takeUntil(cancellation))
                            .subscribe(
                                (data) => observer.next(data),
                                error => observer.error(error),
                                () => {
                                    this.stopConnection();
                                    progressSubscription.unsubscribe();

                                    observer.complete();
                                }
                            )
                    },
                    (error) => observer.error(error),
                );

            const unsubscribe = (): void => {
                this.stopConnection();
            }

            return unsubscribe;
        });
    }

    protected addCallbackMethod(methodName: string, callbackFunction: (...msg: any[]) => void): any {
        this.callbackMethods.push({
            name: methodName,
            callbackFunction: callbackFunction
        });
    }

    private getConnectionId(): Observable<string> {
        return this.startConnection()
            .pipe(
                first()
            );
    }

    private startConnection(): Subject<string> {
        const connectionIdSubscription = new Subject<string>();
        let connection = new signalR.HubConnectionBuilder()
            .withUrl('./signalr/' + this.hubName, signalR.HttpTransportType.ServerSentEvents)
            .withAutomaticReconnect()
            //.configureLogging(signalR.LogLevel.Information)
            .build();

        for (let callbackMethod of this.callbackMethods) {
            connection.on(
                callbackMethod.name,
                (...msg: any[]) => {
                    // ngZone é necessário para ativar o changeDetection no Angular
                    this.ngZone.run(() => callbackMethod.callbackFunction(...msg));
                }
            );
        }

        connection.start()
            .then(() => {
                let isFirstTime = this.connectionData == undefined;

                this.connectionData = new ConnectionData(connection);

                if (isFirstTime) {
                    this.originalConnectionId = connection.connectionId;
                } else {
                    this.updateConnectionId(connection.connectionId)
                }

                connectionIdSubscription.next(connection.connectionId);
            })
            .catch((error: any) => {
                connectionIdSubscription.error(error);
            });

        connection.onreconnecting(error => {
            console.log("Erro na conexão do SignalR: " + error);
            console.log("Tentando a reconexão do SignalR...");
        });

        connection.onreconnected(connectionId => {
            this.updateConnectionId(connectionId);
        });

        connection.on("error", (function (error) {
            console.log('Erro no SignalR: ' + error);
        }));

        return connectionIdSubscription;
    }

    private updateConnectionId(newConnectionId: string) {
        this.connectionData.connection
            .invoke('UpdateClientConnectionId', {
                ConnectionId: this.originalConnectionId,
                NewConnectionId: newConnectionId,
            })
            .then(function () {
                console.log('Conexão SignalR restabelecida com sucesso.');
            })
            .catch(function (error) {
                console.log('Erro ao enviar a connectionId do SignalR para o servidor: ' + error);
            });
    }

    private stopConnection(): void {
        let connectionData = this.connectionData;
        this.connectionData = undefined;
        this.originalConnectionId = undefined;

        if (!connectionData) return;

        connectionData.connection.stop();
        connectionData.connection = undefined;
    }

};