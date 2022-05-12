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

const exportExcelBySheets = () => {
  console.log(123);
};

export { analyseExcelToJson, exportExcelBySheets, generateExcelBySheet };
