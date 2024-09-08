(function() {
    // Initialize counters
    let visibleCount = 0;
    let booting = 0; // Variable to count total number of h3visible elements
    let bootDeleted = 0; // Variable to track if the boot div has been deleted
    let spcKeystroke = 0; // New variable set to 0 by default
    let reset = 0; // New variable set to 0 by default
    let resetTimeout; // Variable to hold the timeout ID for the delay

    // Function to start the main script logic
    function startScript() {
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
                    if (line.trim() !== '') { // Avoid adding empty lines
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
                                        window.location.href = 'home.html'; // Replace with your desired link
                                    }
                                }, 900); // Delay of 900 milliseconds
                            }
                        });

                        contentDiv.appendChild(h3);
                    }
                });
            })
            .catch(error => console.error('Error fetching the text file:', error));
    }

    // Function to handle the Backspace key release with delay
    function handleBackspaceRelease() {
        if (reset < 3) {
            reset += 1;
            console.log(`reset variable is now: ${reset}`);
            // Reload the page when reset equals 3
            if (reset === 3) {
                console.log('reset has reached 3. Reloading the page.');
                window.location.reload(); // Reload the page
            }
        }
    }

    // Listen for the "Space" key to set spcKeystroke to 1 and start the script
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && spcKeystroke === 0) {
            spcKeystroke = 1;
            console.log(`spcKeystroke is now: ${spcKeystroke}`);
            
            // Remove the h1 element with the class "bsb" immediately
            const h1Element = document.querySelector('h1.bsb');
            if (h1Element) {
                h1Element.remove();
                console.log('h1 element with class "bsb" has been removed.');
            }
            
            // Add a delay of 0.3 seconds before starting the script
            setTimeout(startScript, 300); // Delay of 300 milliseconds (0.3 seconds)
        }
    });

    // Listen for the "keyup" event to handle the Backspace key release
    document.addEventListener('keyup', function(event) {
        if (event.code === 'Backspace') {
            // Clear any existing timeout to prevent overlapping delays
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }
            // Set a new timeout to handle the Backspace key release with a delay
            resetTimeout = setTimeout(handleBackspaceRelease, 50); // Delay of 300 milliseconds
        }
    });
})();
