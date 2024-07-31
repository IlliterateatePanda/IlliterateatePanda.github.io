(function() {
  // Get all modal trigger elements (images)
  const images = document.getElementsByClassName('ming');

  // Get the modal and modal image
  const modal = document.querySelector('.custom-modal');
  const modalImg = modal.querySelector('.custom-modal-content');

  // Get the close button
  const closeButton = modal.querySelector('.custom-close');

  // Function to open modal and set image source
  function openModal(src) {
    modal.style.display = "block"; // Display the modal
    modalImg.src = src; // Set modal image src
  }

  // Function to close modal
  function closeModal() {
    modal.style.display = "none"; // Hide the modal
  }

  // Loop through each trigger element
  for (let img of images) {
    // Attach click event to each image
    img.onclick = function() {
      const modalSrc = this.getAttribute('data-modal-img'); // Get the corresponding modal image
      openModal(modalSrc); // Open modal with the mapped image src
    };
  }

  // Close the modal when close button is clicked
  closeButton.onclick = closeModal;

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
})();