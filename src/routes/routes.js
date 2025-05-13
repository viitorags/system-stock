import loginRouter from "./loginRoute.js";
import registerRouter from "./registerRoute.js";
import dashboardRouter from "./dashboardRoute.js";
import stockRouter from "./stockRoute.js";
import ordersRouter from "./ordersRoute.js";
import customerRouter from "./customerRoute.js";

const routes = (app) => {
	// Rotas públicas
	app.use("/", loginRouter);
	app.use("/register", registerRouter);

	// Rotas protegidas — validação dentro de cada router
	app.use("/dashboard", dashboardRouter);
	app.use("/stock", stockRouter);
	app.use("/orders", ordersRouter);
	app.use("/customer", customerRouter);
};

export default routes;
