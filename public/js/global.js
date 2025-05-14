const menuButton = document.querySelector(".menu_toggle");
const menu = document.querySelector(".sidebar_menu");
const menuItems = document.querySelectorAll(".menu_links ul li");

// Abrir e fechar menu no Mobile

menuButton.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// Caminho dos links do menu

const routes = {
    Home: "/dashboard",
    Estoque: "/stock",
    Clientes: "/customer",
    Pedidos: "/orders",
    Registros: "/records",
};

menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        const link = item.textContent.trim();
        const destine = routes[link];

        if (destine) {
            window.location.href = destine;
        } else {
            alert("Se fudeu");
        }
    });
});

// Obter informações do usuário logado
window.addEventListener("DOMContentLoaded", () => {
    const infoName = document.querySelector(".info_name");
    const infoDate = document.querySelector(".info_date");
    const profileImg = document.querySelector(".profile_img");

    if (!infoName || !infoDate || !profileImg) return;

    fetch("/api/user", {
        credentials: "include",
    })
        .then((res) => {
            if (!res.ok) throw new Error("Não autenticado");
            return res.json();
        })
        .then((user) => {
            infoName.textContent = user.name;
            infoDate.innerHTML = `<i class="bi bi-calendar"></i> ${new Date().toLocaleDateString()}`;
            profileImg.src = user.profileImg;
        })
        .catch((err) => {
            console.error("Erro ao carregar perfil:", err);
            // Redireciona para login se necessário
            window.location.href = "/";
        });
});
