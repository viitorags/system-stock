import db from "../config/db.js";

const Product = {
	getAllProducts: async () => {
		try {
			const query = `SELECT * FROM products`;
			const result = await db.query(query);
			return result.rows;
		} catch (error) {
			throw error;
		}
	},

	createNewProduct: async (product_name, product_price, product_amount, user_id) => {
		try {
			const query = `INSERT INTO products (product_name, product_price, product_quantity, user_id) 
                           VALUES ($1, $2, $3, $4) 
                           RETURNING *`;
			const values = [product_name, product_price, product_amount, user_id];
			const result = await db.query(query, values);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	deleteProduct: async (product_id) => {
		try {
			const query = "DELETE FROM products WHERE product_id = $1";
			const result = await db.query(query, [product_id]);
			return result.rowCount;
		} catch (error) {
			throw error;
		}
	},
};

export default Product;
