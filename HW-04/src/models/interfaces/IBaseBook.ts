export interface IBaseBook {
    readonly id: string;
    title: string;
    author: string;

    print(): void;
}
