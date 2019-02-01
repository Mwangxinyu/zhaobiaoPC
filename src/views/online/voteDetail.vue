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
                  {{ votedformData.endTime | formatDate}}
                </span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="14" />
        </el-row>
      </div>
      <div class="dev1_border" />
      <div style="background:#fff;padding:20px" v-for="(item,index) in votedformData.shuzu" :key="index">
        <el-row>
          <el-col :span="12">
            <div>
              <el-form-item :label="'议题:'"><b style="color:#666">[{{item.sno}}]</b>
                <span style="color:#666">{{item.issues.topicName}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style="margin-top:30px;">
          <el-col :span="12">
            <div>
              <el-form-item :label="'议题说明'">
                <span style="color:#666;">{{item.issues.topicDesc}}</span>
              </el-form-item>

            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style="margin-top:30px;">
          <el-col :span="12">
            <div>
              <el-form-item label="附件名称：">
                <el-button>
                  <a href="http://www.w3school.com.cn/" target="_blank"></a>
                  附件
                </el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row style="margin: 10px 0 10px 100px;">
          <!-- 单选 -->
          <div v-if="item.issues.optionTypes=='0'">
            <el-radio-group v-model="item.checkList" style="display:block;" v-for="(itemcheck,index) in item.optionTables"
              :key="index">
              <el-radio :label="itemcheck.option" :disabled="true">
                {{ itemcheck.option+':'+ itemcheck.optionDesc}}
              </el-radio>

            </el-radio-group>
          </div>

          <!-- 多选 -->
          <div v-if="item.issues.optionTypes=='1'">
            <el-checkbox-group v-model="item.checkList" :min="Number(item.issues.optionMin)" :max="Number(item.issues.optionMax)"
              v-for="(itemcheck,index) in item.optionTables" :key="index">
              <el-checkbox v-if="item.issues.optionTypes!==0" disabled :label="itemcheck.option">
                {{ itemcheck.option }}：
                {{ itemcheck.optionDesc}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-row>
        <!-- 评议说明 -->
        <el-row style="margin-top:30px;">
          <el-col :span="12">
            <div>
              <el-form-item label="评议说明：">
                <span style="color:#666">{{item.choose&&item.choose.length?item.choose[0].comment:''}}</span>
              </el-form-item>

            </div>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<style>
  .radio-group:nth-child(1) {
    top: 10px
  }

  .radio-group:nth-child(2) {
    top: 35px
  }

  .radio-group:nth-child(3) {
    top: 55px
  }

  .radio-group:nth-child(3) {
    top: 80px
  }

</style>

<script>
  import {
    getVoteDetailById
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
          comment: '',
          conferenceName: '',
          conferenceDesc: '',
          endTime: '',
          shuzu: [{
            issues: {
              optionTypes: '',
              comment: '',
            },
            choose: [{
              comment: ''
            }]
          }]
        },
      }
    },
    created() {
      this.getVotedDetail()
    },
    methods: {
      sortId(a, b) {
        return a.sno * 10000 - b.sno * 10000
      },
      /*
       *查看已投人员详情
       */
      getVotedDetail() {
        getVoteDetailById(this.$route.query.votedDetailByUser).then(res => {
          if (res.code == 0) {
            this.votedformData.conferenceName = res.data.conference.conferenceName
            this.votedformData.conferenceDesc = res.data.conference.conferenceDesc
            this.votedformData.endTime = res.data.conference.endTime
            res.data.issues.sort(this.sortId)
            res.data.issues.forEach(item => {
              if (item.issues.optionTypes == 0) {
                item.checkList = item.choose && item.choose.length ? item.choose[0].option : ''

              } else {
                item.checkList = []
                // item.checkList = item.choose.map(x =>{
                //     return {
                //        option
                //     }
                // })
                
                item.choose.forEach(ww=>{
                    item.checkList.push(ww.option)
                })
                // this.conference.issuesId = this.conference.issuesId.map(x => {
                //   return {
                //     'issuesId': x.id,
                //     'sno': x.sno.toFixed(1)
                //   }
                // })

              }
            })
            this.votedformData.shuzu = res.data.issues

          }
        })
      }
      //   fnInitDetail() {
      //     getIssuesByid(this.$route.params.id).then(res => {
      //       if (res.code === 0) {
      //         this.votedformData.conferenceName = res.data.conference.conferenceName
      //         this.votedformData.conferenceDesc = res.data.conference.conferenceDesc
      //         this.votedformData.endTime = res.data.conference.endTime
      //         res.data.issuesandoption.forEach(item => {
      //           if (item.issues.optionTypes == 0) {
      //             item.checkList = ''
      //           } else {
      //             item.checkList = []
      //           }
      //         })
      //         this.votedformData.shuzu = res.data.issuesandoption
      //       }
      //     })
      //   },
      //   aa() {
      //   },
      //提交
      //   fnClickSubmit() {
      //     this.voteSubmit.conferenceId = this.$route.params.id
      //     this.votedformData.shuzu.forEach((item, index) => {
      //       this.voteSubmit.issuesInfo[index] = {
      //         issuesId: "",
      //         optionDesc: "",
      //         comment: ""
      //       }
      //       this.voteSubmit.issuesInfo[index].issuesId = item.issues.id
      //       if (item.issues.optionTypes === 0) {
      //         this.voteSubmit.issuesInfo[index].optionDesc = item.checkList
      //       } else {
      //         var arr = []
      //         item.checkList.forEach(item => {
      //           arr.push(item.option)
      //         })
      //         this.voteSubmit.issuesInfo[index].optionDesc = arr
      //       }
      //       this.voteSubmit.issuesInfo[index].comment = item.issues.topicDesc
      //     })

      //     voteIssues(this.voteSubmit).then(res => {

      //     })
      //   }
    }
  }

</script>
