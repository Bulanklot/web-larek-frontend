// интерфейсы для объектов хранящих данные 
export type ApiListResponse<Type> = {
    total: number,
    items: Type []
};

export type ApiPostMethods = 'PUT' | 'POST' | 'DELETE';

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type PaymentType = 'cash' | 'online';

export type OrderForm = Omit<IOrder, 'total' | 'items'>;

export type ProductId = Omit <IProduct, 'id'>

export interface IFormStatus {
    valid: boolean;
    errors: string[];
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

export interface IProduct {
    id: string;
    description: string; 
    image: string;
    title : string;
    category: string;
    price: number | null;
}

export interface IorderResult {
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

export interface ILarekApi {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderList: (order: IOrder) => Promise<IorderResult>;
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
/*
interface IOrder { // данные о пользователе
    payment : string;
    email: string;
    phone: string;
    address : string;
    total: number;
    items: string[];
}

// описываю компоненты 
// каталог
interface ICatalog{ // Каталог
    products : IProduct[];
    getProducts():void;
    setProducts():void;
  }

// корзина
interface IBasket{  // корзина 
    items: IProduct[]
    addCard(card: IProduct):void;
    deleteCard(cardId: string):void;
    cleanBasket():void;
    getCards():void;
  
  }

interface IOrderResult { // ответ от сервера
    id : string;
    total : number;
    error?: string;
}
  

//модель
interface IModelData {
  products: IProduct[];
  basket : IProduct[];
  order: IOrder;
  preview: string | null;
  getProducts():void;
  selectProduct():IProduct;
  addProduct():IProduct;
  removeProductFromBasket():void;
  getBasketProducts():IProduct[];
  clearBasket():void;
  clearOrder():void;
  setOrderField():void;
  validateOrder(data: Record<keyof TFormPayment & TFormContacts, string>): boolean;
}

// отображение в каталоге и в корзине 
type TProductInfoCatalog = Pick<IProduct , 'title' | 'category' | 'image' | 'price'|'id'>;// отоборажение в галерее
type TProductInfoBasket = Pick<IProduct, 'title' | 'price'|'id'>;



type TFormPayment = Pick<IOrder, 'payment'| 'address'>;
type TFormContacts = Pick<IOrder, 'email' | 'phone'>;

enum Events {
    PRODUCT_CHANGED = 'products:changed',
    PRODUCT_OPENED_ON_MODAL = 'product:preview',
    PRODUCT_ADDED_TO_BASKET = 'product:addedToBasket',
    MODAL_OPEN = 'modal:open',
    MODAL_CLOSE = 'modal:close',
    BASKET_OPEN = 'basket:open',
    PRODUCT_REMOVED_FROM_BASKET = 'product:removedFromBasket',
    BASKET_CREATE_ORDER = 'basket:createOrder',
    ORDER_OPEN = 'order:open',
    ORDER_CLEAR = 'order:clear',
    SET_PAYMENT_TYPE = 'order:setPaymentType',
    ORDER_READY = 'order:ready',
    FORM_ERRORS_CHANGED = "form:errorsChanged",
}
*/