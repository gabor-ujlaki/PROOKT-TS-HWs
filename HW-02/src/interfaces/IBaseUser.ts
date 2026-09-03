import { IOrder } from './IBaseOrder';

export interface IUser {
    readonly id: string;
    name: string;
    email: string;

    createOrder(): IOrder;
    commitOrder(order: IOrder): void;
}