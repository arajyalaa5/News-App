const API_KEY = "97e534a4ba8b4a179afcdc1583a95c93";  // Api key
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search");

async function fetchNews(query = "") {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
    if (query) {
        url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = "";  // Clear previous news

    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.className = "card";
        newsCard.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
    fetchNews(searchInput.value);
});

// Load default news on page load
fetchNews();