import express from "express";
import getProductController from "../controllers/products/getProducts.controller";

const router = express.Router();

router.get("/", async (req, res) => {
    const controller = new getProductController();
    const response = await controller.getProducts(req.query.search?.toString() ??'', Number(req.query.take)?? null, Number(req.query.skip)?? null);
    return res.send(response);
});

export default router;
