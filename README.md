# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении 


``` интерфейсы для объектов хранящих данные 

Карточка

interface IProduct { // данные о товаре
    title : string;
    image: string;
    id: string;
    category: string;
    price: number | null;
    description: string; 
}

```
Заказ

interface IOrder { // данные о пользователе
    payment : string;
    email: string;
    phone: string;
    address : string;
    total: number;
    items: string[];
}

``` 
класс Каталог

interface ICatalog{ // Каталог
    products : IProduct[]; - массив товаров который получим из модели
    getProducts():void; - получаем массив из модели для каталога
    setProducts():void; - заполняем каталог
  }

```
класс Корзина 

interface IBasket{  // корзина 
    items: IProduct[] - массив товаров добавленных в корзину, будем получать этот массив из модели
    addCard(card: IProduct):void; - добавление карточки в корзину
    deleteCard(cardId: string):void; - удаление карточки из корзины 
    cleanBasket():void; - очищение корзины в случае успешного заказа
    getCards():void; - получить карточки добавленные в корзину 
  }

```
Интерфейс для данных полученных от сервера 

interface IOrderResult { // ответ от сервера
    id : string;
    total : number;
    error?: string;
}

```
Данные карточки , используемые для отображения в  Галереи


type TProductInfoCatalog = Pick<ICArd , 'title' | 'category' | 'image' | 'price'>;

``` 
Данные карточки , используемые для отображения в  Корзине

type TProductInfoBasket = Pick<ICArd, 'title' | 'price'>;


``` 
Интерфейс для модели данных\

Класс IModelData
Отвечает за хранение данных приложения\

interface IModelData {
  Поля:
- products: IProduct[]; -массив товаров
- basket : IProduct[]; - массив товаров в корзине
- order: IOrder; - заказ 
- preview: string | null - id товара для отображения в модальном окне
  Методы:
  - getProducts - получаем товары для главной страницы из данных от сервера
  - selectProduct- выбор продукта для отображения в модальном окне 
  - addProduct  - добавление товара в корзину 
  - removeProductFromBasket - удаление товара из корзины 
  - getBasketProducts - получение списка товаров в корзине
  - clearBasket - очищаем корзину
  - сlearOrder - очищаем заказ, в случае успешного оформления
  - setOrderField - устанавливаем полученные значения из полей ввода в поле заказа
  - validateOrder - валидация полей заказа и установка значений ошибок , если таковые имеются
}

``` 

Данные пользователя в форме оплаты

type TFormPayment = Pick<IUserData, 'payment'| 'address'>;

```
Данные пользователя в форме контактов

type TFormContacts = Pick<IUserData, 'email' | 'phone'>;

## Архитектура приложения

Код приложения разделён на слои согласно архитектуре MVP:
- слой отоборажения , отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных 
- презентер, отвечает за связь между слоями отображения и данными.

### Базовый Код 

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: 
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие   

#### Основные события :
- `products:changed` - изменение списка товаров
- `product:preview` - просмотр товара в модальном окне
- `product:addedToBasket` - товар добавлен в Корзину
- `modal:open` - открытие модального окна 
- `modal:close` - закрытие модального окна 
- `basket:open` - открытие корзины
- `product:removedFromBasket` - удаление товара из корзины
- `basket:createOrder` - оформление заказа
- `order:open` - открытие формы заказа
- `order:clear` - очистка формы заказа
- `order:setPaymentType` - выбор типа оплаты
- `form:errors-changed` - показ(скрытие) ошибок формы
- `order:ready` - заказ оформлен

#### Классы представления
``` 
Класс PageView - отвечает за отображение отображение главной страницы 
Поля:
Cчётчик Корзины:
Каталог:
Конструктор будет принимать на вход данные из модели и заполнять соответсвующие поля
каталог
счётчик корзины.

Класс ProductView - будет отвечать за отображение карточек товара на главной странице 
У него будут поля 
Template - шаблон для создания карточек 
title - название 
category- категория 
image - изображение товара
price - цена товара

Конструктор этого класса будет принимать - данные карточки -
и заполять поля title , category, image, price в клонированном шаблоне
и возвращать готовый элемент разметки.

Класс ProductModalView - будет отвечать за отображение модального окна  c товаром 
Поля : 
Модальное окно - окно для карточки товара 
Конструктор будет принимать на вход данные выбранного товара из модели (
  и будет заполнять поля модального окна в разметке (Заполняем 
  
)

Render() - отображение в модальном окне выбранной  карточки
;
```
Класс BasketModalView - отвечает за отображение модального окна с корзиной, на вход будет принимать элемменты
Поля : 
Модальное окно - элемент разметки 
список товаров 
сумма 
Конструктор на вход принимает (данные из модели  ){
  находит в разметке модальное окно в разметке - заполняет поле модальное окно данными
  список товаров 
  сумма 
}
Render() - отрисовывает в модальном окне 
```
