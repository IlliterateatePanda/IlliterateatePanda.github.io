(function() {
    // Initialize counters
    let visibleCount = 0;
    let booting = 0; // Variable to count total number of h3visible elements
    let bootDeleted = 0; // Variable to track if the boot div has been deleted
    
    // Fetch the text from the .txt file
    fetch('textfile.txt')
        .then(response => response.text())
        .then(data => {
            // Split the text into an array by new lines
            const lines = data.split('\n');
            
            // Get the div with class 'boot'
            const contentDiv = document.querySelector('.boot');
            
            let delay = 0; // Start with no delay
            
            lines.forEach((line, index) => {
                if(line.trim() !== '') { // Avoid adding empty lines
                    const h3 = document.createElement('h3');
                    h3.classList.add('h3typing'); // Add the class for typing effect
                    h3.textContent = line;
                    
                    // Set the typing speed
                    const typingSpeed = 0.0005; // seconds per character
                    const typingDuration = line.length * typingSpeed;
                    
                    // Set the animation duration and delay dynamically
                    h3.style.animation = `typing ${typingDuration}s steps(${line.length}, end)`;
                    h3.style.animationDelay = `${delay}s`; // Delay based on previous lines
                    
                    // Update delay for the next element
                    delay += typingDuration + 0.001; // Add extra time to ensure animations don't overlap
                    
                    // Add an event listener to change the class after animation ends
                    h3.addEventListener('animationend', function() {
                        h3.classList.remove('h3typing');
                        h3.classList.add('h3visible');
                        
                        // Increment the counter
                        visibleCount++;
                        booting++;
                        console.log(`Number of h3 elements visible: ${visibleCount}`);
                        console.log(`Total number of h3visible elements: ${booting}`);
                        
                        // Remove the oldest h3 element if count exceeds 40
                        if (visibleCount > 40) {
                            const oldestH3 = contentDiv.querySelector('.h3visible');
                            if (oldestH3) {
                                contentDiv.removeChild(oldestH3);
                                visibleCount--;
                            }
                        }
                        
                        // Delete the boot div with a delay when booting equals 230
                        if (booting === 230) {
                            setTimeout(() => {
                                contentDiv.remove();
                                console.log('The boot div has been deleted.');
                                bootDeleted = 1; // Set bootDeleted to 1 when the div is deleted
                                console.log(`bootDeleted variable is now: ${bootDeleted}`);
                                
                                // Redirect when bootDeleted equals 1
                                if (bootDeleted === 1) {
                                    window.location.href = 'http://127.0.0.1:5500/testsites/port/Home.html'; // Replace with your desired link
                                }
                            }, 900); // Delay of 500 milliseconds
                        }
                    });

                    contentDiv.appendChild(h3);
                }
            });
        })
        .catch(error => console.error('Error fetching the text file:', error));
})();

(function() {
  // Get all modal trigger elements (images)
  const images = document.querySelectorAll('.foldercont .fimg');

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
  images.forEach(function(img) {
    // Attach click event to each image
    img.onclick = function() {
      const modalSrc = this.src; // Get the image source
      openModal(modalSrc); // Open modal with the clicked image src
    };
  });

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

(function() {
    // Get the image element with the class 'nimg'
    const nimg = document.querySelector('.nimg');

    // Add a click event listener to the image
    nimg.addEventListener('click', () => {
        console.log('hi');
    });
})();

