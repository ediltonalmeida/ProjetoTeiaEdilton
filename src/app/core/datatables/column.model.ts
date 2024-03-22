import { Search } from './search.model';

export class Column {
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
    search: Search = new Search();

    public constructor(init?: Partial<Column>) {
        Object.assign(this, init);
    }
}