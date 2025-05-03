// / Activation du menu déroulant
document.querySelectorAll(".dropdown").forEach(dropdown => {
    dropdown.querySelector("div").addEventListener("click", () => {
        const icon = dropdown.querySelector('i');
        const content = dropdown.querySelector(".dropdown-content");

        const isDropdownOpen = icon.classList.contains("isDropdown");
        content.style.display = isDropdownOpen ? "none" : "block";
        icon.classList.toggle("isDropdown", !isDropdownOpen);
    });
});





// Gestion des diapositives du carrousel
let slideIndex = 0;
let prevSlide = 0;
const slides = document.querySelectorAll(".slides");
const radioButtons = document.querySelectorAll(".container--radio");

function updateSlide() {
    slides[prevSlide].style.display = "none";
    slides[slideIndex].style.display = "block";
    radioButtons[slideIndex].querySelector("input").checked = true;

    prevSlide = slideIndex;
    slideIndex = (slideIndex + 1) % slides.length; // Loop slides
}

let slideInterval = setInterval(updateSlide, 3000);

radioButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        slideIndex = index;
        clearInterval(slideInterval);
        updateSlide();
        slideInterval = setInterval(updateSlide, 3000);
    });
});

document.querySelector(".fa-chevron-left").addEventListener("click", () => {
    slideIndex = (slideIndex - 2 + slides.length) % slides.length;
    clearInterval(slideInterval);
    updateSlide();
    slideInterval = setInterval(updateSlide, 3000);
});

document.querySelector(".fa-chevron-right").addEventListener("click", () => {
    clearInterval(slideInterval);
    updateSlide();
    slideInterval = setInterval(updateSlide, 3000);
});

updateSlide();





// Ajustements pour le redimensionnement des images
function resizeImage() {
    const windowWidth = window.innerWidth;
    let x = 6;

    const updateImages = (suffix) => {
        slides.forEach((element, i) => {
            element.querySelector("img").src = `assets/${x + i}${suffix}.jpg`;
        });

        document.getElementById('logo-nav-Safy').src = `assets/18${suffix}.jpg.png`;

        document.querySelectorAll(".flag-country").forEach((element, index) => {
            element.src = `assets/${index + 3}${suffix}.jpg`;
        });
    };

    if (windowWidth >= 1200) {
        updateImages("");
    } else if (windowWidth >= 900) {
        updateImages("-2");
    } else {
        updateImages("-3");
    }

    const home = document.getElementById('Home');
    if (windowWidth <= 450) {
        home.classList.add("text--color-red");
    } else {
        home.classList.remove("text--color-red");
    }

    x = 6; // Reset image counter
}

resizeImage();
window.addEventListener("resize", resizeImage);
