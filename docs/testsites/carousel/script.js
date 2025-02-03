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
    sliderTrack.style.animationDuration = `${25}s`;

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

//popup

// Get all modal trigger elements (images)
var images = document.getElementsByClassName('imgh');

// Get the modal and modal image
var modal = document.querySelector('.modal');
var modalImg = modal.querySelector('.modal-content');

// Get the close button
var closeButton = modal.querySelector('.close');

// Function to open modal and set image source
function openModal(src) {
  modal.style.display = "block"; // Display the modal
  modalImg.src = src; // Set modal image src
  
  // Pause the slider animation when modal is opened
  const sliderTrack = document.querySelector('.slider-track');
  sliderTrack.style.animationPlayState = "paused";
}

// Function to close modal
function closeModal() {
  modal.style.display = "none"; // Hide the modal
  
  // Resume the slider animation when modal is closed
  const sliderTrack = document.querySelector('.slider-track');
  sliderTrack.style.animationPlayState = "running";
}

// Loop through each trigger element
for (var i = 0; i < images.length; i++) {
  var img = images[i];
  
  // Attach click event to each image
  img.onclick = function(){
    openModal(this.src); // Open modal with clicked image src
  };
}

// Close the modal when close button is clicked
closeButton.onclick = function() {
  closeModal();
};

// Close the modal when user clicks outside of the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
};

// Close the modal when Escape key is pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});