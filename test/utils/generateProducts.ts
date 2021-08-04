import faker from "faker";
import {Product} from "../../src/models";
import {ProductPayload, TaxType} from "../../src/models/product";

export function generateProductData(overide = {}) {
    let product: Product = {
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number(),
        tax_type: Number(faker.random.arrayElement(Object.values(TaxType))),
        createdAt: new Date(),
        updatedAt: new Date(),
        final_price: 0,
        ...overide,
    };
    product.final_price =  calculateFinalPrice(product);
    return product;
}

function calculateFinalPrice(product : Product) {
    return product.price+((product.price*product.tax_type)/100)
}

export function generateProductsData(n: number = 1, overide = {}) {
    return Array.from(
        {
            length: n,
        },
        (_, i) => {
            return generateProductData({ id: i, ...overide });
        }
    );
}

export function generateProductPayload(): ProductPayload {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.datatype.number(),
        tax_type: Number(faker.random.arrayElement(Object.values(TaxType)))
    }
}
