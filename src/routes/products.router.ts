import express from "express";
import getProductController from "../controllers/products/getProducts.controller";
import createProductsController from "../controllers/products/createProducts.controller";

const router = express.Router();

router.get("/", async (req, res) => {
    const controller = new getProductController();
    const response = await controller.getProducts(req.query.search?.toString() ??'', Number(req.query.take)?? null, Number(req.query.skip)?? null);
    return res.send(response);
});

router.post("/", async (req, res) => {
    const controller = new createProductsController();
    const response = await controller.createProduct(req.body);
    return res.send(response);
});

export default router;
