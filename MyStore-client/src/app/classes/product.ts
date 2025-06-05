import { Category } from "./category";
import { Company } from "./company";
import { SubCategory } from "./subcategory";

export class Product {
    constructor(
        public id : number,
        public productName : string,
        public desc : string,
        public price : number,
        public quantity : number,
        public src : string,

        public categoryId?: number,
        public categoryName?: string,

        public subCategoryId?: number,
        public subCategoryName?: string,

        public companyId?: number,
        public companyName?: string
    ) {}
}
