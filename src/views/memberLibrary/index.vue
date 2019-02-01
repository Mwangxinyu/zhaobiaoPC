<template>
  <div style="background:#fff;">
    <!-- 确定是否创建委员库弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
      <span>您还没有创建过委员库 确认创建吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fnClickCloseDialog">确 定</el-button>
      </span>
    </el-dialog>
    <div class="dashboard-container">
      <div class="contract-caption-bgc">
        <div class="contract-caption-basic contract-w100">
          <el-row>
            <el-col :span="12" class="contract-ml10">
              <span class="dev1-line" />
              <span class="dev1_font">委员库列表</span>
            </el-col>
            <el-col :span="12" class="contract-caption-icon">
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="dev1_border" />
      <el-form :model="committeeForm">
        <div style="padding:20px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="发文编号">
                  <span style="color:#666;">{{committeeForm.releaseId}}</span>
                <!-- <el-input :disabled="true" v-model="committeeForm.releaseId" style="width:50%" /> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发文日期">
                <span style="color:#666;">{{committeeForm.releaseTime}}</span>
                <!-- <el-input :disabled="true" v-model="committeeForm.releaseTime" style="width:50%" /> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div v-show="roleType === '1'">
                <el-button size="small" @click="fnClickJuryEdit()">编辑</el-button>
                <el-button size="small" @click="fnClickJuryHistory()" type="primary">查看历史版本</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row v-model="committeeForm.groupArray" style="padding:20px;">
          <el-col :span="24">
            <el-row>
              <el-col :span="24">
                <div>
                  <div>
                    <el-row style="margin-bottom:30px">
                      <el-col :span="6">
                        <div>
                          <el-form-item prop="groupName">
                            <span style="width:60%"
                              size="small">
                              {{committeeForm.groupArray[0].groupName}}：
                            </span>
                              
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="18" />

                    </el-row>
                  </div>

                  <el-tag v-for="(tag,index) in committeeForm.groupArray[0].dynamicTags" :key="index"
                    :disable-transitions="false">
                    {{ tag.name }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:30px">
              <el-col :span="24">
                <div>
                  <div>
                    <el-row style="margin-bottom:30px">
                      <el-col :span="6">
                        <div>
                          <el-form-item prop="groupName">
                            <span style="width:60%"
                              size="small">
                               {{committeeForm.groupArray[1].groupName}}：
                            </span>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="18" />

                    </el-row>
                  </div>
                  <el-tag v-for="(tag,index) in committeeForm.groupArray[1].dynamicTags" :key="index"
                    :disable-transitions="false">
                    {{ tag.name }}
                  </el-tag>
                </div>
              </el-col>
            </el-row>

          </el-col>

        </el-row>
        <el-row style="margin-top:30px;text-align:center;">
          <!-- <el-button size="mini" @click="saveEdit()">保存</el-button> -->
          <!-- <el-button size="mini" type="primary" @click="submitEdit('committeeForm')">发布</el-button> -->
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    showRecord,
    getjurybyversion
  } from '@/api/public'
  export default {
    name: '',
    data() {
      return {
        roleType:'',   //普通用户 还是超级管理员
        dialogVisible: false,
        input: '',
        totalPerson: '55',
        contractPlan: true,
        committeeForm: {
          releaseId: '',
          releaseTime: '',
          groupArray: [{
              groupName: '主任',
              dynamicTags: []
            },
            {
              groupName: '委员',
              dynamicTags: []
            }
          ]

        },
         
      }
    },
    created() {
      this.fnInitPageData()
    },
    mounted() {},
    methods: {
      /**
       * 页面初始化
       */
      fnInitPageData() {
        // 判断有没有创建过委员库 如果data.length = 0 弹出弹框 跳转到新建编辑页面 ！= 0 历史记录页面
        if (this.$route.params.version === '' || this.$route.params.version === undefined || this.$route.params.version ==
          null) {
          this.fnNetGetNewJury()
        } else {
          this.fnNetGetJuryByVersion(this.$route.params.version)
        }
      },
      /**
       * 查询委员库最新记录
       */
      fnNetGetNewJury() {
        showRecord().then(res => {
          // 判断 是否有委员库信息 没有就弹出引导框
          if (res.data.length === 0 && res.roleType ==1) {
            this.dialogVisible = true
            return false
            
          }
          this.committeeForm.releaseId = res.data[0].releaseId
          this.committeeForm.releaseTime = res.data[0].releaseTime
          this.committeeForm.version = res.data[0].version
          this.roleType = String(res.roleType)
          res.data.forEach((item1, index1, arr1) => {
            if (item1.groupName === '主任') {
              this.committeeForm.groupArray[0].dynamicTags.push(item1)
            } else {
              this.committeeForm.groupArray[1].dynamicTags.push(item1)
            }
          })
        }).catch(error => {

        })
      },
      /**
       * 根据版本号查询委员库信息
       * @param version
       */
      fnNetGetJuryByVersion(version) {
        getjurybyversion(version).then(res => {
          this.committeeForm.releaseId = res.data[0].releaseId
          this.committeeForm.releaseTime = res.data[0].releaseTime
          this.committeeForm.version = res.data[0].version
          
          res.data.forEach((item1, index1, arr1) => {
            if (item1.groupName === '主任') {
              this.committeeForm.groupArray[0].dynamicTags.push(item1)
            } else {
              this.committeeForm.groupArray[1].dynamicTags.push(item1)
            }
          })
        }).catch(error => {

        })
      },
      /**
       * 点击关闭引导弹框
       * 跳转 新建页面
       */
      fnClickCloseDialog() {
        this.dialogVisible = false
        this.$router.push({
          path: '/nullEdit'
        })
      },
      /**
       * 查看历史版本
       */
      fnClickJuryHistory() {
        this.$router.push({
          path: '/committeeRecord'
        })
      },
      /**
       * 点击编辑 跳转编辑页面 传值 version
       */
      fnClickJuryEdit() {
        this.$router.push({
          name: '委员库编辑页',
          params: {
            version: this.committeeForm.version
          }
        })
      }
    }

  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
