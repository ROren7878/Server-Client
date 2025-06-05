export class Order {
    constructor(
        public id : number,
        public orderDate : Date,
        public orderSum : number,
        public userId : number
    ){}
}
