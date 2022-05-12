// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import XLSX from 'xlsx';

/**
 * 将 file 转为一个 CSF 的 JSON
 * @param {File} file
 * @returns sheets
 * FileReader 是异步读取方法，所以这里和 Promise 结合使用
 */
const analyseExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();

      reader.onloadend = (progressEvent) => {
        const arrayBuffer = reader.result;

        const options = { type: 'array' };
        const workbook = XLSX.read(arrayBuffer, options);

        const sheetNames = workbook.SheetNames;
        const result = sheetNames.map((sheetName) => workbook.Sheets[sheetName]);
        resolve(result);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('入参不是 File 类型'));
    }
  });
};

const generateExcelBySheet = (sheet) => {
  return XLSX.utils.sheet_to_html(sheet);
};

/**
 *
 * @param {Array} sheets sheet的集合
 * @param {String} fileName 下载时文件名称
 */
const exportExcelBySheets = (sheets, fileName = 'example.xlsx') => {
  const SheetNames = [];
  const Sheets = {};
  const workbook = { SheetNames, Sheets };

  sheets.forEach((sheet, i) => {
    const name = `sheet${i + 1}`;
    SheetNames.push(name);
    Sheets[name] = sheet;
  });

  return XLSX.writeFile(workbook, fileName, { type: 'binary' });
};

/**
 *
 * @param {Array} workSheetData 二维数组
 * @param {String} fileName 下载时文件名称
 */
const exportExcelByDoubleDimensArray = (workSheetData, fileName = 'example.xlsx') => {
  const ws = XLSX.utils.aoa_to_sheet(workSheetData);
  const workSheetName = 'MySheet';
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, ws, workSheetName);
  return XLSX.writeFile(workbook, fileName, { type: 'binary' });
};

export { analyseExcelToJson, exportExcelBySheets, generateExcelBySheet, exportExcelByDoubleDimensArray };
