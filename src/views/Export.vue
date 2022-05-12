<template>
  <div class="export-excel">
    <el-button slot="trigger" size="small" type="primary" @click="exportExcelByDDArray">二维数组导出</el-button>
  </div>
</template>

<script>
import { exportExcelByDoubleDimensArray } from '@/utils/xlsx';

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
  },
};
</script>

<style></style>
