<template>
  <div class="demo">
    <el-upload
      ref="upload"
      class="upload-demo"
      action="#"
      multiple
      :before-upload="beforeExcelUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="true"
      :http-request="handleHttpRequest"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px" size="small" type="success" @click="analyseUpload">读取数据</el-button>
      <div slot="tip" class="el-upload__tip">在根目录下有一个 Demo.xlsx</div>
    </el-upload>
  </div>
</template>

<script>
import { analyseExcelToJson } from '@/utils/xlsx';

export default {
  name: 'ImportExcel',
  data() {
    return {
      fileList: [],
      result: [],
    };
  },
  methods: {
    async analyseUpload() {
      if (!this.fileList.length) return;
      console.log('读取数据');

      const promises = this.fileList.map(({ file }) => analyseExcelToJson(file));
      const result = await Promise.all(promises);
      console.log(result);
    },
    // 文件列表移除文件时的钩子
    handleRemove(file) {
      const { uid } = file;

      for (let i = 0; i < this.fileList.length; i += 1) {
        const ele = this.fileList[i];

        if (uid === ele.uid) {
          this.fileList.splice(i, 1);
          break;
        }
      }
      console.log(file, this.fileList);
    },
    // 点击文件列表中已上传文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    handleHttpRequest(incomeFile) {
      const { file } = incomeFile;
      const { name } = file;

      this.fileList.push({ name, file });
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeExcelUpload(file) {
      if (!file) {
        return false;
      }
      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传 xls 或者 xlsx 格式');
        return false;
      }
      return true;
    },
  },
};
</script>
