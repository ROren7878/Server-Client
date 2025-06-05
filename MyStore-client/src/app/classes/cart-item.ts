import { Product } from "./product";

export class CartItem {
        constructor(
        public index: number,
        public product: Product,
        public quantity:number
    ) {}
}
