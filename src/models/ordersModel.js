import db from "../config/db.js";

const ordersModel = {
    getOrder: async () => {
        try {
            const query = `SELECT * FROM orders`;
            const result = await db.query(query);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    createNewOrder: async () => {
        try {
            const query = `
                                INSERT INTO orders (order_details, order_date, client_id, user_id)
                                VALUES ($1, $2, $3, $4)
                                RETURNING
                        `;
            const values = [order_details, order_date, client_id, user_id];
            const result = await db.query(query, values);
            return result.rowCount;
        } catch (error) {
            throw error;
        }
    },

    deleteOrder: async () => {
        try {
            const query = "DELETE FROM orders WHERE order_id = $1";
            const result = await db.query(query, [order_id]);
            return result.rowCount;
        } catch (error) {
            throw error;
        }
    },
};

export default ordersModel;
