import * as getProductRepository from "../../src/repositories/getProducts.repository";
import { getRepository } from "typeorm";
import { mocked } from "ts-jest/utils";
import {generateProductsData} from "../utils/generateProducts";


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
            expect(mockedGetRepo.find).toHaveBeenCalledWith();
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        });

        test("should return product list", async () => {
            const productsData = generateProductsData(2);
            mockedGetRepo.find.mockResolvedValue(productsData);
            const products = await getProductRepository.getProducts('',10,0);
            expect(products).toEqual(productsData);
            expect(mockedGetRepo.find).toHaveBeenCalledWith();
            expect(mockedGetRepo.find).toHaveBeenCalledTimes(1);
        });
    });
});
