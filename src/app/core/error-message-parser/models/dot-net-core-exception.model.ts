export class DotNetCoreException {
    ClassName: string;
    Message: string;
    Data: string;
    InnerException?: DotNetCoreException;
    HelpURL: string;
    StackTraceString: string;
    RemoteStackTraceString: string;
    RemoteStackIndex: number;
    ExceptionMethod: string;
    HResult: number;
    Source: string;
    WatsonBuckets: string;
}