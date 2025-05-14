const form = document.getElementById("productForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Buscar o user_id do usuário logado
        const userRes = await fetch("/api/user", { credentials: "include" });
        if (!userRes.ok) throw new Error("Usuário não autenticado");
        const user = await userRes.json();
        const userId = user.user_id;

        // Adicionar user_id nos dados do produto
        data.user_id = userId;

        const response = await fetch("/api/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Produto cadastrado com sucesso", result);
            alert("Produto cadastrado com sucesso!");
            location.reload();
        } else {
            const erro = await response.json();
            console.error("Erro ao cadastrar produto:", erro);
            alert("Erro ao cadastrar produto!");
        }
    } catch (error) {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado!");
    }
});
