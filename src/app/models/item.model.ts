export class Item {
    constructor(
        public id:string,
        public category_id:string,
        public desc:string,
        public cover:string,
        public name:string,
        public uid:string,
        public price:number,
        public rating:number,
        public veg:boolean,
        public variation?:boolean,
        public status?:boolean,
        public quantity?:number,
    ){}
}