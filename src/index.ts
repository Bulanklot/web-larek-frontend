import { AppData } from './components/appData';
import { ContactForm, PaymentForm } from './components/order';
import { Page } from './components/page';
import { ApiLarek } from './components/apiLarek';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/common/modal';
import { Basket } from './components/basket';
import { Complete } from './components/complete';
import './scss/styles.scss';
import { IContactsForm, IOrder, IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductView } from './components/product';

const productTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productListTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const completeTemplate = ensureElement<HTMLTemplateElement>('#success');

const api = new ApiLarek(CDN_URL, API_URL);
const events = new EventEmitter();

events.onAll(({eventName, data }) => {
    console.log(eventName, data);
});

const appData = new AppData(events);

const page = new Page(events, document.body);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const paymentForm = new PaymentForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactForm(cloneTemplate(contactsFormTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const complete = new Complete(cloneTemplate(completeTemplate), events);

events.on('order:result', () => {
    appData.clearBasket();
    modal.close();
})
events.on('card:select', (item: IProduct) => {
    appData.setPreview(item);
})
events.on('items:change', (items: IProduct[]) => {
    page.catalog = items.map(item => {
        const product = new ProductView(cloneTemplate(productListTemplate),{
            onClick: () => {
                events.emit('card:select', item);
            }
        })
        return product.render(item);
    })
})

events.on('order:submit', () => {
    modal.render({
        content: contactsForm.render({
            email: '',
            phone: '',
            valid: false,
            errors: []
        })
    });
});

events.on('formErrors:change', (errors: Partial<IOrder>) => {
    const { email, phone, address, payment } = errors;
    paymentForm.valid = !address && !payment;
    contactsForm.valid = !email && !phone;
    paymentForm.errors = Object.values({address, payment })
      .filter((i) => !!i)
      .join('; ');
    contactsForm.errors = Object.values({phone, email})
       .filter((i) => !!i)
       .join(': ');
});

events.on(/^contacts\..*:change/, (data: {field: keyof IContactsForm; value: string}) => {
    appData.setOrder(data.field, data.value);
});

events.on(/^order\..*:change/, (data: {field: keyof IContactsForm; value: string}) => {
  appData.setOrder(data.field, data.value);
})

events.on('order:open', () => {
    modal.render({
        content: paymentForm.render({
            payment: 'online',
            address: '',
            valid: false,
            errors: [],
        }),
    });
});

events.on('contacts:submit', () => {
    api.orderList(appData.order)
      .then(result => {
        modal.render({
            content: complete.render({
                  total: result.total
            })
        })
      })
      .catch(err => console.log(err))
} )

events.on('preview:change', (item:IProduct) => {
 const product = new ProductView(cloneTemplate(productTemplate), {
    onClick: () => {
        if(appData.inBasket(item)) {
            appData.removeFromBasket(item);
            product.buttonTitle = 'В корзину';
        } else {
            appData.addToBasket(item);
            product.buttonTitle = 'Убрать из корзины';
        }
    }
 })
 product.buttonTitle = appData.inBasket(item) ? 'Убрать из корзины' : 'В корзину';

 modal.render({
    content: product.render({
        title: item.title,
        description: item.description,
        image: item.image,
        price: item.price,
        category: item.category,
    })
 });
});

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    })
});

events.on('basket:change', () => {
    page.counter = appData.basket.items.length;
    basket.items = appData.basket.items.map((id, index) => {
        const item = appData.items.find(item => item.id === id);

        const product = new ProductView(cloneTemplate(productBasketTemplate), {
            onClick: () => {
                appData.removeFromBasket(item);
            }
        })
        return product.render({
            index: String(index + 1),
            title: item.title,
            price: item.price
        });
    })
    basket.total = appData.basket.total;
});

events.on('modal:open', () => {
    page.locked = true;
});


events.on('modal:close', () => {
    page.locked = false;
})

api.getProductList()
.then(appData.setItems.bind(appData))
.catch(err => console.log(err));



