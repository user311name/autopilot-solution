document.addEventListener("DOMContentLoaded", () => {

    // MENU MOBILE
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.textContent =
                navLinks.classList.contains("open") ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.textContent = "☰";
            });
        });
    }

    // RETOUR EN HAUT
    const topBtn = document.querySelector(".top");

    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.classList.toggle("visible", window.scrollY > 500);
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // FORMULAIRE
    const form = document.querySelector("#contact-form");
    const message = document.querySelector("#form-message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (message) {
                message.textContent =
                    "Merci ! Votre demande a bien été préparée. Nous reviendrons vers vous rapidement.";
                message.style.color = "#9b78ff";
            }

            form.reset();
        });
    }

    // LIENS CTA
    document.querySelectorAll("[data-scroll]").forEach(button => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.scroll);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});