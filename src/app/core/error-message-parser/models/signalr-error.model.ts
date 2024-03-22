export class SignalRError {
    source: Source;
    context: Context;
}

export class Source {
    readyState: number;
    responseText: string;
    status: number;
    statusText: string;
}

export class Context {
    readyState: number;
    responseText: string;
    status: number;
    statusText: string;
}
