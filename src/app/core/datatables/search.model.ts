export class Search {
    value: string = "";
    regex: boolean = false;

    public constructor(init?: Partial<Search>) {
        Object.assign(this, init);
    }
}