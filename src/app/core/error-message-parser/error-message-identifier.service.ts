import { Injectable } from '@angular/core';

import { SignalRError } from './models/signalr-error.model';
import { DotNetException } from './models/dot-net-exception.model';
import { DotNetCoreException } from './models/dot-net-core-exception.model';
import { MessageDetailError } from './models/message-detail-error.model';
import { DotNet5Exception } from './models/dot-net-5-exception.model';

@Injectable({
    providedIn: 'root'
})
export class ErrorMessageIdentifierService {

    constructor() { }

    // https://stackoverflow.com/questions/12789231/class-type-check-with-typescript#40718205
    isMessageDetailError(error: any): error is MessageDetailError {
        return (
            error != null &&
            (<MessageDetailError>error).message !== undefined &&
            (<MessageDetailError>error).messageDetail !== undefined
        );
    }

    // https://stackoverflow.com/questions/12789231/class-type-check-with-typescript#40718205
    isDotNetException(error: any): error is DotNetException {
        return (
            error != null &&
            (<DotNetException>error).message !== undefined &&
            (<DotNetException>error).exceptionMessage !== undefined &&
            (<DotNetException>error).exceptionType !== undefined &&
            (<DotNetException>error).stackTrace !== undefined
        );
    }

    isDotNetCoreException(error: any): error is DotNetCoreException {
        return (
            error != null &&
            (<DotNetCoreException>error).ClassName !== undefined &&
            (<DotNetCoreException>error).Message !== undefined &&
            (<DotNetCoreException>error).Data !== undefined &&
            (<DotNetCoreException>error).InnerException !== undefined &&
            (<DotNetCoreException>error).HelpURL !== undefined &&
            (<DotNetCoreException>error).StackTraceString !== undefined &&
            (<DotNetCoreException>error).RemoteStackTraceString !== undefined &&
            (<DotNetCoreException>error).RemoteStackIndex !== undefined &&
            (<DotNetCoreException>error).ExceptionMethod !== undefined &&
            (<DotNetCoreException>error).HResult !== undefined &&
            (<DotNetCoreException>error).Source !== undefined &&
            (<DotNetCoreException>error).WatsonBuckets !== undefined
        );
    }

    isDotNet5Exception(error: any): error is DotNet5Exception {
        return (
            error != null &&
            (<DotNet5Exception>error).stackTrace !== undefined &&
            (<DotNet5Exception>error).message !== undefined &&
            (<DotNet5Exception>error).data !== undefined &&
            (<DotNet5Exception>error).innerException !== undefined &&
            (<DotNet5Exception>error).helpLink !== undefined &&
            (<DotNet5Exception>error).source !== undefined &&
            (<DotNet5Exception>error).hResult !== undefined
        );
    }

    // https://stackoverflow.com/questions/12789231/class-type-check-with-typescript#40718205
    isSignalRError(err: any): err is SignalRError {
        return (
            (<SignalRError>err).context !== undefined &&
            (<SignalRError>err).context.readyState !== undefined &&
            (<SignalRError>err).context.responseText !== undefined &&
            (<SignalRError>err).context.status !== undefined &&
            (<SignalRError>err).context.statusText !== undefined &&
            (<SignalRError>err).source !== undefined &&
            (<SignalRError>err).source.readyState !== undefined &&
            (<SignalRError>err).source.responseText !== undefined &&
            (<SignalRError>err).source.status !== undefined &&
            (<SignalRError>err).source.statusText !== undefined
        );
    }
}
