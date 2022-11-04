<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <!-- 隐藏, 通过ref控制 input元素的点击事件 -->
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon>
        <Upload />
      </el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Upload } from '@element-plus/icons-vue'
  import * as XLSX from 'xlsx'
  import { ElMessage } from 'element-plus'

  type Props = {
    // eslint-disable-next-line no-unused-vars
    beforeUpload?: (file: File) => boolean
    // eslint-disable-next-line no-unused-vars
    onSuccess?: (data: { header: string[]; results: any[] }) => void
  }
  const props = defineProps<Props>()
  const loading = ref(false)
  const excelUploadInput = ref<HTMLInputElement>()

  const isExcel = (file: File) => {
    return /\.(xlsx|xls|csv)$/.test(file.name)
  }
  /**
   * 获取表头（通用方式）
   */
  const getHeaderRow = (sheet: XLSX.WorkSheet) => {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref']!)
    let C
    const R = range.s.r
    /* start in the first row */
    // eslint-disable-next-line no-plusplus
    for (C = range.s.c; C <= range.e.c; ++C) {
      /* walk every column in the range */
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      let hdr = `UNKNOWN ${C}` // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }
  /**
   * 根据导入内容，生成数据
   */
  const generateData = (excelData: { header: string[]; results: any[] }) => {
    if (props.onSuccess) {
      props.onSuccess(excelData)
    }
  }
  /**
   * 读取数据（异步）
   */
  const readerData = (rawFile: File) => {
    loading.value = true
    return new Promise((resolve) => {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      const reader = new FileReader()
      // 该事件在读取操作完成时触发
      // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
      reader.onload = (e) => {
        // 1. 获取解析到的数据
        const data = e.target!.result
        // 2. 利用 XLSX 对数据进行解析
        const workbook = XLSX.read(data, { type: 'array' })
        // 3. 获取第一张表格(工作簿)名称
        const firstSheetName = workbook.SheetNames[0]
        // 4. 只读取 Sheet1（第一张表格）的数据
        const worksheet = workbook.Sheets[firstSheetName]
        // 5. 解析数据表头
        const header = getHeaderRow(worksheet)
        // 6. 解析数据体
        const results = XLSX.utils.sheet_to_json<any>(worksheet)
        // 7. 传入解析之后的数据
        generateData({ header, results })
        // 8. loading 处理
        loading.value = false
        // 9. 异步完成
        resolve('')
      }
      // 启动读取指定的 Blob 或 File 内容
      reader.readAsArrayBuffer(rawFile)
    })
  }
  const upload = (file: File) => {
    // 如果没有指定上传前回调的话
    if (!props.beforeUpload) {
      readerData(file)
      return
    }
    // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
    const before = props.beforeUpload(file)
    if (before) {
      readerData(file)
    }
  }

  const handleUpload = () => {
    excelUploadInput.value?.click()
  }
  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files![0]
    if (!file) return
    upload(file)
  }

  const handleDrop = (e: DragEvent) => {
    // 上传中跳过
    if (loading.value) return
    const files = e.dataTransfer?.files || []
    if (files.length !== 1) {
      ElMessage.error('必须要有一个文件')
      return
    }
    const rawFile = files[0]
    if (!isExcel(rawFile)) {
      ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
      return
    }
    // 触发上传事件
    upload(rawFile)
  }
  /**
   * 拖拽悬停时触发
   */
  const handleDragover = (e: DragEvent) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
    // 在新位置生成源项的副本
    e.dataTransfer!.dropEffect = 'copy'
  }
</script>

<style lang="scss" scoped>
  .upload-excel {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .excel-upload-input {
      display: none;
      z-index: -9999;
    }
    .btn-upload,
    .drop {
      border: 1px dashed #bbb;
      width: 350px;
      height: 160px;
      text-align: center;
      line-height: 160px;
    }
    .drop {
      line-height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #bbb;
      i {
        font-size: 60px;
        display: block;
      }
    }
  }
</style>
