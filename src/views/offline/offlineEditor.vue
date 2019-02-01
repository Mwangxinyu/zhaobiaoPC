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
      <el-form :model="editorData" ref="editorData">
        <el-form-item label="会议名称" style="margin-bottom:30px">
          <el-input v-model="editorData.conferenceName" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="会议时间" style="margin-bottom:30px">
          <el-input v-model="editorData.startTime" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="评委人员" style="margin-bottom:30px">
          <el-input v-model="editorData.juryStr" style="width:40%" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="监察委员" style="margin-bottom:30px">
          <el-input v-model="editorData.superviseStr" style="width:40%" type="textarea"></el-input>
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
      <el-table border :data="tableData" style="width: 40%;">
        <el-table-column prop="name" label="议题名称" width="180">
        </el-table-column>
        <el-table-column prop="result" label="选项内容" width="180">
        </el-table-column>
      </el-table>
    </div>
    <div class="dev1_border" />
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="10" class="contract-ml10">
            <span class="dev1-line" />
            <span class="dev1_font">附件</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="dev1_border" />
  </div>
</template>
<script>
  import {
    launchonlinindexconference,
    SearchOfflineIndexConference,
    seeDetailButtonOffline
  } from '@/api/public'
  export default {
    data() {
      return {
        //编辑表单data
        editorData: {
          conferenceName: '',
          startTime: '',
          juryStr: '',
          superviseStr: ''
        },
        tableData: [{
          name: '***议题',
          result: '发发发',
        }, {
          name: '***议题',
          result: '发发发',
        }, {
          name: '***议题',
          result: '发发发',
        }, {
          name: '***议题',
          result: '方法',
        }]
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        seeDetailButtonOffline(this.$route.params.id).then(res => {
          this.editorData = res.data
        })
      }
    }
  }

</script>
