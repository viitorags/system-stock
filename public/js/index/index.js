const btn_href_register = document.querySelector(".btn_href_register");
const form = document.getElementById("formLogin");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verificar se os campos foram preenchidos
    if (!email || !password) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_email: email,
                user_password: password,
            }), // Enviar os dados
            credentials: "include",
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Usuário logado com sucesso!", result);
            window.location.href = "/dashboard";
        } else {
            const error = await response.json();
            console.error("Erro ao obter usuário!", error);
            alert("Email ou senha incorretos");
        }
    } catch (error) {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado!");
    }
});

btn_href_register.addEventListener("click", () => {
    window.location.href = "/register";
});
