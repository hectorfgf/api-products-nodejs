import getProductsController from "../../src/controllers/products/getProducts.controller";
import * as getProductsRepository from "../../src/repositories/products/getProducts.repository";
import { generateProductsData } from "../utils/generateProducts";

afterEach(() => {
    jest.resetAllMocks();
});

describe("getProductsController", () => {
    describe("getProducts", () => {
        test("should return empty array", async () => {
            const spy = jest
                .spyOn(getProductsRepository, "getProducts")
                .mockResolvedValueOnce([]);
            const controller = new getProductsController();
            const porducts = await controller.getProducts('',10,0);
            expect(porducts).toEqual([]);
            expect(spy).toHaveBeenCalledWith('',10,0);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test("should return user list", async () => {
            const productsData = generateProductsData(2);
            const spy = jest
                .spyOn(getProductsRepository, "getProducts")
                .mockResolvedValueOnce(productsData);
            const controller = new getProductsController();
            const porducts = await controller.getProducts('',10,0);
            expect(porducts).toEqual(productsData);
            expect(spy).toHaveBeenCalledWith('',10,0);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test("should return product list with the search", async () => {
            const name = "test";
            const productsData = generateProductsData(1,{name});
            const spy = jest
                .spyOn(getProductsRepository, "getProducts")
                .mockResolvedValueOnce(productsData);
            const controller = new getProductsController();
            const products = await controller.getProducts(name,10,0);
            expect(products).toEqual(productsData);
            expect(spy).toHaveBeenCalledWith(name,10,0);
            expect(spy).toHaveBeenCalledTimes(1);
        })

        test("should return product list paginate", async () => {
            const productsData = generateProductsData(7);
            const spy = jest
                .spyOn(getProductsRepository, "getProducts")
                .mockResolvedValueOnce(productsData);
            const controller = new getProductsController();
            const products = await controller.getProducts('',7,0);
            expect(products.length).toEqual(7);
            expect(spy).toHaveBeenCalledWith('',7,0);
            expect(spy).toHaveBeenCalledTimes(1);
        })
    });
});
