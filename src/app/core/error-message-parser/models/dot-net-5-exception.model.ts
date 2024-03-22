export class DotNet5Exception {
    stackTrace: string;
    message: string;
    data: string;
    innerException?: DotNet5Exception;
    helpLink: string;
    source: string;
    hResult: number;
}