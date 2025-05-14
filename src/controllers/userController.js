import UserModel from "../models/userModel.js";

const userController = {
    login: async (req, res) => {
        const { user_email, user_password } = req.body;

        try {
            const user = await UserModel.getUserLogin(
                user_email,
                user_password,
            );

            if (user) {
                // Criar sessão
                req.session.user_id = user.user_id;
                delete user.user_password; // Não retornar a senha
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: "Email ou senha incorretos" });
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro ao processar login" });
        }
    },

    getUserSession: async (req, res) => {
        try {
            const userId = req.session.user_id;

            if (!userId) {
                return res
                    .status(401)
                    .json({ error: "Usuário não autenticado" });
            }

            const user = await UserModel.getUser(userId);

            if (!user) {
                return res
                    .status(404)
                    .json({ error: "Usuário não encontrado" });
            }

            // Retorna apenas os dados que você quer mostrar
            res.status(200).json({
                user_id: user.user_id,
                name: user.user_name,
                profileImg: user.user_image || "/public/images/profile.png", // se tiver imagem
            });
        } catch (error) {
            console.error("Erro ao buscar usuário da sessão", error);
            res.status(500).json({ error: "Erro ao buscar dados do usuário" });
        }
    },

    getUserVerify: async (req, res) => {
        try {
            const user = await UserModel.getUserVerify();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                error: "Error ao verificar se usuario existe.",
            });
        }
    },

    createNewUser: async (req, res) => {
        const { user_name, user_email, user_password } = req.body;
        try {
            const newUser = await UserModel.createNewUser(
                user_name,
                user_email,
                user_password,
            );

            req.session.user_id = newUser.user_id;

            // Remove a senha antes de enviar
            delete newUser.user_password;

            res.status(201).json(newUser);
        } catch (error) {
            console.log("Erro ao criar usuario:", error);
            res.status(500).json({ error: "Erro ao criar usuario" });
        }
    },

    deleteUser: async (req, res) => {
        const { user_id } = req.body;
        try {
            const delUser = await UserModel.deleteUser(user_id);
            res.status(201).json(delUser);
        } catch (error) {
            console.error("Erro ao deletar usuário", error);
            res.status(500).json({ error: "Erro ao deletar usuario" });
        }
    },
};

export default userController;
