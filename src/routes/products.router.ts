import express from "express";
import getProductController from "../controllers/products/getProducts.controller";
import createProductsController from "../controllers/products/createProducts.controller";
import AuthCheckMiddleware from "../middleware/check_auth.middleware";

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const controller = new getProductController();
        const response = await controller.getProducts(req.query.search?.toString() ??'', Number(req.query.take)?? null, Number(req.query.skip)?? null);
        return res.send(response);
    }catch (e){
        return res.status(500).send({
            message: 'Error!'
        });
    }

});

router.post("/", AuthCheckMiddleware.validateToken, async (req, res) => {
    try {
        const controller = new createProductsController();
        const response = await controller.createProduct(req.body);
        return res.send(response);
    }catch (e){
        return res.status(500).send({
            message: 'Error!'
        });
    }
});

export default router;
