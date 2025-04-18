export class Address{
    constructor(
        public id:string,
        public user_id:string,
        public address:string,
        public landmark:string,
        public lat?:number,
        public lng?:number,
        public street?:string,
        public title?:string,
        public house?:string,

    ){}
}