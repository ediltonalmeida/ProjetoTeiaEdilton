import * as signalR from "@microsoft/signalr";

export class ConnectionData {
    connection: signalR.HubConnection;

    constructor(connection: signalR.HubConnection) {
        this.connection = connection;
    }
}