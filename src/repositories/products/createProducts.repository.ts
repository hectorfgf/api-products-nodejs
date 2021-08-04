import {getRepository} from "typeorm";
import { Product } from "../../models";
import {ProductPayload} from "../../models/product";

export const createProduct = async (payload: ProductPayload): Promise<Product> => {
    const productRepository = getRepository(Product);
    const product = new Product(payload);
    return productRepository.save({
        ...product,
        ...payload,
    });
};
