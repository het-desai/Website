// Function to fetch the markdown from GitHub and render it as HTML
function fetchMarkdown() {

    let errorDiv = document.getElementById('error-message');

    const params = new URLSearchParams(window.location.search);
    let writeupUrl = params.get('src');

    // Clean the URL immediately — removes ?src=... from the address bar
    history.replaceState(null, '', '/viewmd/index.html');

    if (!writeupUrl) {
        errorDiv.textContent = 'No content URL provided.';
        errorDiv.style.display = 'block';
        return;
    }

    let validUsers = ['het-desai']; // Add more allowed users to this list

    // Check if the writeupUrl starts with the base URL and a valid user in the validUsers array
    let isValidUser = validUsers.some(user => writeupUrl.startsWith('https://raw.githubusercontent.com/' + user));

    if (isValidUser) {
        fetch(writeupUrl)
            .then(response => response.text())
            .then(markdown => {
                // Error message
                errorDiv.style.display = 'none';

                // Convert markdown to HTML using marked.js
                let htmlContent = marked(markdown);

                // Find and replace GitHub image URLs
                htmlContent = replaceGitHubImageUrls(htmlContent);

                // Inject the converted HTML into the webpage
                document.getElementById('markdown-content').innerHTML = htmlContent;
            })
            .catch(error => {
                console.error("Error fetching the markdown file:", error);
                document.getElementById('markdown-content').innerHTML = "<p>Error loading markdown content.</p>";
            });
    } else {
        errorDiv.textContent = 'Invalid URL or User';
        errorDiv.style.display = 'block';
    }
}

function replaceGitHubImageUrls(html) {
    // Regular expression to find GitHub image URLs (blob format)
    const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^"']+\.(jpg|jpeg|png|gif|svg|bmp|webp))/g;

    let matches;
    while ((matches = regex.exec(html)) !== null) {
        const [fullMatch, user, repo, path] = matches;

        // Construct the raw URL for the image
        const rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${path}`;

        html = html.replace(fullMatch, rawUrl);
    }

    return html;
}

// Call the function to fetch and display the markdown
fetchMarkdown();