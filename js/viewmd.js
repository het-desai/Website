// Function to fetch the markdown from GitHub and render it as HTML
function fetchMarkdown() {

    let errorDiv = document.getElementById('error-message');

    currentUrl = window.location.href;

    const splitUrl = currentUrl.split('#');

    let writeupUrl = splitUrl[1];

    let validUsers = ['het-desai']; // Add more allowed users to this list

    // Check if the writeupUrl starts with the base URL and a valid user in the validUsers array
    let isValidUser = validUsers.some(user => writeupUrl.startsWith('https://raw.githubusercontent.com/' + user));

    if (isValidUser) {
        markdownUrl = writeupUrl;

        fetch(markdownUrl)
            .then(response => response.text())
            .then(markdown => {
                // console.log("Markdown fetched successfully:", markdown);

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

    // Match all occurrences of the regex in the HTML string
    let matches;
    while ((matches = regex.exec(html)) !== null) {
        // matches[0] is the full URL matched, e.g., https://github.com/username/repo/blob/branch/path/to/image.png

        const [fullMatch, user, repo, path] = matches;

        // Construct the raw URL for the image
        const rawUrl = `https://raw.githubusercontent.com/${user}/${repo}/${path}`;

        // Replace the matched blob URL with the raw URL in the HTML content
        html = html.replace(fullMatch, rawUrl);
    }

    return html;
}

// Call the function to fetch and display the markdown
fetchMarkdown();