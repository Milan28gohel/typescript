export  interface   reg {
    email: string;
    password:number|string;
    successful:Boolean;
    meassage:string;
    dispatch:any;

}

export interface log{
    email:string;
    password:string|number;
    meassage:string;
}

export interface hom{
    data: string;
    due_date: number;
    priority:number;
}