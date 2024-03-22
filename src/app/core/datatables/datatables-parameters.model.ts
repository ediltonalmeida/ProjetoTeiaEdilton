import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { Search } from './search.model';
import { Order } from './order.model';
import { Column } from './column.model';
import { MaterialColumns } from './material-columns';

export class DataTablesParameters {
    draw: number;
    start: number;
    length: number;
    search: Search = new Search();
    order: Order[] = [];
    columns: Column[] = [];

    public constructor(materialColumns: MaterialColumns, sort: MatSort, paginator: MatPaginator, searchTerms: string) {
        const orderedColumn = this.getOrderedColumn(materialColumns.getDisplayedColumns(), sort);

        Object.assign(this,
            {
                draw: 0,
                start: paginator.pageIndex * paginator.pageSize,
                length: paginator.pageSize,
                search: new Search({ value: searchTerms }),
                order: [new Order({ column: orderedColumn, dir: sort.direction })],
                columns: this.getColumns(materialColumns, sort),
            });
    }

    private getColumns(materialColumns: MaterialColumns, sort: MatSort) {
        let columns: Column[] = [];
        let searchableColumns = materialColumns.getSearchableColumns();

        materialColumns.getColumnsForBackend()
            .forEach(element => {

                let sortable = this.isSortable(sort, element.displayName);
                let searchable = this.isSearchable(searchableColumns, element.displayName);

                columns.push(new Column({ name: element.displayName, data: element.backendFieldName, orderable: sortable, searchable: searchable }));
            });

        return columns;
    }

    private isSortable(sort: MatSort, element: string) {
        let sortItem = sort.sortables.get(element);
        let sortable = sortItem != undefined;
        return sortable;
    }

    private isSearchable(searchableColumns: string[], element: string) {
        return searchableColumns.indexOf(element) != -1;
    }

    private getOrderedColumn(displayedColumns: string[], sort: MatSort): any {
        let orderedColumn = displayedColumns.indexOf(sort.active);

        if (orderedColumn == -1) {
            throw new Error("DataTablesParameters - Erro na configuração: A coluna \"" + sort.active + "\" não foi encontrada na array \"displayedColumns\". Certifique-se que existe uma coluna com este nome.");
        }

        if (!sort.sortables.has(sort.active)) {
            throw new Error("DataTablesParameters - Erro na configuração: A coluna \"" + sort.active + "\" não foi configurada como sortable. Certifique-se que a coluna possui a diretiva \"mat-sort-header\".");
        }

        return orderedColumn;
    }

}