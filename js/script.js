document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MENU MOBILE
    ========================================= */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("open");

            menuBtn.textContent = isOpen ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );
        });


        /* Fermer le menu après avoir cliqué sur un lien */

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            });

        });


        /* Fermer si on clique en dehors du menu */

        document.addEventListener("click", function (event) {

            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                navLinks.classList.remove("open");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            }

        });


        /* Fermer avec la touche Échap */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navLinks.classList.remove("open");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );
            }

        });

    }


    /* =========================================
       RETOUR EN HAUT
    ========================================= */

    const topBtn = document.querySelector(".top");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                topBtn.classList.add("visible");
            } else {
                topBtn.classList.remove("visible");
            }

        });


        topBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       FORMULAIRE
    ========================================= */

    const form = document.querySelector("#contact-form");
    const message = document.querySelector("#form-message");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            if (message) {

                message.textContent =
                    "Merci ! Votre demande a bien été préparée. Nous reviendrons vers vous rapidement.";

                message.style.color = "#9b78ff";
            }

            form.reset();

        });

    }


    /* =========================================
       LIENS AVEC DATA-SCROLL
    ========================================= */

    document
        .querySelectorAll("[data-scroll]")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                const selector = button.dataset.scroll;

                const target = document.querySelector(selector);

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });

});