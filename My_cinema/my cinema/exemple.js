
/*
const container = document.getElementById("section");
const content = document.getElementById("section");

container.addEventListener("click", () => {
    content.style.display = "block"; // Affiche le contenu
});

content.addEventListener("mouseleave", () => {
    content.style.display = "none"; // Cache le contenu
});*/


document.querySelectorAll('.ul-nav > li > a').forEach(menuLink => {
    menuLink.addEventListener('click', event => {
        event.preventDefault();

        // On cache tous les autres sous-menus
        document.querySelectorAll('.ul-nav ul').forEach(ul => ul.classList.remove('active'));

        // On affiche le sous-menu correspondant
        const submenu = menuLink.nextElementSibling;
        if (submenu) {
            submenu.classList.add('active');
        }
    });
});

// Cacher le sous-menu quand la souris quitte
document.querySelectorAll('.ul-nav ul').forEach(submenu => {
    submenu.addEventListener('mouseleave', () => {
        submenu.classList.remove('active');
    });
});