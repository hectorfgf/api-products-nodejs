import { Get, Route, Tags, Post, Body, Path, Query } from "tsoa";
import { Product } from "../../models";
import {
    getProducts,
} from "../../repositories/products/getProducts.repository";


@Route("getProducts")
@Tags("Product")
export default class getProductsController {

    @Get("/")
    public async getProducts(@Query() search: string, @Query() take:number, @Query() skip:number): Promise<Array<Product>> {
        return getProducts(search, take, skip);
    }
}
