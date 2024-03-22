import { MaterialColumn } from './material-column';

export class MaterialColumns {

    columns: MaterialColumn[] = [];

    public constructor(columns: MaterialColumn[]) {
        this.columns = columns;
    }

    addColumn(column: MaterialColumn) {
        this.columns.push(column);
    }

    getDisplayedColumns(): string[] {
        var columns = this.columns
            .map((value: MaterialColumn) => {
                return value.displayName;
            });

        return columns;
    }

    getSearchableColumns(): string[] {
        var columns = this.columns
            .filter((value: MaterialColumn, index: number) => {
                return value.searchable;
            })
            .map((value: MaterialColumn) => {
                return value.displayName;
            });

        return columns;
    }

    getColumnsForBackend(): MaterialColumn[] {
        return this.columns
            .filter((value: MaterialColumn, index: number, array: MaterialColumn[]) => {
                return value.hasBackendField;
            });
    }

}