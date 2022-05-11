import XLSX from 'xlsx';

/**
 * 将 file 转为一个 CSF 的 JSON
 * @param {File} file
 * @returns JSON - CSF
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

        const sheetName = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetName];

        resolve(sheet);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('入参不是 File 类型'));
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { analyseExcelToJson };
