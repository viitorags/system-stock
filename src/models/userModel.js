import db from "../config/db.js";

const UserModel = {
	getUser: async (user_id) => {
		try {
			const query = `
            SELECT * FROM users
            WHERE user_id = $1
        `;
			const result = await db.query(query, [user_id]);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	getUserLogin: async (user_email, user_password) => {
		try {
			const query = `
			SELECT * FROM users
			WHERE user_email = $1 AND user_password = $2
		`;
			const result = await db.query(query, [user_email, user_password]);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	createNewUser: async (user_name, user_email, user_password) => {
		try {
			const query = `
                INSERT INTO users (user_name, user_email, user_password)
                VALUES ($1, $2, $3)
                RETURNING *
            `;
			const values = [user_name, user_email, user_password];
			const result = await db.query(query, values);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	},

	deleteUser: async (user_id) => {
		try {
			const query = "DELETE FROM users WHERE user_id = $1";
			const result = await db.query(query, [user_id]);
			return result.rowCount;
		} catch (error) {
			throw error;
		}
	},
};

export default UserModel;
