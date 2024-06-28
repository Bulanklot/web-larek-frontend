import { FormErrors, IBasket, IOrder, IProduct, OrderForm, PaymentType } from "../types";
import { EventEmitter } from "./base/events";

export class AppData {
    items: IProduct[] =[];

    basket: IBasket = {
       items: [],
       total: 0
    };

    order: IOrder = {
        address : '',
        payment: 'online',
        email: '',
        phone: '',
        items: [],
        total: 0
    }

    formErrors: FormErrors = {};

    constructor(protected events: EventEmitter) {

    }

    setItems(items: IProduct[]) {
        this.items = items;
        this.events.emit('items: change', this.items);
    }

    setPreview(item: IProduct) {
        this.events.emit('preview:change' , item);
    }

    inBasket(item: IProduct) {
       return this.basket.items.includes(item.id);
    }

    addToBasket(item: IProduct) {
        this.basket.items.push(item.id);
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    removeFromBasket(item: IProduct) {
        this.basket.items = this.basket.items.filter(id => id !== item.id);
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket: change', this.basket);
    }

    setOrder(field: keyof OrderForm, value: string) {
        if(field === 'payment') {
            this.order.payment = value as PaymentType;
        } else {
            this.order[field] = value;
        }

        if(this.order.payment && this.checkValidation()) {
            this.order.items = this.basket.items;
            this.order.total = this.basket.total;
            this.events.emit('order:ready', this.order);
        }
    }

    checkValidation(): boolean {
        const errors : typeof this.formErrors = {};
        if(!this.order.address) {
            errors.address = 'Укажите адрес';
        }
        if(!this.order.email) {
            errors.email = 'Укажите адрес электронной почты';
        }
        if (!this.order.phone) {
            errors.phone = 'Укажите телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change' , this.formErrors);
        return Object.keys(errors).length === 0;
    }
}