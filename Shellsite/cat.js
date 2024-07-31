document.addEventListener('DOMContentLoaded', function() {
    fetch('cat-facts.txt')
        .then(response => response.text())
        .then(data => {
            const catFacts = data.split('\n').filter(fact => fact.trim() !== '');
            
            document.getElementById('get-cat-fact').addEventListener('click', function() {
                const randomFactIndex = Math.floor(Math.random() * catFacts.length);
                const fact = catFacts[randomFactIndex];

                // Fetch a random cat image from Cataas
                fetch('https://cataas.com/cat')
                    .then(response => response.url) // Get the URL of the cat image
                    .then(imageUrl => {
                        document.getElementById('cat-fact-text').textContent = fact;
                        document.getElementById('cat-image').src = imageUrl;
                    })
                    .catch(error => console.error('Error fetching cat image:', error));
            });
        })
        .catch(error => console.error('Error loading cat facts:', error));
});
