export class MaterialColumn {
    displayName: string;
    backendFieldName: string;
    searchable: boolean = true;

    constructor(init?: Partial<MaterialColumn>) {
        Object.assign(this, init);

        if (!init.hasOwnProperty('displayName')) {
            throw new Error('A propriedade displayName é obrigatória.')
        }

        if (this.isNullOrWhiteSpace(this.displayName)) {
            throw new Error('A propriedade displayName deve ser preenchida.')
        }

        if (!init.hasOwnProperty('backendFieldName')) {
            this.backendFieldName = this.displayName;
        }

        if (this.backendFieldName === undefined || this.backendFieldName === null) {
            this.searchable = false;
        }
    }

    get hasBackendField(): boolean {
        return this.backendFieldName !== undefined && this.backendFieldName !== null;
    }

    private isNullOrWhiteSpace(str: string): boolean {
        return str === undefined || str === null && str.match(/^\s*$/) !== null;
    }
}