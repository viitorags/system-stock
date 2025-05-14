import OrdersModel from "../models/ordersModel";

const orderController = {
    getOrder: async (req, res) => {
        try {
            const orders = await OrdersModel.getOrder();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Erro ao obter lista de pedidos" });
        }
    },

    createNewOrder: async (req, res) => {
        const {
            order_details,
            order_date,
            client_name,
            client_number,
            client_id,
        } = req.body;
        try {
            const newOrder = await OrdersModel.createNewOrder(
                order_details,
                order_date,
                client_name,
                client_number,
                client_id,
            );
            res.status(201).json(newOrder);
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            res.status(500).json({ error: "Erro ao criar novo pedido" });
        }
    },

    deleteOrder: async (req, res) => {
        const { order_id } = req.body;
        try {
            const delOrder = await OrdersModel.deleteOrder(order_id);
            res.status(201).json(delOrder);
        } catch (error) {
            console.error("Erro ao deletar pedido", error);
            res.status(500).json({ error: "Erro ao deletar pedido" });
        }
    },
};

export default orderController;
