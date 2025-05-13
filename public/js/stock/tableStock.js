document.addEventListener('DOMContentLoaded', async () => {
	const tableBody = document.getElementById("productTableBody");

	try {
		// Buscar usuário logado
		const userRes = await fetch("/api/user", { credentials: "include" });
		if (!userRes.ok) throw new Error("Usuário não autenticado");
		const user = await userRes.json();
		const userId = user.user_id;

		// Puxa os produtos da tabela
		const response = await fetch("/api/produtos", { method: "GET" });
		if (!response.ok) throw new Error("Erro na rede");
		const data = await response.json();

		// Filtra produtos do usuário
		const dataProducts = data.filter(item => item.user_id === userId);

		tableBody.innerHTML = "";
		dataProducts.forEach(product => {
			const row = document.createElement("tr");
			row.innerHTML = `
				<td>${product.product_name}</td>
				<td>${product.product_price}</td>
				<td>${product.product_quantity}</td>
				<td>
					<button class="editar">Editar</button>
					<button class="remove_product">Remover</button>
				</td>
			`;
			tableBody.appendChild(row);
		});

		const removeButtons = document.querySelectorAll(".remove_product");

		removeButtons.forEach((removeButton, index) => {
			removeButton.addEventListener("click", async () => {
				const product = dataProducts[index];
				try {
					const delRes = await fetch(`/api/produtos/${product.product_id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					});
					if (!delRes.ok) throw new Error("Erro na rede");
					// Atualize a lista de produtos após a remoção, se necessário
					alert("Produto removido com sucesso!");
					location.reload();
				} catch (error) {
					console.error("Erro ao remover o produto:", error);
					alert("Erro ao remover o produto.");
				}
			});
		});


	} catch (error) {
		console.error("Erro inesperado:", error);
		alert("Erro inesperado!");
	}
});
