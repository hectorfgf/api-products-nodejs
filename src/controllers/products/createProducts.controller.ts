import { Route, Tags, Post, Body } from "tsoa";
import { Product } from "../../models";
import {
    createProduct,
} from "../../repositories/products/createProducts.repository";
import {ProductPayload} from "../../models/product";


@Route("createProducts")
@Tags("Product")
export default class createProductsController {

    @Post("/")
    public async createProduct(@Body() body: ProductPayload): Promise<Product> {
        return createProduct(body);
    }
}
