let links = []; // To store the extracted links

// Function to read each line from the 'links.txt' file and extract only the links
async function readTextFile() {
    try {
        // Fetch the text file
        const response = await fetch('links.txt');
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to load file');
        }

        // Get the text content of the file
        const text = await response.text();

        // Split the text content by line
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        // Regular expression to match URLs
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        // Extract each link and store it in the 'links' array
        lines.forEach((line) => {
            const matches = line.match(urlRegex);
            if (matches) {
                matches.forEach((url) => {
                    links.push(url);
                });
            }
        });

        console.log('Links loaded:', links); // For debugging purposes

    } catch (error) {
        console.error('Error reading the text file:', error);
    }
}

// Function to load a random link into the iframe and log the current link
function loadRandomLink() {
    if (links.length === 0) {
        alert('No links available to load.');
        return;
    }

    // Select a random link from the list
    const randomLink = links[Math.floor(Math.random() * links.length)];

    // Set the iframe's src to the random link
    const iframe = document.getElementById('iframe');
    iframe.src = randomLink;

    // Log the current link being shown in the iframe
    console.log(`Current iframe link: ${randomLink}`);
}

// Event listener for the button
document.getElementById('randomLinkButton').addEventListener('click', loadRandomLink);

// Call the function to read the file on page load
readTextFile();
