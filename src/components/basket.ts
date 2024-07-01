import { IBasket } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { EventEmitter } from "./base/events";
import { View } from "./base/view";

export class Basket extends View<IBasket> {
    protected _itemList: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, events: EventEmitter) {
        super(events, container);
        this._itemList = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._button = ensureElement<HTMLElement>('.basket__button', this.container);

        if(this._button){
            this._button.addEventListener('click', ()=> {
                events.emit('order:open');
            });
        }
        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if(items.length) {
            this._itemList.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            this._itemList.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this.setDisabled(this._button, true);
        }
    }

    set total(total: number) {
        this.setText(this._total,(total)?  `${String(total)} синапсов` : '');
    }
}