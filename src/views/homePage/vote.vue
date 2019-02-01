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
      </div>
      <div class="dev1_border" />
      <div style="background:#fff;padding:20px">
        <div v-for="(item,index) in votedformData.shuzu" :key="index">
          <!-- 夹杂中间的就是没有改成后端的字段 -->
          <el-row>
            <el-col :span="10">
              <el-form-item :label="'议题:'"><b style="color:#666">[{{item.sno}}]</b>
                <span style="color:#666">{{item.issues.topicName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14" />
          </el-row>
          <el-row style="margin:20px 0px">
            <el-col :span="10">
              <el-form-item :label="'议题说明'">
                 <span style="color:#666">{{item.issues.topicDesc}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14" />
          </el-row>
          <!-- 附件名称 -->
          <el-row style="margin-top:10px;">
            <el-col :span="10">
              <el-form-item label="附件名称:">
                <span v-if="item.issues.url">
                  <el-button @click="see(item.issues.url)">
                    附件
                  </el-button>

                </span>
              </el-form-item>
            </el-col>
            <el-col :span="14" />
          </el-row>
          <el-row style="margin: 10px 0 10px 100px;">
            <!-- 单选 -->
            <div v-if="item.issues.optionTypes===0">
              <el-radio-group v-model="item.checkList" v-for="(itemcheck,index) in item.optionTableList"
                :key="index">
                <el-radio :label="itemcheck.option">{{ itemcheck.option+':'+ itemcheck.optionDesc}}</el-radio>
              </el-radio-group>
            </div>

            <!-- 多选 -->
            <el-checkbox-group v-model="item.checkList" :max="Number(item.issues.optionMax)" :min="Number(item.issues.optionMin)" v-for="(itemcheck,index) in item.optionTableList"
              :key="index">
              <el-checkbox v-if="item.issues.optionTypes!==0" :label="itemcheck" @change='aa'>
                {{ itemcheck.option }}：
                {{ itemcheck.optionDesc}}
              </el-checkbox>
            </el-checkbox-group>
          </el-row>
          <!-- 评议说明 -->
          <el-row style="margin-bottom:30px;">
            <el-col :span="10">
              <el-form-item label="评议说明:">
                <el-input v-model="item.issues.comment" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :span="14" />
          </el-row>
        </div>
        <div style="margin-top:90px;text-align:center">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="fnClickSubmit">提交</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<style>
  .el-radio-group {
    display: block
  }

</style>

<script>
  import {
    getIssuesByid,
    voteIssues
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
        zzzzzzzzzz: [],
        votedformData: {
          conferenceName: '',
          conferenceDesc: '',
          endTime: '',
          shuzu: [{
            issues: {
              optionTypes: '',
              comment: '',
            },

            // topicDesc: '',
            // option: '',
            // url: '',
            // issuesId: '',
            // id: ''
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
      /*
       *
      */
     cancel(){
      this.$router.push({
         path: '/index'
      })
     },
      /*
       *预览 
       */
      see(fileName) {
        if (fileName) {
          window.open(url.downloadInterface + '?fileName=' + fileName)
          window.close()
        } else {
          alert("没有附件")
        }
      },
      fnInitDetail() {
        getIssuesByid(this.$route.params.id).then(res => {
          if (res.code === 0) {
            this.votedformData.conferenceName = res.data.conference.conferenceName
            this.votedformData.conferenceDesc = res.data.conference.conferenceDesc
            this.votedformData.endTime = res.data.conference.endTime
            res.data.IssuesArr.sort(this.sortId)
            res.data.IssuesArr.forEach(item => {
              if (item.issues.optionTypes == 0) {
                item.checkList = ''
              } else {
                item.checkList = []
              }
            })
            this.votedformData.shuzu = res.data.IssuesArr
          }
          if (res.message == '该会议已结束') {
            this.$message({
              message: '该会议已结束',
              type: 'error'
            })
            this.$router.push({
                path: '/'
            })
          }
        })
      },
      aa() {},
      sortId(a, b) {
        return a.sno * 10000 - b.sno * 10000
      },
      //提交
      fnClickSubmit() {
        this.voteSubmit.conferenceId = this.$route.params.id
        this.votedformData.shuzu.forEach((item, index) => {
          this.voteSubmit.issuesInfo[index] = {
            issuesId: "",
            optionDesc: "",
            comment: ""
          }
          this.voteSubmit.issuesInfo[index].issuesId = item.issues.id
          if (item.issues.optionTypes === 0) {
            this.voteSubmit.issuesInfo[index].optionDesc = item.checkList
          } else {
            var arr = []
            item.checkList.forEach(item => {
              arr.push(item.option)
            })
            this.voteSubmit.issuesInfo[index].optionDesc = arr
          }
          this.voteSubmit.issuesInfo[index].comment = item.issues.comment
        })

        voteIssues(this.voteSubmit).then(res => {
          if (res.code == 0) {
            this.$router.push({
              path: '/index'
            })
            alert("提交成功")
          }
        })
      }
    }
  }

</script>
