'use strict';

const XLSX = require('xlsx');

const readExcel = () => {
  const workbook = XLSX.readFile('public/FileExcel/ExcelProcess.xlsx' );//'public/FileExcel/ExcelProcess.xlsx');  // Step 2
  let workbook_sheet = workbook.SheetNames;                // Step 3
  let workbook_response = XLSX.utils.sheet_to_json(        // Step 4
    workbook.Sheets[workbook_sheet[0]]
  );
  return workbook_response;
};

const readExcelByName = (fileName) => {

  const workbook = XLSX.readFile(`public/FileExcel/${fileName}`);//'public/FileExcel/ExcelProcess.xlsx');  // Step 2
  let workbook_sheet = workbook.SheetNames;
  //const cellDate = { c: 7 };             // Step 3
  //const cell_ref = XLSX.utils.encode_cell(cellDate);
  //const cell = workbook_sheet[cell_ref];

  let workbook_response = XLSX.utils.sheet_to_json(        // Step 4
    workbook.Sheets[workbook_sheet[0]], { raw: false }
  );
  return workbook_response;
};

module.exports = {
  readExcel,
  readExcelByName
}



