import ProductController from "../../src/controllers/products/createProducts.controller";
import * as createProductRepository from "../../src/repositories/products/createProducts.repository";
import {
    generateProductData,
    generateProductPayload,
} from "../utils/generateProducts";

afterEach(() => {
    jest.resetAllMocks();
});

describe("createProductController", () => {
    describe("createProduct", () => {
        test("should add product to the database", async () => {
            const payload = generateProductPayload();
            const productData = generateProductData(payload);
            const spy = jest
                .spyOn(createProductRepository, "createProduct")
                .mockResolvedValueOnce(productData);
            const controller = new ProductController();
            const product = await controller.createProduct(payload);
            expect(product).toMatchObject(payload);
            expect(product).toEqual(productData);
            expect(spy).toHaveBeenCalledWith(payload);
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });


});
