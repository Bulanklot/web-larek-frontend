import { Api } from "./base/api";
import { ApiListResponse, ILarekApi, IOrder, IProduct, IorderResult } from "../types";

export class ApiLarek extends Api implements ILarekApi {
    readonly cdn: string;

    constructor (cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get(`/product`).then((data: ApiListResponse<IProduct>) =>
          data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
          }))
        );
    }

    getProductItem(id:string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    orderList(order: IOrder): Promise<IorderResult> {
        return this.post(`/order`, order). then(
            (data: IorderResult) => data
        );
    } 
}