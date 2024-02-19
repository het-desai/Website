// Function to read data from a local JSON file
async function readLocalJSON() {
    try {
        const response = await fetch('../database/dataset.json'); // Adjust the path to your JSON file
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error reading local JSON file:', error);
        return [];
    }
}

const table = document.querySelector('.result-table');

table.style.display = 'none';

// Function to filter repositories based on your criteria
function filterRepos(repos, keyword) {
    return repos.filter(entry =>
        entry.plateform.toLowerCase().includes(keyword.toLowerCase()) ||
        entry.machine.toLowerCase().includes(keyword.toLowerCase()) ||
        entry.description.toLowerCase().includes(keyword.toLowerCase())
    );
}

// Function to display filtered repositories in the table
function displayRepos(filteredEntries) {
    const tableBody = document.querySelector('.result-table tbody');
    tableBody.innerHTML = '';

    if (filteredEntries.length > 0) {
        const table = document.querySelector('.result-table');
        table.style.display = 'table';

        filteredEntries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `<td><a href="${entry.url}" target="_blank">${entry.plateform}</a></td><td><a href="${entry.url}" target="_blank">${entry.description || 'No description'}</a></td>`;
            tableBody.appendChild(row);
        });
    } else {
        table.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const repos = await readLocalJSON();

    const searchInput = document.querySelector('.search-bar input');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.trim();
            const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9.\s-]/g, '');
            console.log(sanitizedSearchTerm);
            if (sanitizedSearchTerm.length >= 4) {
                const filteredRepos = filterRepos(repos, sanitizedSearchTerm);
                displayRepos(filteredRepos);
            } else {
                table.style.display = 'none';
            }
        });
    }
});