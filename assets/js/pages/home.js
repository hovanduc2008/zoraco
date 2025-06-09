// script.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideElements = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    const updateSlider = () => {
        const slideWidth = slideElements[0].clientWidth;
        slides.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideElements.length;
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
        updateSlider();
    });

    // Optional: Auto-play slider
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % slideElements.length;
    //     updateSlider();
    // }, 5000); // Change slide every 5 seconds

    // Update slider on window resize to ensure correct positioning
    window.addEventListener('resize', updateSlider);

    // Initialize slider position
    updateSlider();
});