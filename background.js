// background.js
let tableData = null;
let buttonPressedRowData = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'tableData') {
        tableData = message.data;
        console.log('Table data received in background script:', tableData);
    } else if (message.action === 'buttonPressed') {
        buttonPressedRowData = message.rowData;
        console.log('Button pressed row data:', buttonPressedRowData);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getTableData') {
        console.log('Sending table data to popup:', tableData);
        sendResponse(tableData);
    }
});

chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
    if (tableData && buttonPressedRowData) {
        const { courseCode, courseTitle, slot, faculty } = tableData[0];
        const { slNo, topic } = buttonPressedRowData;
        const folderName = `VIT Downloads/${courseCode}-${courseTitle}/${slot}-${faculty}`;
        const extension = item.filename.split('.').pop();
        const filename = `${folderName}/${slNo}-${topic}.${extension}`;
        suggest({ filename });
    }
});