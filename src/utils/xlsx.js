import XLSX from 'xlsx';

// 可接收参数 file 或 存有 file 的数组
// FileReader 是异步读取方法，所以这里和 Promise 结合使用
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
      reject(new Error('传参不是 File 类型'));
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { analyseExcelToJson };
