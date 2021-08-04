import * as getProductRepository from "../../src/repositories/products/getProducts.repository";
import { getRepository } from "typeorm";
import { mocked } from "ts-jest/utils";
import {generateProductData, generateProductsData} from "../utils/generateProducts";


jest.mock("typeorm", () => {
    return {
        getRepository: jest.fn().mockReturnValue({
            find: jest.fn(),
        }),
        PrimaryGeneratedColumn: jest.fn(),
        Column: jest.fn(),
        Entity: jest.fn(),
        ManyToOne: jest.fn(),
        OneToMany: jest.fn(),
        JoinColumn: jest.fn(),
        CreateDateColumn: jest.fn(),
        UpdateDateColumn: jest.fn(),
    };
})

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}));
beforeEach(() => {
    mockedGetRepo.find.mockClear();
});


describe("getProductRepository", () => {
    describe("getProducts", () => {
        test("should return empty array", async () => {
            mockedGetRepo.find.mockResolvedValue([]);
            const users = await getProductRepository.getProducts('',10,0);
            expect(users).toEqual([]);
            expect(mockedGetRepo.find).toHaveBeenCalledWith({"skip": 0, "take": 10});
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        });

        test("should return product list", async () => {
            const productsData = generateProductsData(2);
            mockedGetRepo.find.mockResolvedValue(productsData);
            const products = await getProductRepository.getProducts('',10,0);
            expect(products).toEqual(productsData);
            expect(mockedGetRepo.find).toHaveBeenCalledWith({"skip": 0, "take": 10});
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        });

        test("should return product list with the search from the database", async () => {
            const name = "test";
            const productsData = generateProductsData(1,{name});
            mockedGetRepo.find.mockResolvedValue(productsData);
            const products = await getProductRepository.getProducts(name,10,0);
            expect(products).toEqual(productsData);
            expect(mockedGetRepo.find).toHaveBeenCalledWith({"where": `name LIKE '%${name}%'`, "skip": 0, "take": 10});
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        })

        test("should return product list paginate", async () => {
            const productsData = generateProductsData(7);
            mockedGetRepo.find.mockResolvedValue(productsData);
            const products = await getProductRepository.getProducts('',7,0);
            expect(products.length).toEqual(7);
            expect(mockedGetRepo.find).toHaveBeenCalledWith({"skip": 0, "take": 7});
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        })
    });
});
