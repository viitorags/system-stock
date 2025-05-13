import db from "../config/db.js";

const clientModel = {
	getClient: async () => {
		try {
			const query = ``;
			const result = await db.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	createNewClient: async () => {
		try {
			const query = `
							INSERT INTO clients (client_name, client_number, user_id)
							VALUES ($1, $2, $3)
							RETURNING *
						`;
			const values = [client_name, client_number, user_id];
			const result = await db.query(query, values);
			return result.rowCount;
		} catch (error) {
			throw error;
		}
	},

	deleteClient: async () => {
		try {
			const query = "DELETE FROM users WHERE order_id = $1";
			const result = await db.query(query, [order_id]);
			return result.rowCount;
		} catch (error) {
			throw error;
		}
	}
};

export default clientModel;
