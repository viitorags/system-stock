const btn_href_login = document.querySelector(".btn_href_login");
const form = document.getElementById("formRegister");

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData.entries());

	try {
		const response = await fetch("/api/registerUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
		});

		if (response.ok) {
			const resultado = await response.json();
			console.log("Usuário criado com sucesso!", resultado);
			alert("Usuário cadastrado com sucesso!");
			window.location.href = "/dashboard";
		} else {
			const erro = await response.json();
			console.error("Erro ao cadastrar:", erro);
			alert("Erro ao cadastrar usuário!");
		}
	} catch (error) {
		console.error("Erro inesperado:", error);
		alert("Erro inesperado!");
	}
});

btn_href_login.addEventListener("click", () => {
	window.location.href = "/";
});
