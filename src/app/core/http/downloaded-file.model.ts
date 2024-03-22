import { HttpResponse } from "@angular/common/http";

export class DownloadedFile {
    data: Blob;
    name: string;

    constructor(res: HttpResponse<Blob>) {
        const contentDisposition = res.headers.get("Content-Disposition");

        this.data = res.body;
        this.name = this.parseFilenameFromContentDisposition(
            contentDisposition
        );
    }

    private parseFilenameFromContentDisposition(
        contentDisposition: string
    ): string {
        if (!contentDisposition) return null;
        let matches = /filename="?([^"]+)"?/g.exec(contentDisposition);
        return matches && matches.length > 1 ? matches[1] : null;
    }
}
