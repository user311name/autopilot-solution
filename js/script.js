document.addEventListener("DOMContentLoaded", () => {

    /* MENU MOBILE */

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const opened = nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            menuButton.textContent = opened ? "✕" : "☰";
        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";
            });

        });

    }


    /* FAQ */

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const item = button.closest(".faq-item");

            if (!item) return;

            const wasOpen = item.classList.contains("open");

            document.querySelectorAll(".faq-item").forEach(other => {
                other.classList.remove("open");
            });

            if (!wasOpen) {
                item.classList.add("open");
            }

        });

    });


    /* TRACKING SIMPLE DES CTA */

    document.querySelectorAll('a[href*="devis.html"]').forEach(link => {

        link.addEventListener("click", () => {

            console.log("Conversion : clic Demander un devis");

        });

    });


    /* TELEPHONE */

    document.querySelectorAll('a[href^="tel:"]').forEach(link => {

        link.addEventListener("click", () => {

            console.log("Conversion : clic téléphone");

        });

    });


    /* FORMULAIRE */

    const form = document.querySelector("#devisForm");

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }

            const success = document.querySelector("#formSuccess");

            if (success) {

                success.style.display = "block";

                success.textContent =
                    "Votre demande a bien été prise en compte. Nous reviendrons vers vous après réception de votre demande.";

                success.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

            console.log("Conversion : formulaire de devis envoyé");

            form.reset();

        });

    }


    /* ANIMATION DES ELEMENTS AU SCROLL */

    const animatedElements = document.querySelectorAll(
        ".card, .flow-card, .benefit-item, .process-item"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    }

});