// интерфейсы для объектов хранящих данные 
export type ApiListResponse<Type> = {
    total: number,
    items: Type []
};

export type ApiPostMethods = 'PUT' | 'POST' | 'DELETE';

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type PaymentType = 'cash' | 'online';

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export type ProductId = Omit <IProduct, 'id'>;

export interface IProduct {
    index: string;
    id: string;
    description: string; 
    image: string;
    title : string;
    category: string;
    price: number | null;
}

export interface IEvents {
    on <T extends object>(event: string, callback: (data: T) => void): void;
    emit <T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event : string, context? : Partial <T>): (data: T) => void;
}

export interface IPaymentForm {
    payment: PaymentType;
    address: string;
}

export interface IContactsForm {
    email : string;
    phone: string;
}

export interface IOrder extends IPaymentForm , IContactsForm {
    items : string[];
    total : number;
}

export interface IBasket {
    items : string[];
    total : number;
}

export interface IFormStatus {
    valid: boolean;
    errors: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IComplete {
    total: number;
}

export interface IActions {
    onClick : ()=> void;
}

export interface IModal {
    content: HTMLElement;
}

export interface IApiLarek {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderList: (order: IOrder) => Promise<IOrderResult>;
}

export interface IPage {
    catalog: HTMLElement[];
    counter: number;
    locked: boolean;
}

export const categorySettings:{[key:string]: string} = {
    "софт-скил": "card__category_soft",
    "хард-скил": "card__category_hard",
    "кнопка": "card__category_button",
    "дополнительное": "card__category_additional",
    "другое": "card__category_other"
}
