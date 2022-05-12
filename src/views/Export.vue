<template>
  <div class="export-excel">
    <el-button size="small" type="primary" @click="exportExcelByTable">表格导出</el-button>
    <el-button size="small" type="success" @click="exportExcelByDDArray">二维数组导出</el-button>
  </div>
</template>

<script>
import { exportExcelByDoubleDimensArray, exportExcelByTable } from '@/utils/xlsx';

export default {
  name: 'ExportExcel',
  data() {
    this.worksheetData = [
      ['S', 'h', 'e', 'e', 't', 'J', 'S'],
      [1, 2, 3, 4, 5],
    ];
    return {};
  },
  methods: {
    //   通过二维数组导出 excel
    exportExcelByDDArray() {
      exportExcelByDoubleDimensArray(this.worksheetData);
    },
    // 将 table 导出 Excel
    exportExcelByTable() {
      exportExcelByTable();
    },
  },
};
</script>

<style></style>
