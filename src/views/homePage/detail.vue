<template>
  <div>
    <el-form :model="votedformData" label-width="100px">
      <div style="background:#fff;padding:20px">
        <el-row>
          <el-col :span="10">
            <div>
              <el-form-item label="会议名称：">
                <span>
                  {{ votedformData.conferenceName }}
                </span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="10">
            <el-form-item label="会议描述：">
              <span>
                {{ votedformData.conferenceDesc }}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="10">
            <div>
              <el-form-item label="结束时间：">
                <span>
                  {{ votedformData.endTime | formatDate }}
                </span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="10">
            <div>
              <el-form-item label="已投人员：">
                <el-tag type="warning" v-for="(tag,index) in votedformData.votedName" :key="index" :disable-transitions="false">
                  {{tag.name}}
                </el-tag>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="10">
            <div>
              <el-form-item label="未投人员：">
                <el-tag type="info" v-for="(tag,index) in votedformData.noteVotedName" :key="index" :disable-transitions="false">
                  {{tag.name}}
                </el-tag>

              </el-form-item>
            </div>
          </el-col>
          <el-col :span="14" />
        </el-row>
      </div>
      <div class="dev1_border" />
      <div style="background:#fff;padding:20px">
        <div v-for="(item,index) in votedformData.issuesArr" :key="index">
          <!-- 夹杂中间的就是没有改成后端的字段 -->
          <el-row>
            <el-col :span="10">
              <el-form-item :label="'议题:' + (index +1)">
                <!-- <el-input v-model="item.issues.topicName" :disabled="true" /> -->
                <span>{{item.issues.topicName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14" />
          </el-row>
          <!-- 附件名称 -->
          <el-row style="margin-top:10px;">
            <el-col :span="10">
              <el-form-item label="">

                <span v-if="!item.url"></span>
                <span v-if="item.url" style="cursor: pointer;">
                  <a @click='tiaozhuan(item.url)' target="_blank">附件</a>
                </span>

              </el-form-item>
            </el-col>
            <el-col :span="14" />
          </el-row>
          <el-row style="margin: 10px 0 10px 100px;">
            <!-- 单选 -->
            <div>
              <el-radio-group v-model="item.checkList" v-if="item.issues.optionTypes===0" v-for="(itemcheck, index) in item.optionInfo" :key="index">
                <el-radio disabled :label="itemcheck.option">{{ itemcheck.option+':'+ itemcheck.optionDesc}}</el-radio>
              </el-radio-group>
            </div>
            <!-- 多选 -->
            <el-checkbox-group v-model="item.checkList" :max="Number(item.issues.optionMax)"
              v-for="(itemcheck, index) in item.optionInfo" :key="index">
              <el-checkbox disabled v-if="item.issues.optionTypes!==0" :label="itemcheck" @change='aaChangeCheck'>
                {{ itemcheck.option }}：
                {{ itemcheck.optionDesc }}</el-checkbox>
            </el-checkbox-group>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>
<style>
  .el-radio-group {
    display: block;

  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>

<script>
  import url from '@/api/url'
  import {
    readInfoMation
  } from '@/api/public'
  export default {
    filters: {
      formatDate(time) {
        time = time.replace(/\-/g, '\/')
        const date = new Date(time)
        let fmt = 'yyyy-MM-dd hh:mm'
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
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
        votedformData: {
          conferenceName: '',
          conferenceDesc: '',
          endTime: '',
          votedName: ['已投人员1', '已投人员2', '已投人员3'],
          noteVotedName: ['未投人员1', '未投人员2', '未投人员3'],
          issuesArr: [{
            issues: {
              optionTypes: ''
            },
            topicDesc: '',
            option: '',
            url: '',
            issuesId: '',
            comment: '',
            id: ''
          }]
        },
        //提交入参
        voteSubmit: {
          conferenceId: "",
          issuesInfo: [{
            issuesId: "",
            option: "",
            comment: ""
          }, ]
        },
      }
    },
    created() {
      this.fnInitDetail()
    },
    methods: {
      tiaozhuan(params) {
        window.location.href = url.downloadInterface + "?fileName=" + params
      },
      fnInitDetail() {
        readInfoMation(this.$route.params.id).then(res => {
          if (res.code === 0) {
            this.votedformData.conferenceName = res.data.conference.conferenceName
            this.votedformData.conferenceDesc = res.data.conference.conferenceDesc
            this.votedformData.endTime = res.data.conference.endTime
            this.votedformData.votedName = res.data.choose.votedName
            this.votedformData.noteVotedName = res.data.choose.noteVotedName
            
            res.data.issuesArr.forEach(item => {
              if (item.issues.optionTypes == 0) {
                item.checkList = ''
              } else {
                item.checkList = []
              }
            })
            this.votedformData.issuesArr = res.data.issuesArr
          }
        })
      },
      aaChangeCheck() {
      },
    }
  }

</script>
