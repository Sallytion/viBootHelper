// content.js
function extractTableData() {
    const table = document.querySelector('.table-responsive .table');
    if (!table) {
        console.log('Table not found');
        return null;
    }

    const rows = Array.from(table.querySelectorAll('tr'));
    const data = rows.slice(1).map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        return {
            courseCode: cells[1].innerText,
            courseTitle: cells[2].innerText,
            slot: cells[5].innerText,
            faculty: cells[6].innerText
        };
    });

    console.log('Extracted table data:', data);
    return data;
}

// content.js
function extractSecondTableData() {
    const secondTable = document.querySelector('.table.table-bordered.table-hover.responsive');
    if (!secondTable) {
        console.log('Second table not found');
        return null;
    }

    const rows = Array.from(secondTable.querySelectorAll('tbody tr'));
    const data = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const button = row.querySelector('button'); // Assuming each row has a button
        const rowData = {
            slNo: cells[0].innerText.trim(),
            topic: cells[3].innerText.trim()
        };

        if (button) {
            button.addEventListener('click', () => {
                chrome.runtime.sendMessage({ action: 'buttonPressed', rowData });
            });
        }

        return rowData;
    });

    console.log('Extracted second table data:', data);
    return data;
}

function tryExtractTableData(retryInterval = 500) {
    const data = extractTableData();
    if (data) {
        chrome.runtime.sendMessage({ action: 'tableData', data });
    }

    const secondTableData = extractSecondTableData();
    if (secondTableData) {
        secondTableData.forEach(row => {
            console.log(`[${row.slNo}-${row.topic}]`);
        });
    }

    setTimeout(() => tryExtractTableData(retryInterval), retryInterval);
}

tryExtractTableData();