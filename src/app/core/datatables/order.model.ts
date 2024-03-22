export class Order {
    column: number;
    dir: string;

    public constructor(init?: Partial<Order>) {
        Object.assign(this, init);
    }
}