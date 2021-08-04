import {ConnectionOptions} from 'typeorm'

const config : ConnectionOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER || "test",
    password: process.env.MYSQL_PASSWORD || "secret",
    database: process.env.MYSQL_DATABASE || "bd",
    entities: [],
    synchronize: true,
    logging: false,
}

export default config
