import { Address } from "./address.model";
import { Item } from "./item.model";
import { Restaurant } from "./restaurant.model";

export class Order{
    constructor(
        public address:Address,
        public restaurant:Restaurant,
        public restaurant_id:String,
        public order:Item[],
        public total:number,
        public grandTotal:number,
        public deliveryCharge:number,
        public status:String,
        public time:String,
        public paid:string,
        public id?: string,
        public user_id?: string,
        public instruction?: string,

    ){}
}