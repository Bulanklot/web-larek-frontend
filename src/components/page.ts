import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";
import { IPage } from "../types";
import { View } from "./base/view";

export class Page extends View<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;


    constructor(events: EventEmitter , container: HTMLElement) {
        super(events, container);

        this._counter = ensureElement('.header__basket-counter');
        this._catalog = ensureElement('.gallery');
        this._wrapper = ensureElement('.page__wrapper');
        this._basket = ensureElement('.header__basket');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (!value) {
           this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
        } else {
            this.toggleClass(this._wrapper, 'page__wrapper_locked');
        }
    }
}