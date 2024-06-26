import { Component } from "./base/component";
import { IActions, ProductId, categorySettings } from "../types";
import { ensureElement } from "../utils/utils";

export class ProductView extends Component<ProductId> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _category?: HTMLElement;
  protected _index?: HTMLElement;

  constructor(container: HTMLElement, actions?:IActions){
    super(container);

    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._image = container.querySelector('.card__image');
    this._button = container.querySelector('.card__button');
    this._description = container.querySelector('.card__text');
    this._category = container.querySelector('.card__category');
    this._index = container.querySelector('.basket__item-index');

    if(actions?.onClick) {
        if(this._button) {
            this._button.addEventListener('click', actions.onClick);
        } else {
            container.addEventListener('click', actions.onClick);
        }
    }
  }

    disablePriceButton(value: number | null) {
    if(!value) {
        if(this._button){
            this.setDisabled(this._button, true);
        }
    }
}

   set id(value: string) {
     this.container.dataset.id = value;
   }

   get id(): string {
    return this.container.dataset.id || '';
   }

   set title(value: string) {
    this.setText(this._title, value);
   }

   get title(): string {
     return this._title.textContent || '';
   }

   set price(value: number | null) {
    this.setText(this._price, (value) ? `${value.toString()} синапсов` : 'Бесценно');
    this.disablePriceButton(value);
   }

   get price(): number {
     return Number(this._price.textContent || '');
   }

   set category(value: string) {
    if (!this._category) return;
    this.setText(this._category, value);
    this._category.classList.add(categorySettings[value]);
   }

   get category(): string {
      return this._category.textContent || '';
   }

   set index(value: number) {
    this.setText(this._index, value);
   }

   set image(value: string) {
    this.setImage(this._image, value, this.title);
   }

   set description(value: string) {
     this.setText(this._description, value);
   }

   set buttonTitle(value:string) {
    if(this._button) {
      this.setText(this._button, value);
    }
   }
}