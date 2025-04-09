const menuButton = document.querySelector(".menu_toggle");
const menu = document.querySelector(".sidebar_menu");

// Caminho dos links do menu


// Abrir e fechar menu no Mobile

menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
});
