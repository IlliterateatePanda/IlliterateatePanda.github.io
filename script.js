// script.js
document.addEventListener("DOMContentLoaded", () => {
    const sliderTrack = document.querySelector('.slider-track');
    const images = sliderTrack.querySelectorAll('img');
    const totalImages = images.length;

    // Clone images to create a seamless loop
    images.forEach(image => {
        const clone = image.cloneNode(true);
        sliderTrack.appendChild(clone);
    });

    // Calculate the total width of the images
    const imageWidth = images[0].offsetWidth;
    const totalWidth = imageWidth * totalImages;

    // Set the animation duration based on the total width
    const duration = totalImages * 3; // Adjust timing as needed
    sliderTrack.style.animationDuration = `${20}s`;

    // Adjust keyframes dynamically
    const keyframes = `
        @keyframes scroll {
            from {
                transform: translateX(0);
            }
            to {
                transform: translateX(-${totalWidth}px);
            }
        }
    `;

    // Inject keyframes into the document
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
});
