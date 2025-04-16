import mongoose, { Schema, Document } from "mongoose";

interface IUserRequestDatatype {
    about: string,
    resumelink: string,
    firstname: string,
    lastname: string,
    email:string,
    number: number,
    country: string,
    street:string,
    city:string,
    state: string,
    expirence: string,
    currentorg: string,
    currentctc: string,
    expectctc:string,
    relocate:boolean
}

const UserRequestdata = new Schema<IUserRequestDatatype>({
    about : {
        type: String
    }
});