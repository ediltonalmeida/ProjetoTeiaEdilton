export class DotNetException {
    message: string;
    exceptionMessage: string;
    exceptionType: string;
    stackTrace: string;
    innerException?: DotNetException;
}