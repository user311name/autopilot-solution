document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MENU MOBILE
    ========================= */

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const opened = nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                opened
                    ? "Fermer le menu"
                    : "Ouvrir le menu"
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

                menuButton.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

                menuButton.textContent = "☰";
            });

        });

    }


    /* =========================
       FAQ
    ========================= */

    document
        .querySelectorAll(".faq-question")
        .forEach(button => {

            button.addEventListener("click", () => {

                const item =
                    button.closest(".faq-item");

                if (!item) return;

                const wasOpen =
                    item.classList.contains("open");

                document
                    .querySelectorAll(".faq-item")
                    .forEach(other => {
                        other.classList.remove("open");
                    });

                if (!wasOpen) {
                    item.classList.add("open");
                }

            });

        });


    /* =========================
       TRACKING CTA DEVIS
    ========================= */

    document
        .querySelectorAll(
            'a[href*="devis.html"]'
        )
        .forEach(link => {

            link.addEventListener("click", () => {

                console.log(
                    "Conversion : clic Demander un devis"
                );

                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        "click_demander_devis",
                        {
                            event_category: "conversion",
                            event_label: "Demander un devis"
                        }
                    );

                }

            });

        });


    /* =========================
       TRACKING TELEPHONE
    ========================= */

    document
        .querySelectorAll('a[href^="tel:"]')
        .forEach(link => {

            link.addEventListener("click", () => {

                console.log(
                    "Conversion : clic téléphone"
                );

                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        "click_telephone",
                        {
                            event_category: "conversion",
                            event_label: "Téléphone"
                        }
                    );

                }

            });

        });


    /* =========================
       TRACKING EMAIL
    ========================= */

    document
        .querySelectorAll('a[href^="mailto:"]')
        .forEach(link => {

            link.addEventListener("click", () => {

                console.log(
                    "Conversion : clic email"
                );

                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        "click_email",
                        {
                            event_category: "conversion",
                            event_label: "Email"
                        }
                    );

                }

            });

        });


    /* =========================
       FORMULAIRE DE DEVIS
    ========================= */

    const form =
        document.querySelector("#devisForm");

    if (form) {

        form.addEventListener("submit", event => {

            /*
             * IMPORTANT :
             *
             * On NE fait PAS event.preventDefault().
             *
             * Le formulaire continue son envoi
             * vers l'adresse définie dans son attribut
             * action.
             *
             * La validation côté navigateur ne remplace
             * jamais la validation côté serveur.
             */

            if (!form.checkValidity()) {

                event.preventDefault();

                form.reportValidity();

                return;
            }


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Envoi de votre demande…";

            }


            console.log(
                "Conversion : formulaire de devis envoyé"
            );


            if (
                typeof window.gtag === "function"
            ) {

                window.gtag(
                    "event",
                    "formulaire_devis",
                    {
                        event_category: "conversion",
                        event_label: "Formulaire de devis"
                    }
                );

            }

            /*
             * Aucun preventDefault ici.
             *
             * Le navigateur continue naturellement
             * vers l'adresse définie dans l'attribut
             * action du formulaire.
             */

        });

    }


    /* =========================
       TRACKING DEMANDE DE RAPPEL
    ========================= */

    const callbackCheckbox =
        document.querySelector(
            "#rappel"
        );

    if (callbackCheckbox) {

        callbackCheckbox.addEventListener(
            "change",
            () => {

                if (callbackCheckbox.checked) {

                    console.log(
                        "Conversion : demande de rappel"
                    );

                    if (
                        typeof window.gtag === "function"
                    ) {

                        window.gtag(
                            "event",
                            "demande_rappel",
                            {
                                event_category: "conversion",
                                event_label: "Demande de rappel"
                            }
                        );

                    }

                }

            }
        );

    }


    /* =========================
       ANIMATION AU SCROLL
    ========================= */

    const animatedElements =
        document.querySelectorAll(
            ".card, .flow-card, .benefit-item, .process-item, .home-audience-card, .home-why-card, .home-use-case-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

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