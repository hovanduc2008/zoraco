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

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slideElements.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
        updateSlider();
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    window.addEventListener('resize', updateSlider);

    // Tự động chuyển slide sau mỗi 3 giây
    setInterval(nextSlide, 3000);

    updateSlider();
});
