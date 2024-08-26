(function() {
    // Function to fetch and parse the quotes
    function fetchQuotes() {
        return fetch('quotes.txt')
            .then(response => response.text())
            .then(data => data.split('*').filter(quote => quote.trim() !== ""));
    }

    // Function to update the h1 text with a random quote
    function updateQuote() {
        console.log("Image clicked! Updating quote...");
        fetchQuotes().then(quotes => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            // Set the innerHTML to allow HTML tags like <br>
            document.querySelector('.ntxt').innerHTML = randomQuote.trim();
        }).catch(error => console.error('Error fetching quotes:', error));
    }

    // Event listener for the nimg image click
    document.querySelector('.nimg').addEventListener('click', updateQuote);
})();
