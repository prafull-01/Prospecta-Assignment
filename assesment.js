const fs = require('fs');
const path = require('path');

// A map to store cell values and their formulas
let cellData = new Map();

// Function to process the CSV file
function processCSV(inputFile) {
    const data = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf8');
    const lines = data.split('\n');

    let row = 1;
    lines.forEach(line => {
        const cells = line.split(',');
        cells.forEach((cell, col) => {
            const cellKey = getCellKey(row, col + 1); // e.g., A1, B1, etc.
            cellData.set(cellKey, cell.trim());
        });
        row++;
    });
}

// Convert row and column number to cell key (A1, B2, etc.)
function getCellKey(row, col) {
    return String.fromCharCode('A'.charCodeAt(0) + col - 1) + row;
}

// Evaluate the cells and write the output to a CSV
function evaluateAndWriteCSV(outputFile) {
    let output = '';

    cellData.forEach((valueOrFormula, cellKey) => {
        const result = evaluateCell(valueOrFormula);
        output += result + ',';
    });

    // Write the result to output file
    fs.writeFileSync(path.resolve(__dirname, outputFile), output.slice(0, -1), 'utf8');
}

// Evaluate cell formula or value
function evaluateCell(valueOrFormula) {
    if (valueOrFormula.startsWith('=')) {
        return evaluateFormula(valueOrFormula);
    }
    return valueOrFormula;
}

// Simple formula evaluator for addition (expandable for more operations)
function evaluateFormula(formula) {
    // Example: "=A1+B2" - Parse and evaluate it
    const tokens = formula.substring(1).split('+');
    let sum = 0;
    tokens.forEach(token => {
        token = token.trim();
        if (cellData.has(token)) {
            sum += parseInt(cellData.get(token), 10);
        } else {
            sum += parseInt(token, 10); // Assume it's a number
        }
    });
    return sum.toString();
}

// Main function to process input CSV and generate output CSV
function main() {
    processCSV('input.csv');
    evaluateAndWriteCSV('output.csv');
}

// Execute the main function
main();
