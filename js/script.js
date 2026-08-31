document.addEventListener("DOMContentLoaded", () => {

    /*
     * ==========================================
     * MENU MOBILE
     * ==========================================
     */

    const menuBtn = document.querySelector("#menu-button");
    const navLinks = document.querySelector("#main-navigation");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Fermer le menu"
                    : "Ouvrir le menu"
            );

            menuBtn.textContent = isOpen ? "✕" : "☰";

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        });


        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

                menuBtn.textContent = "☰";

                document.body.classList.remove(
                    "menu-open"
                );
            });

        });


        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {

                navLinks.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

                menuBtn.textContent = "☰";

                document.body.classList.remove(
                    "menu-open"
                );
            }

        });

    }


    /*
     * ==========================================
     * RETOUR EN HAUT
     * ==========================================
     */

    const topBtn = document.querySelector(".top");

    if (topBtn) {

        const updateTopButton = () => {

            topBtn.classList.toggle(
                "visible",
                window.scrollY > 500
            );

        };

        window.addEventListener(
            "scroll",
            updateTopButton,
            { passive: true }
        );

        updateTopButton();


        topBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /*
     * ==========================================
     * FAQ
     * ==========================================
     */

    const faqItems =
        document.querySelectorAll(".faq details");

    faqItems.forEach((item) => {

        item.addEventListener("toggle", () => {

            if (item.open) {

                faqItems.forEach((otherItem) => {

                    if (otherItem !== item) {
                        otherItem.removeAttribute("open");
                    }

                });

            }

        });

    });


    /*
     * ==========================================
     * SUIVI DES CLICS
     *
     * Compatible avec Google Analytics
     * si celui-ci est ajouté ultérieurement.
     * ==========================================
     */

    document
        .querySelectorAll("[data-conversion]")
        .forEach((element) => {

            element.addEventListener("click", () => {

                const eventName =
                    element.dataset.conversion;

                if (
                    typeof window.gtag === "function"
                ) {

                    window.gtag(
                        "event",
                        eventName
                    );

                }

                /*
                 * Pour permettre un suivi même avant
                 * l'installation de Google Analytics.
                 */

                try {

                    const current =
                        Number(
                            localStorage.getItem(
                                `autopilot_${eventName}`
                            ) || 0
                        );

                    localStorage.setItem(
                        `autopilot_${eventName}`,
                        String(current + 1)
                    );

                } catch (error) {

                    /*
                     * Certains navigateurs peuvent
                     * bloquer localStorage.
                     * Le site continue normalement.
                     */

                }

            });

        });


    /*
     * ==========================================
     * FORMULAIRE
     * ==========================================
     */

    const form =
        document.querySelector("#contact-form");

    const formMessage =
        document.querySelector("#form-message");


    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();


            /*
             * Vérification HTML native.
             */

            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }


            /*
             * Récupération des données.
             */

            const formData =
                new FormData(form);

            const firstName =
                formData.get("prenom") || "";

            const lastName =
                formData.get("nom") || "";

            const company =
                formData.get("entreprise") || "";

            const email =
                formData.get("email") || "";

            const phone =
                formData.get("telephone") || "";

            const activity =
                formData.get("activite") || "";

            const service =
                formData.get("service") || "";

            const task =
                formData.get("tache") || "";

            const message =
                formData.get("message") || "";

            const callback =
                formData.get("rappel") === "oui";


            /*
             * Création d'un email.
             *
             * Cette méthode ouvre le logiciel
             * de messagerie du visiteur.
             */

            const subject =
                `Demande de devis - ${company || "Nouveau prospect"}`;


            const body =
`Bonjour AutoPilot Solutions,

Je souhaite obtenir un devis.

Nom : ${firstName} ${lastName}
Entreprise : ${company}
Email : ${email}
Téléphone : ${phone}
Activité : ${activity}
Service recherché : ${service}

Tâche ou problème à automatiser :
${task}

Besoins / message :
${message}

Je souhaite être rappelé :
${callback ? "Oui" : "Non"}

Merci.`;


            const mailto =
                `mailto:contact.autopilotsolutions@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;


            /*
             * Envoi via le logiciel de messagerie.
             */

            window.location.href = mailto;


            /*
             * Message d'information.
             */

            if (formMessage) {

                formMessage.style.display = "block";

                formMessage.textContent =
                    "Votre demande est prête. Votre logiciel de messagerie va s’ouvrir afin de l’envoyer à AutoPilot Solutions.";

            }


            /*
             * Événement de conversion.
             */

            if (
                typeof window.gtag === "function"
            ) {

                window.gtag(
                    "event",
                    "form_submit"
                );

            }


            try {

                localStorage.setItem(
                    "autopilot_form_submit",
                    String(
                        Number(
                            localStorage.getItem(
                                "autopilot_form_submit"
                            ) || 0
                        ) + 1
                    )
                );

            } catch (error) {}

        });

    }


    /*
     * ==========================================
     * ANCRAGES INTERNES
     * ==========================================
     */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const id =
                    link.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

});