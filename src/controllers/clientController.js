import ClientModel from "../models/clientModel";

const clientController = {
    getClient: async (req, res) => {
        try {
            const clients = await ClientModel.getClient();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ error: "Erro ao obter lista de clientes" });
        }
    },

    createNewClient: async (req, res) => {
        const { client_name, client_number, user_id } = req.body;
        try {
            const newClient = await ClientModel.createNewClient(
                client_name,
                client_number,
                user_id,
            );
            res.status(201).json(newClient);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            res.status(500).json({ error: "Erro ao criar novo cliente" });
        }
    },

    deleteClient: async (req, res) => {
        const { client_id } = req.body;
        try {
            const delClient = await ClientModel.deleteClient(client_id);
            res.status(201).json(delClient);
        } catch (error) {
            console.error("Erro ao deletar cliente", error);
            res.status(500).json({ error: "Erro ao deletar cliente" });
        }
    },
};

export default clientController;
