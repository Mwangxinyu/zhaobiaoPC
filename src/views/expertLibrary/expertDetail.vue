<template>
  <div class="contract-caption-bgc">
    <div class="contract-caption-basic contract-w100">
      <el-dialog :visible.sync="centerDialogVisible" title="提示" width="30%" center>
        <span>您还没有创建过专家库，确认创建吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="fnClickCloseDialog()">确定</el-button>
        </span>
      </el-dialog>
      <div class="contract-caption-bgc">
        <div class="contract-caption-basic contract-w100">
          <el-row>
            <el-col :span="12" class="contract-ml10">
              <span class="dev1-line" />
              <span class="dev1_font">专家库列表</span>
            </el-col>
            <el-col :span="12" class="contract-caption-icon">
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="dev1_border" />
      <el-form ref="expertDetailData" :model="expertFormData" style="padding: 20px;" label-width="100px">
        <el-row :gutter="20" style="margin-bottom: 20px;">
          <el-col :span="8">
            <div>
              <el-form-item prop="releaseId" label="发文编号：">
                <!-- <el-input :disabled="true" v-model="expertFormData.releaseId" /> -->
                <span style="color:#666;">{{expertFormData.releaseId}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-form-item prop="releaseTime" label="发文日期：">
                <!-- <el-input :disabled="true" v-model="expertFormData.releaseTime" /> -->
                <span style="color:#666;">
                  {{expertFormData.releaseTime}}
                </span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div v-if="roleType === '1'">
              <el-form-item prop="" label="">
                <el-button size="small" @click="fnClickExpertEdit">编辑</el-button>
                <el-button size="small" @click="fnClickExpertHistory" type="primary">查看历史版本</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div v-for="(item,index) in expertDetailData" :key="index" style="padding:20px;">
          <span style="color:#666;">
            {{ item.groupName }} &nbsp;&nbsp;共 {{ item.people.length }}&nbsp;&nbsp;人
          </span>
          <!-- <el-row>
            <el-col style="color:#666;" v-for="(item,index) in item.people" :key="index" :span="4">
              {{ item }}
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="24">
              <el-tag :key="index" v-for="(item,index) in item.people" :disable-transitions="false">
                {{item}}
              </el-tag>
            </el-col>
          </el-row>
        </div>


      </el-form>

    </div>

  </div>

</template>
<style>
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
  import IncreaseApprovers from '@/components/expert'
  import {
    fnNetGetNewExpert,
    recordversion
  } from '@/api/public'
  export default {
    components: {
      IncreaseApprovers
    },
    data() {
      return {
        recordTag: ['标签一', '标签二', '标签三'],
        roleType: '',
        centerDialogVisible: false,
        expertFormData: {
          releaseId: '',
          releaseTime: '',
          version: '',
          account: '',
          addAccount: ''
        },
        expertDetailData: [{
          groupName: '',
          people: []
        }]
      }
    },
    created() {
      this.fnInitPageData()
    },
    mounted() {

    },
    methods: {
      /**
       * 页面数据初始化
       */
      fnInitPageData() {

        // 没有version 就查询最新的一条 查不到就显示引导弹窗
        if (this.$route.params.version === '' || this.$route.params.version === undefined || this.$route.params.version ==
          null) {
          this.fnNetGetNewExpert()
        } else {
          // 有version 查询对应数据
          this.fnNetGetExpertByVersion(this.$route.params.version)
        }
      },
      /**
       * 点击关闭引导弹框
       * 跳转 新建页面
       */
      fnClickCloseDialog() {
        this.centerDialogVisible = false
        this.$router.push({
          name: '专家库新增页面'
        })
      },
      /**
       * 根据version查询 专家库
       * @param version 版本
       */
      fnNetGetExpertByVersion(version) {
        recordversion(version).then(res => {
          this.expertFormData.releaseId = res.data[0].releaseId
          this.expertFormData.releaseTime = res.data[0].releaseTime
          this.expertFormData.version = res.data[0].version
          if (res.data && res.data.length > 0) {
            const map = {}
            const newdata = []
            for (var i = 0; i < res.data.length; i++) {
              var ai = res.data[i]
              if (!map[ai.groupName]) {
                newdata.push({
                  groupName: ai.groupName,
                  people: [ai.name]
                })
                map[ai.groupName] = ai
              } else {
                for (var j = 0; j < res.data.length; j++) {
                  var dj = newdata[j]
                  if (dj.groupName === ai.groupName) {
                    dj.people.push(ai.name)
                    break
                  }
                }
              }
            }
            this.expertDetailData = newdata
          }
        })
      },
      /**
       * 查询最新专家库数据
       */
      fnNetGetNewExpert() {
        fnNetGetNewExpert().then(res => {
          if (res.data.length === 0 && res.roleType == 1) {
            // 显示引导弹窗
            this.centerDialogVisible = true
            return false
          } else {
            this.expertFormData.releaseId = res.data[0].releaseId
            this.expertFormData.releaseTime = res.data[0].releaseTime
            this.expertFormData.version = res.data[0].version
            this.roleType = String(res.roleType)
            if (res.data && res.data.length > 0) {
              const map = {}
              const newdata = []
              for (var i = 0; i < res.data.length; i++) {
                var ai = res.data[i]
                if (!map[ai.groupName]) {
                  newdata.push({
                    groupName: ai.groupName,
                    people: [ai.name]
                  })
                  map[ai.groupName] = ai
                } else {
                  for (var j = 0; j < res.data.length; j++) {
                    var dj = newdata[j]
                    if (dj.groupName === ai.groupName) {
                      dj.people.push(ai.name)
                      break
                    }
                  }
                }
              }
              this.expertDetailData = newdata
              this.centerDialogVisible = false
              return false
            }
          }
        })
      },
      /**
       * 点击查看历史记录
       */
      fnClickExpertHistory() {
        // 直接页面跳转 在列表created查询数据
        this.$router.push({
          path: '/record'
        })
      },
      /**
       * 点击编辑 跳转编辑页面 传值 version
       */
      fnClickExpertEdit() {
        this.$router.push({
          name: '专家库新增页面',
          params: {
            version: this.expertFormData.version
          }
        })
      }
    }
  }

</script>
<style>
  .el-table__body {
    table-layout: auto !important;
  }

</style>
<style scoped>
  .el-input {
    width: 64%;
  }

  /* .el-input__inner{
      width:62%;
  } */
  ul {
    list-style: none;
  }

  .personStyle {
    float: left;
  }

</style>
