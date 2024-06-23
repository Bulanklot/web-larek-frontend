// интерфейсы для объектов хранящих данные 

interface IProduct { // данные о товаре
    title : string;
    image: string;
    id: string;
    category: string;
    price: number | null;
    description: string; 
}

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
  validateOrder():void;
}

// отображение в каталоге и в корзине 
type TProductInfoCatalog = Pick<IProduct , 'title' | 'category' | 'image' | 'price'|'id'>;// отоборажение в галерее
type TProductInfoBasket = Pick<IProduct, 'title' | 'price'|'id'>;



type TFormPayment = Pick<IUser, 'payment'| 'address'>;
type TFormContacts = Pick<IUser, 'email' | 'phone'>;

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
