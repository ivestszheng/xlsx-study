<template>
  <div class="export-excel">
    <el-button size="small" type="primary" @click="exportExcelByTable">表格导出</el-button>
    <el-button size="small" type="success" @click="exportExcelByDDArray">二维数组导出</el-button>
    <!-- 内容为组件 -->
    <!-- <el-table ref="table" :data="tableData" style="width: 600px; margin: 0 auto">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址">
        <template slot-scope>
          <el-input :value="123" />
          <span style="display: none">123</span>
        </template>
      </el-table-column>
    </el-table> -->
    <!-- 使用 fixed 属性 -->
    <el-table ref="table" :data="tableData" style="width: 600px; margin: 0 auto" max-height="250">
      <el-table-column fixed prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120"> </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300"> </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
    </el-table>
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
    this.tableData = [
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
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
      exportExcelByTable(this.$refs.table.$el);
    },
  },
};
</script>

<style></style>
