document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // MENU MOBILE
    // =========================================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

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


        // Fermer le menu lorsqu'on clique sur un lien
        const links = navLinks.querySelectorAll("a");

        links.forEach(function (link) {

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


        // Fermer le menu si on clique en dehors
        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedButton =
                menuBtn.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton &&
                navLinks.classList.contains("open")
            ) {

                navLinks.classList.remove("open");

                menuBtn.textContent = "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    // =========================================
    // RETOUR EN HAUT
    // =========================================

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


    // =========================================
    // FORMULAIRE
    // =========================================

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


    // =========================================
    // LIENS AVEC DATA-SCROLL
    // =========================================

    const scrollButtons =
        document.querySelectorAll("[data-scroll]");

    scrollButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selector =
                button.getAttribute("data-scroll");

            if (!selector) {
                return;
            }

            const target =
                document.querySelector(selector);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});