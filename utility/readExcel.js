'use strict';

const XLSX = require('xlsx');

const readExcel = () => {
  const workbook = XLSX.readFile('public/FileExcel/ExcelProcess.xlsx');//'public/FileExcel/ExcelProcess.xlsx');  // Step 2
  let workbook_sheet = workbook.SheetNames;                // Step 3
  let workbook_response = XLSX.utils.sheet_to_json(        // Step 4
    workbook.Sheets[workbook_sheet[0]]
  );
  return workbook_response;
};

module.exports ={
  readExcel,
}



