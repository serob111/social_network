import { Request } from "express";

export type TAuth={
    name:string;
    surname:string;
    username:string;
    password:string
}
export type ReqWithUser = Request & { user?: { id: number } }
