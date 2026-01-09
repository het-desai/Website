// Function to read data from a local JSON file
async function readLocalJSON() {
    try {
        const response = await fetch('../database/dataset.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error reading local JSON file:', error);
        return [];
    }
}

// Function to filter repositories based on keyword
function filterRepos(repos, keyword) {
    return repos.filter(entry =>
        entry.plateform.toLowerCase().includes(keyword.toLowerCase()) ||
        entry.machine.toLowerCase().includes(keyword.toLowerCase()) ||
        entry.description.toLowerCase().includes(keyword.toLowerCase())
    );
}

// Function to display repositories in the table
function displayRepos(entries) {
    const table = document.querySelector('.result-table');
    const tableBody = table.querySelector('tbody');

    tableBody.innerHTML = '';

    if (entries.length === 0) {
        table.style.display = 'none';
        return;
    }

    table.style.display = 'table';

    entries.forEach(entry => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${entry.machine || entry.plateform}</td>
            <td>${entry.description || 'No description'}</td>
        `;

        // Row click behavior
        row.addEventListener('click', () => {
            if (
                entry.plateform.includes('HackTheBox') ||
                entry.plateform.includes('TryHackMe') ||
                entry.plateform.includes('Offsec')
            ) {
                window.open('/viewmd/index.html#' + entry.url, '_blank');
            } else {
                window.open(entry.url, '_blank');
            }
        });

        // Optional class for styling
        row.classList.add('clickable-row');

        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', async function () {

    const table = document.querySelector('.result-table');
    const searchInput = document.querySelector('.search-bar input');

    table.style.display = 'none';

    const repos = await readLocalJSON();

    // 👉 Show all entries on page load
    displayRepos(repos);

    // Search input behavior
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim();
        const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9.\s-]/g, '');

        // Empty or < 4 chars → show all
        if (sanitizedSearchTerm.length === 0 || sanitizedSearchTerm.length < 4) {
            displayRepos(repos);
        }
        // ≥ 4 chars → filter
        else {
            const filteredRepos = filterRepos(repos, sanitizedSearchTerm);
            displayRepos(filteredRepos);
        }
    });
});

// Placeholder hint animation
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input');

    const placeholderTexts = [
        "Eg.: tryhackme",
        "Eg.: hackthebox",
        "Eg.: cheat sheet",
        "Eg.: blog",
        "Eg.: certificate",
        "Eg.: offsec"
    ];

    let currentIndex = 0;

    function updatePlaceholder() {
        searchInput.setAttribute('placeholder', placeholderTexts[currentIndex]);
        currentIndex = (currentIndex + 1) % placeholderTexts.length;
    }

    updatePlaceholder();
    setInterval(updatePlaceholder, 2000);
});