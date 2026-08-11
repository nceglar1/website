/* ── Portfolio Swiper ── */
document.querySelectorAll('.portfolio-swiper').forEach(portfolioSwiper => {
    const section = portfolioSwiper.closest('.port-sec');
    const prevBtn = section ? section.querySelector('.prev-btn') : null;
    const nextBtn = section ? section.querySelector('.next-btn') : null;

    const swiper = new Swiper(portfolioSwiper, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: false,
        grabCursor: true,
    });

    if (prevBtn) prevBtn.addEventListener('click', () => swiper.slidePrev());
    if (nextBtn) nextBtn.addEventListener('click', () => swiper.slideNext());
});

/* ── Horizontal scroll (o-meni page) ── */
window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.kaos-scroll-section');
    const horizontalWrapper = document.querySelector('.horizontal-wrapper');

    if (!section || !horizontalWrapper) return;

    const getScrollAmount = () => horizontalWrapper.scrollWidth - window.innerWidth;

    gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + (getScrollAmount() + window.innerHeight * 0.8),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
        }
    })
    .to(horizontalWrapper, { x: () => -getScrollAmount(), ease: 'none', duration: 1 })
    .to({}, { duration: 0.5 });
});

/* ── Portfolio modal ── */
const projects = {
    abraham:    { category: 'Fotografija', title: 'Abraham',    text: 'Serija fotografij, ustvarjena na dogotku Abraham. Fotografije prikazujejo zabavno počutje pri praznovanju 50. rojstnega dneva.', meta: 'Tehnika: fotografija<br>Leto: 2025', images: ['img/abraham_galerija.webp'] },
    akt:        { category: 'Fotografija', title: 'Akt',        text: 'Studijska fotografska serija s poudarkom na kompoziciji, svetlobi in izraznosti telesa.', meta: 'Tehnika: studijska fotografija<br>Leto: 2025', images: ['img/akt_galerija.webp'] },
    gozd:       { category: 'Fotografija', title: 'Gozd',       text: 'Zunanja fotografska serija motiva v gozdu s poudarkom na kompoziciji, čustvi erotičnosti in izraztosti telesa.', meta: 'Tehnika: fotografija<br>Leto: 2026', images: ['img/gozd_galerija.webp'] },
    italija:    { category: 'Fotografija', title: 'Italija',    text: 'Zunanja fotografska serija Italije s poudarkom na kompozicije arhitekture in izgledom pokrajine.', meta: 'Tehnika: fotografija<br>Leto: 2024', images: ['img/italija_galerija.webp'] },
    paklenica:  { category: 'Fotografija', title: 'Paklenica',  text: 'Zunanja fotografska serija Paklenice s poudarkom na kompozicije arhitekture in izgledom pokrajine.', meta: 'Tehnika: fotografija<br>Leto: 2023', images: ['img/paklenica_galerija.webp'] },
    mostar:     { category: 'Fotografija', title: 'Mostar',     text: 'Zunanja fotografska serija Mostar s poudarkom na kompozicije arhitekture in izgledom pokrajine.', meta: 'Tehnika: fotografija<br>Leto: 2026', images: ['img/mostar_galerija.webp'] },
    proizvodnja:{ category: 'Plakat',     title: 'Plakata Proizvodnja', text: 'Plakata Proizvodnja sta nastala v sodelovanju z AGRFT-jem. Sta filmska plakata za dokumentarec Proizvodnja.', meta: 'Tehnika: Plakat, Filmski plakat<br>Leto: 2026', images: ['img/proizvodnja_galerija.webp'] },
    bled:       { category: 'Grafika',    title: 'Plakat Bled', text: 'Plakat Bled je nastal v sodelovanju z AGRFT-jem. Je filmski plakat za kratek film Penzion Bled.', meta: 'Tehnika: Plakat, Filmski plakat<br>Leto: 2026', images: ['img/bled_card.webp'] },
    rozanja:    { category: 'Grafika',    title: 'Rozanja',     text: 'Celostna grafična podoba grafičnega studija Rozanja.', meta: 'Tehnika: Grafično oblikovanje<br>Leto: 2026', images: ['img/rozanja_galerija.webp'] },
    kkvu:       { category: 'Grafika',    title: 'Kulturni kolektiv vizualnih umetnikov', text: 'Celostna grafična podoba Kulturnega kolektiva vizualnih umetnikov ali KKVU. Oblikovan je bil logotip, prostor in promocijski material.', meta: 'Tehnika: Grafično oblikovanje<br>Leto: 2026', images: ['img/kkvu_galerija.webp'] },
    ilustracija:{ category: 'Grafika',    title: 'Odvisnost',   text: 'Plakati so bili narejeni na tematiko odvisnosti in uporabe škodljivih substanc. Sestavljeni so iz illustracije in naslova, ki jih dodatno opiše.', meta: 'Tehnika: Ilustracija, Grafično oblikovanje<br>Leto: 2023', images: ['img/ilustracija_galerija.webp'] },
    reload:     { category: 'Grafika',    title: 'Izdelaj svojo igro',   text: 'Promocijski material za družbena omrežja in kampanjo Izdelaj svojo igro. Vključuje oblikovanje Instagram objav, plakatov in kratkih videoposnetkov z uporabo programov Adobe.', meta: 'Tehnika: Digitalni marketing, Grafično oblikovanje<br>Leto: 2026', images: ['img/reload_galerija.webp'] },
};

const projectModal   = document.getElementById('projectModal');
const modalImages    = document.getElementById('modalImages');
const modalCategory  = document.getElementById('modalCategory');
const modalTitle     = document.getElementById('modalTitle');
const modalText      = document.getElementById('modalText');
const modalMeta      = document.getElementById('modalMeta');
const modalClose     = document.querySelector('.project-modal__close');

function openProjectModal(key) {
    const project = projects[key];
    if (!projectModal || !project || !modalImages) return;

    modalCategory.textContent = project.category;
    modalTitle.textContent    = project.title;
    modalText.textContent     = project.text;
    modalMeta.innerHTML       = project.meta;
    modalImages.innerHTML     = project.images
        .map(src => `<img src="${src}" alt="${project.title}" loading="lazy">`)
        .join('');
    modalImages.scrollTop = 0;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('.portfolio-more[data-project]').forEach(btn =>
    btn.addEventListener('click', () => openProjectModal(btn.dataset.project))
);

modalClose?.addEventListener('click', closeProjectModal);

projectModal?.addEventListener('click', e => {
    if (e.target === projectModal) closeProjectModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
});
