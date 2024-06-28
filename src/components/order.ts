import { IContactsForm, IEvents, IPaymentForm, PaymentType } from "../types";
import { ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { Form } from "./common/form";

export class PaymentForm extends Form<IPaymentForm> {
    protected _paymentOnline: HTMLButtonElement;
    protected _paymentCash: HTMLButtonElement;
    constructor(container: HTMLFormElement, events: EventEmitter) {
        super(container , events);

        this._paymentOnline = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
        this._paymentCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);

        this._paymentOnline.addEventListener('click', () => {
            this.payment = 'online';
            this.onInputChange('payment', 'online')
        })

        this._paymentCash.addEventListener('click', () => {
            this.payment = 'cash';
            this.onInputChange('payment', 'cash')
        })
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }

    set payment(value: PaymentType) {
        this.toggleClass(this._paymentOnline, 'button_alt-active', value === 'online');
        this.toggleClass(this._paymentCash, 'button_alt-active', value === 'cash');
    }
}

export class ContactForm extends Form<IContactsForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}