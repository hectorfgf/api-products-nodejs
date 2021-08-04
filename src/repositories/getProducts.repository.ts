import {getRepository} from "typeorm";
import { Product } from "../models";

export const getProducts = async (search:string, take:number, skip:number): Promise<Array<Product>> => {
    const productRepository = getRepository(Product);
    let options:any = {take: 10, skip: 0};
    if(search){
        options ={...options, where: `name LIKE '%${search}%'`};
    }
    if(take){
        options = {...options, take: take};
    }
    if(skip){
        options = {...options, skip: skip};
    }
    return productRepository.find(options)
};
