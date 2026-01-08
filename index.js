// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
});

// Close menu when clicking a link
document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });
});

// slide
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');

let current = 0;
let interval = null;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.remove('opacity-0', 'scale-110');
            slide.classList.add('opacity-100', 'scale-100');
        } else {
            slide.classList.remove('opacity-100', 'scale-100');
            slide.classList.add('opacity-0', 'scale-110');
        }
    });

    indicators.forEach((dot, i) => {
        dot.classList.toggle('bg-accent', i === index);
        dot.classList.toggle('bg-[#ffffff4d]', i !== index);
    });

    current = index;
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function startAutoSlide() {
    interval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

// Indicator click
indicators.forEach(dot => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(Number(dot.dataset.slide));
        startAutoSlide();
    });
});

// Init
showSlide(0);
startAutoSlide();

// collection filter


const filterButtons = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".collection-item");

function setActiveButton(activeBtn) {
    filterButtons.forEach(btn => {
        btn.classList.remove(
            "bg-accent",
            "text-white",
            "border-accent",
            "-translate-y-0.5"
        );
        btn.classList.add("bg-transparent", "text-text-muted", "border-text-muted");
    });

    activeBtn.classList.remove("bg-transparent", "text-text-muted", "border-text-muted");
    activeBtn.classList.add(
        "bg-accent",
        "text-white",
        "border-accent",
        "-translate-y-0.5"
    );
}

function filterItems(filter) {
    items.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
            item.classList.remove("hidden");
            item.classList.add("animate-fadeIn");
        } else {
            item.classList.add("hidden");
        }
    });
}

// 🔥 DEFAULT STATE (All active)
const defaultBtn = document.querySelector('[data-filter="all"]');
setActiveButton(defaultBtn);
filterItems("all");

// Click handling
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        setActiveButton(btn);
        filterItems(btn.dataset.filter);
    });
});

