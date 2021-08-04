import { getRepository } from "typeorm";
import { mocked } from "ts-jest/utils";
import {generateProductData, generateProductPayload, generateProductsData} from "../utils/generateProducts";
import * as createProductRepository from "../../src/repositories/products/createProducts.repository";
import {Product} from "../../src/models";


jest.mock("typeorm");

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
    mockedGetRepo.find.mockClear();
});


describe("createProductRepository", () => {
    describe("createProduct", () => {
        test("should add product to the database", async () => {
            const payload = generateProductPayload()
            const productData = generateProductData(payload)
            mockedGetRepo.save.mockResolvedValue(productData)
            const product = await createProductRepository.createProduct(payload);
            expect(product).toMatchObject(payload)
            expect(product).toEqual(productData)
            expect(mockedGetRepo.save).toHaveBeenCalledWith({... new Product(payload),... payload})
            expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
        })
    });
});
