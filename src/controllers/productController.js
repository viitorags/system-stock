import ProductModel from "../models/productModel.js";

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await ProductModel.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Erro ao obter lista de produtos" });
        }
    },

    createNewProduct: async (req, res) => {
        const { product_name, product_price, product_amount, user_id } =
            req.body;
        try {
            const newProduct = await ProductModel.createNewProduct(
                product_name,
                product_price,
                product_amount,
                user_id,
            );
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).json({ error: "Erro ao criar novo produto" });
        }
    },

    deleteProduct: async (req, res) => {
        const { product_id } = req.params;
        try {
            const delProduct = await ProductModel.deleteProduct(product_id);
            res.status(201).json(delProduct);
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            res.status(500).json({ error: "Erro ao deletar produto" });
        }
    },
};

export default productController;
