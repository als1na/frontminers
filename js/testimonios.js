const REVIEWS = [
    {
        id: 6,
        name: 'Alicia',
        role: 'Modelo',
        avatar: 'https://i.pravatar.cc/150?img=23',
        review: `¡Excelente servicio! La minadora llegó rápido y funciona de maravilla. ¡Totalmente recomendado!`,
    },
    {
        id: 0,
        name: 'Roberto',
        role: 'Arquitecto',
        avatar: 'https://i.pravatar.cc/150?img=13',
        review: `Muy satisfecho con mi compra. La máquina es silenciosa y eficiente, justo lo que necesitaba para empezar en el mundo de las criptomonedas.`,
    },
    {
        id: 2,
        name: 'Carlos',
        role: 'Estudiante',
        avatar: 'https://i.pravatar.cc/150?img=8',
        review: `Increíble atención al cliente, me ayudaron a seleccionar el modelo perfecto para mi. Estoy viendo los resultados ya.`,
    },
    {
        id: 3,
        name: 'Julia',
        role: 'Diseñadora',
        avatar: 'https://i.pravatar.cc/150?img=41',
        review: `Gran calidad y rendimiento superior a lo esperado. Mi inversión está dando frutos más rápido de lo que pensé.`,
    },
    {
        id: 13,
        name: 'Eduardo',
        role: 'Abogado',
        avatar: 'https://i.pravatar.cc/150?img=57',
        review: `Producto de primera, fácil de instalar y comenzar a operar. En dos meses, ya veo retorno de inversión.`,
    },
    {
        id: 4,
        name: 'Teresa',
        role: 'Estudiante',
        avatar: 'https://i.pravatar.cc/150?img=42',
        review: `Estoy impresionada con la eficiencia energética de la minadora. Definitivamente, vale cada centimo`,
    },
    {
        id: 10,
        name: 'Ana',
        role: 'Emprendedora',
        avatar: 'https://i.pravatar.cc/150?img=21',
        review: `Rápido envío y producto bien embalado. Comenzó a funcionar de inmediato sin problemas.`,
    },
    {
        id: 11,
        name: 'Jorge',
        role: 'Director',
        avatar: 'https://i.pravatar.cc/150?img=18',
        review: `Soporte técnico muy amable y conocedor. Resolvieron mis dudas en minutos y ahora estoy minando sin parar.`,
    },
    {
        id: 5,
        name: 'Pedro',
        role: 'Comerciante',
        avatar: 'https://i.pravatar.cc/150?img=33',
        review: `Excelente compra, la máquina es robusta y el software es muy usuario-amigable. Ya estoy pensando en comprar otra.`,
    },
];

// common vars
let currentCard;

// add reviews to DOM
function renderReviews() {
    const tplCard = document.querySelector("#tpl-card");
    const listCards = document.querySelector("#list-cards");

    REVIEWS.forEach((r, idx) => {
        const clone = tplCard.content.cloneNode(true);
        clone.querySelector("blockquote").innerText = `"${r.review}"`;
        clone.querySelector("[review-name]").innerText = r.name;
        clone.querySelector("[review-role]").innerText = r.role;
        clone.querySelector("[review-img]").src = r.avatar;
        if (idx === 0) {
            /// remove translate on first card
            clone.querySelector("div").classList.remove("opacity-0")
            clone.querySelector("blockquote").classList.remove("scale-0", "before:-translate-y-full")
            clone.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]")
            currentCard = clone.querySelector("div");
        }
        listCards.append(clone)
    })
}

// SLIDER
function sliderInit() {
    // add reviews to DOM
    renderReviews()

    let currentİndex = 0;
    const slider = document.querySelector("#slider");
    const slides = slider.querySelectorAll(".card");
    const totalSlides = REVIEWS.length;
    const sliderButtons = document.querySelectorAll("[data-slide]");

    sliderButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {

            sliderButtons[0].classList.add("translate-x-20")
            sliderButtons[1].classList.add("-translate-x-20")
           
            // slide out old current card
            currentCard.querySelector("blockquote").classList.add("scale-0", "before:-translate-y-full")
            currentCard.querySelector(".details").classList.add("scale-0", "translate-y-[150px]")

            // move currentİndex forwards or backwards
            if (btn.getAttribute("data-slide") === "prev") {
                currentİndex = (totalSlides + currentİndex - 1) % totalSlides;
            } else {
                currentİndex = (totalSlides + currentİndex + 1) % totalSlides;
            }
            // slide in new current card
            setTimeout(() => {
                currentCard = slides[currentİndex];
                currentCard.classList.remove("opacity-0")
                currentCard.querySelector("blockquote").classList.remove("scale-0","before:-translate-y-full")
                currentCard.querySelector(".details").classList.remove("scale-0", "translate-y-[150px]");

                sliderButtons[0].classList.remove("translate-x-20")
                sliderButtons[1].classList.remove("-translate-x-20")
            }, 500)
        })
    })
}

sliderInit();