<template>
  <div style="background:#fff;">
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="10" class="contract-ml10">
            <span class="dev1-line" />
            <span class="dev1_font">详细信息</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dev1_border" />
    <div style="padding:20px">
      <el-form ref="editorData" :model="editorData">
        <el-form-item label="会议名称：" style="margin-bottom:30px">
          <span style="color:#666">{{editorData.conferenceName}}</span>
          <!-- <el-input :disabled="true" v-model="editorData.conferenceName" style="width:40%"/> -->
        </el-form-item>
        <el-form-item label="会议时间：" style="margin-bottom:30px">
          <span style="color:#666;">{{editorData.startTime}}</span>
          <!-- <el-input :disabled="true" v-model="editorData.startTime" style="width:40%"/> -->
        </el-form-item>
        <el-form-item label="评委人员：" style="margin-bottom:30px">
          <span style="color:#666">{{editorData.juryStr}}</span>
          <!-- <el-input :disabled="true" v-model="editorData.juryStr" style="width:40%" type="textarea"/> -->
        </el-form-item>
        <el-form-item label="监察委员：" style="margin-bottom:30px">
          <span style="color:#666">{{editorData.superviseStr}}</span>
          <!-- <el-input :disabled="true" v-model="editorData.superviseStr" style="width:40%" type="textarea"/> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="dev1_border" />
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="10" class="contract-ml10">
            <span class="dev1-line" />
            <span class="dev1_font">会议结果</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dev1_border" />
    <div style="padding:20px">
      <el-table :data="editorData.result" border style="width: 35%;">
        <el-table-column prop="topicName" label="议题名称" width="180" />
        <el-table-column prop="optionDesc" label="选项内容" width="180" />
      </el-table>
    </div>
    <div class="dev1_border" />
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="10" class="contract-ml10">
            <span class="dev1-line" />
            <span v-if="editorData.url !== ''" class="dev1_font" @click="fnPreviewPdf(editorData.url)">附件</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dev1_border" />
    <el-row>
      <el-col :span="24">
        <div />
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    seeDetailButtonOffline
  } from '@/api/public'
  import url from '@/api/url'
  export default {
    data() {
      return {
        editorData: {
          conferenceName: '',
          startTime: '',
          juryStr: '',
          superviseStr: '',
          url: '',
          result: ''
        }
      }
    },
    created() {
      this.fnInitPageData()
    },
    methods: {
      /**
       * 页面初始话
       */
      fnInitPageData() {
        seeDetailButtonOffline(this.$route.params.id).then(res => {
          this.editorData = res.data
          this.editorData.result = JSON.parse(res.data.result)
        })
      },
      /**
       * 预览
       * @param fileName 附件地址
       */
      fnPreviewPdf(fileName) {
        if (fileName) {
          window.open(url.download + '?fileName=' + fileName, '_blank')
          window.close()
        }
      }
    }
  }

</script>
