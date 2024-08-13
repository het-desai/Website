document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('blog-content');

    async function loadMarkdown(url) {
        try {
            const response = await fetch(url);
            const markdown = await response.text();
            contentDiv.innerHTML = marked(markdown);
        } catch (error) {
            console.error('Failed to load markdown', error);
            contentDiv.innerHTML = '<p>Error loading blog.</p>';
        }
    }

    loadMarkdown('https://raw.githubusercontent.com/het-desai/hackthebox/main/bizness/write-up.md');
});
