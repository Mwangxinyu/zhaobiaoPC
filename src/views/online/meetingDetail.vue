<template>
  <div>
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
    <div style="background:#fff;padding:20px">
      <el-form :model="conference" size="mini">
        <el-row>
          <el-col :span="10">
            <div>
              <el-form-item label="会议名称：">
                <span style="color:#666;">{{conference.conferenceName}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="14">
            <div />
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="12">
            <div>
              <el-form-item label="会议说明：">
                <span style="color:#666;">{{conference.conferenceDesc}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已投票">
              <div v-for="(tag,index) in votedName" @click="votedJump(tag)" :key="index">
                <el-tag :disable-transitions="false" style="margin-left: 10px">
                  <span style="cursor:pointer;">{{ tag.name }}</span>
                </el-tag>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-top:10px;">
          <div style="width:80%;margin:0 auto">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>本次会议的结果</span>
                <el-button style="float: right;" size="mini" @click="fnClickExportDetail">导出</el-button>
              </div>
              <el-table :data="option" border stripe style="width: 100%" @selection-change="fnOnSelectTopic">
                <el-table-column type="selection" />
                <el-table-column prop="topic_name" label="议题名称" width="180" />
                <el-table-column prop="" label="投票结果" width="100">
                  <template slot-scope="scope">
                    <el-tag v-for="(tag,index) in scope.row.option" :key="index" :disable-transitions="false">
                      {{ tag.optioninfo }} : {{ tag.optionNum }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="maxOptionDesc" label="最终结果" />
              </el-table>
            </el-card>
          </div>
          <el-row style="margin-top:10px;">
            <el-col :span="12">
              <div>
                <el-form-item label="发起时间：">
                  <span style="color:#666">{{ conference.startTime | formatDate }}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="12">
              <el-form-item label="结束时间：">
                <span style="color:#666;">{{ conference.endTime | formatDate }}</span>
              </el-form-item>


            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
          <hr>
          <el-row>
            <div>
              <el-button v-if="conference.url" type="info" @click="fnClickDownload(conference.url)">附件</el-button>
            </div>
          </el-row>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {
    seeDetailButtonOnline
  } from '@/api/public'
  import url from '@/api/url'
  export default {
    filters: {
      formatDate(time) {
        time = time.replace(/\-/g, '\/')
        const date = new Date(time)
        let fmt = 'yyyy-MM-dd hh:mm'
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (const k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
          }
        }
        return fmt
      }
    },
    data() {
      return {
        exportMeetingDetailModel: {
          conferenceId: '',
          issArr: []
        },
        conference: {
          conferenceName: '',
          conferenceDesc: '',
          endTime: '',
          startTime: '',
          url: '',
          result: ''
        },
        votedName: [],
        option: [{
          topic_name: '',
          maxOptionDesc: '',
          optionName: '',
          optionNum: '',
          option: [{
            Issues_id: '',
            topic_name: '',
            optioninfo: '',
            optionNum: ''
          }]
        }],
        //投票人入参
        votedDetailByUser: {
          account: "",
          conferenceId: ""
        }
      }
    },
    created() {


      this.fnInitPageData()
    },
    methods: {
      /*
       *投票人的详情 
       */
      votedJump(val) {
        this.votedDetailByUser.account = val.account
        this.$router.push({
           path: '/voteDetail',
           query:{
               votedDetailByUser:this.votedDetailByUser
           }
        })
      },
      /**
       * 页面数据初始化
       */
      fnInitPageData() {
        this.fnNetGetOnlineDetail(this.$route.params.id)
      },
      /**
       * 获取会议详情数据
       * @param id
       */
      fnNetGetOnlineDetail(id) {
        seeDetailButtonOnline(id).then(res => {
          if (res.code === 0) {
            this.conference = res.data.conference
            this.votedName = res.data.votedName
            this.option = res.data.option
            this.votedDetailByUser.conferenceId = res.data.conference.id
            // 设置导出model id
            this.exportMeetingDetailModel.conferenceId = res.data.conference.id
          }
        }).catch(function (error) {

        })
      },
      /**
       * 选中会议结果
       * 将选中数据添加到导出model
       */
      fnOnSelectTopic(row) {
        const arr = []
        for (const r in row) {
          arr.push(row[r].option[0].Issues_id)
        }
        this.exportMeetingDetailModel.issArr = arr
      },
      /**
       * 导出 会议详情 excel
       */
      fnClickExportDetail() {
        if (this.exportMeetingDetailModel.issArr.length > 0) {
          window.open(url.exportDetail + '?conferenceId=' + this.exportMeetingDetailModel.conferenceId + '&issArr=' +
            this.exportMeetingDetailModel.issArr, '_blank')
          window.close()
        }
      },
      fnClickDownload(fileName) {
        if (fileName) {
          window.open(url.download + '?fileName=' + fileName, '_blank')
          window.close()
        }
      }
    }
  }

</script>
<style>
  .el-input {
    width: 80%;

  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

</style>
