export class DataTablesResponse<T> {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: T[];
}