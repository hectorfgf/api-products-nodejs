import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export enum TaxType {
    FOUR = 4,
    TEN = 10,
    TWENTY_ONE = 21
}

export interface ProductPayload {
    name: string;
    description: string;
    price: number;
    tax_type: TaxType;
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column({
        type: "enum",
        enum: TaxType,
        default: TaxType.TWENTY_ONE
    })
    tax_type!: TaxType;

    @Column()
    final_price!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(payload: ProductPayload) {
        this.final_price = Number((payload?.price+((payload?.price*payload?.tax_type)/100)).toFixed(0));
    }

}
