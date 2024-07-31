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
    sliderTrack.style.animationDuration = `${48}s`;

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

// Clone images to create a seamless loop and attach event listeners
const sliderTrack = document.querySelector('.slider-track');
const totalImages = sliderTrack.querySelectorAll('img').length;
for (let i = 0; i < totalImages; i++) {
  const clone = images[i].cloneNode(true);
  sliderTrack.appendChild(clone);
  clone.classList.add('imgh'); // Ensure cloned images have the same class

  // Attach click event to each cloned image
  clone.addEventListener('click', () => {
    openModal(clone.src); // Open modal with clicked image src
  });
}

// Get all original and cloned modal trigger elements (images)
const allImages = sliderTrack.querySelectorAll('img');

// Loop through each trigger element
allImages.forEach(img => {
  // Attach click event to each image
  img.addEventListener('click', () => {
    openModal(img.src); // Open modal with clicked image src
  });
});

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

function toggleDiv(divId) {
  const divs = document.querySelectorAll('.toggle-div');
  let isCurrentlyVisible = false;
  
  divs.forEach(div => {
      if (div.id === divId) {
          if (div.style.display === 'block') {
              isCurrentlyVisible = true;
              div.style.display = 'none';
          } else {
              div.style.display = 'block';
          }
      } else {
          div.style.display = 'none';
      }
  });

  if (!isCurrentlyVisible) {
      const introDiv = document.getElementById('sintro');
      if (divId !== 'sintro') {
          introDiv.style.display = 'none';
      } else {
          introDiv.style.display = 'block';
      }
  } else {
      document.getElementById('sintro').style.display = 'block';
  }
}