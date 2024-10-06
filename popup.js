// popup.js
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'getTableData' }, (response) => {
        if (response) {
            console.log('Table data received in popup:', response);
            renderTable(response);
        } else {
            console.log('No table data received in popup');
        }
    });
});

// popup.js
function renderTable(data) {
    const table = document.createElement('table');
    table.className = 'table';
    table.style.backgroundColor = '#fff';
    table.style.border = '1px solid #ddd';
    table.style.fontSize = '13px';
    table.style.padding = '4px';
    table.style.textAlign = 'center';

    data.forEach(rowData => {
        const row = document.createElement('tr');
        Object.values(rowData).forEach(cellData => {
            const cell = document.createElement('td');
            cell.style.verticalAlign = 'middle';
            cell.style.textAlign = 'center';
            cell.style.border = '1px solid #b2b2b2';
            cell.style.padding = '7px';
            cell.innerText = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    document.body.appendChild(table);
}