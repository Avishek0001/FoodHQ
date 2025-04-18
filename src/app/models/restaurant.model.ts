export class Restaurant{
    constructor(
        public uid:string,
        public cover:string,
        public name:string,
        public cuisines:string[],
        public rating:number,
        public delivery_times:number,
        public price:number,
        public address?:string,
        public city?:string,
        public closeTime?:string,
        public openTime?:string,
        public phone?:number,
        public email?:string,
        public shortname?:string,
        public status?:string,
        public distance?:number,
        public isClose?:boolean,
        public totalRating?:number,
    ){}
}