import {ConnectionOptions} from 'typeorm'
import {Product} from "../models";

const config : ConnectionOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER || "test",
    password: process.env.MYSQL_PASSWORD || "secret",
    database: process.env.MYSQL_DATABASE || "bd",
    entities: [Product],
    synchronize: true,
    logging: false,
}

export default config
