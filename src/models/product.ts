import { Sku } from "./sku";

export interface Product{
    id:number
    name:string
    price:number
    image:string
    category:string
    description:string
    skus: Array<Sku>
}