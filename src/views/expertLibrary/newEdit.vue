<template>
  <div style="background:#fff;padding:20px;">
    <div v-if="flag">
      <increase-Approvers :callback="fnOnCloseDeptDialog" />
    </div>
    <el-form ref="committeeForm" :model="committeeForm" :rules="rules" label-width="100px" class="demo-dynamic">
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item prop="releaseId" label="发文编号">
              <el-input v-model="committeeForm.releaseId" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item prop="releaseTime" label="发文日期">
              <el-input v-model="committeeForm.releaseTime" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6" />
        <el-col :span="6" />
      </el-row>
      <div style="height:30px;" />
      <el-row>
        <el-col :span="24">
          <div>
            <el-form-item v-for="(domain, index) in committeeForm.groupArray" :label="'分组' +(index+1)" :prop="'groupArray.' + index+1"
              :key="index">
              <el-input v-model="domain.groupName" style="width:20%;" />
              <el-button @click="deleteGroup(index)">删除</el-button>
              <div>
                <el-tag v-for="(tag,key) in domain.people" :disable-transitions="false" :key="key" closable @close="fnClosePeopleTag(tag,index,key)">
                  {{ tag.name }}
                </el-tag>
              </div>
              <el-button class="button-new-tag" size="small" @click="fnClickShowDeptDialog(index)">添加人员</el-button>

            </el-form-item>

          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button size="small" style="margin-left:40px" @click="fnClickAddGroup">新增分组</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px">

        <el-col :span="24">
          <div style="text-align:center">
            <el-button size="small" @click="cancel">取消</el-button>
             <el-button size="small" type="success" @click="saveExpert">保存</el-button>
            <el-button type="primary" size="small" @click="fnClickRelease('committeeForm')">发布</el-button>
          </div>

        </el-col>

      </el-row>

    </el-form>
  </div>
</template>
<script>
  import IncreaseApprovers from '@/components/expert'
  import {
    submitform,
    recordversion
  } from '@/api/public'
  export default {
    components: {
      IncreaseApprovers
    },
    data() {
      return {
        rules: {
          releaseId: [{
            required: true,
            message: '请输入发文编号',
            trigger: 'blur'
          }],
          releaseTime: [{
            required: true,
            message: '请输入发文日期',
            trigger: 'blur'
          }]
        },
        centerDialogVisible: true,
        flag: false,
        groupIndex: '',
        tagIndex: '',
        chooseUser: [],
        //发布入参
        committeeForm: {
          groupArray: [{
            groupName: '',
            people: [],
            inputVisible: false
          }],
          releaseId: '', // 发文编号
          addAccount: '',
          releaseTime: '', // 发文日期
          account: '',
          isSave:0
        },
        //保存入参
        saveexpert: {
          groupArray: [{
            groupName: '',
            people: [],
            inputVisible: false
          }],
          releaseId: '', // 发文编号
          addAccount: '',
          releaseTime: '', // 发文日期
          account: '',
          isSave:1
        }
      }
    },
    created() {
      this.fnInitPageData()
    },
    mounted() {},
    methods: {
      /*
       *保存编辑专家库 入参 this.save
       */
      saveExpert() {
        this.saveexpert.releaseId = this.committeeForm.releaseId
        this.saveexpert.addAccount = this.committeeForm.addAccount
        this.saveexpert.releaseTime = this.committeeForm.releaseTime
        this.saveexpert.account = this.committeeForm.account
        this.saveexpert.groupArray = this.committeeForm.groupArray
        submitform(this.saveexpert).then(res=>{
            if(res.code == 0){
                this.$message.success('保存成功')
                this.$router.push({
                    path: '/expertDetail/'
                })
            }
        })
      },
      /*
       *取消编辑专家库
       */
      cancel() {
        this.$router.push({
          path: '/expertDetail/'
        })
      },
      /**
       * 页面数据初始化
       */
      fnInitPageData() {
        // version 不存在 首次不用数据回显
        if (this.$route.params.version === '' || this.$route.params.version === undefined || this.$route.params.version ==
          null) {} else {
          // version 存在 要查询version对应的数据 回显到页面
          this.fnNetGetExpertByVersion(this.$route.params.version)
        }
      },
      /**
       *  通过version 获取 对应专家库数据
       */
      fnNetGetExpertByVersion(version) {
        recordversion(version).then(res => {
          if (res.code === 0) {
            this.committeeForm.releaseId = res.data[0].releaseId
            this.committeeForm.releaseTime = res.data[0].releaseTime
            this.committeeForm.account = res.data[0].account
            this.committeeForm.addAccount = res.data[0].addAccount
            if (res.data && res.data.length > 0) {
              const map = {}
              const newdata = []
              for (var i = 0; i < res.data.length; i++) {
                var ai = res.data[i]
                if (!map[ai.groupName]) {
                  newdata.push({
                    groupName: ai.groupName,
                    people: [ai]
                  })
                  map[ai.groupName] = ai
                } else {
                  for (var j = 0; j < res.data.length; j++) {
                    var dj = newdata[j]
                    if (dj.groupName === ai.groupName) {
                      dj.people.push(ai)
                      break
                    }
                  }
                }
              }
              this.committeeForm.groupArray = newdata
            }
          } else {

          }
        }).catch(error => {})
      },
      /**
       *  点击发布 添加到专家库
       */
      fnClickRelease(formName) {
        this.$refs[formName].validate((valid) => {
          const loadingInstance = this.fnGetLoadingInstance()
          if (valid) {
            submitform(this.committeeForm).then(res => {
              loadingInstance.close()
              if (res.code === 0) {
                this.$message({
                  message: '发布成功',
                  type: 'success'
                })
                this.$router.push({
                  path: '/record'
                })
              }
            }).catch(error => {
              this.$message({
                message: '发布失败',
                type: 'error'
              })
            })
          } else {
            loadingInstance.close()
            this.$message({
              message: '请检查表单是否填写完整',
              type: 'error'
            })
            return false
          }
        })
      },

      // TODO 这里还需要写一个移除整个分组的方法 XieDong 2018年12月18日
      deleteGroup(index) {
        this.committeeForm.groupArray.splice(index, 1)
      },
      /**
       * 移除一个动态人员tag
       */
      fnClosePeopleTag(tag, index, key) {
        // 移除点击的tag
        this.committeeForm.groupArray[index].people.splice(key, 1)
        // 强制渲染
        this.$forceUpdate()
      },
      /**
       * 点击显示组织机构弹窗
       */
      fnClickShowDeptDialog(index) {
        // 设置当前被点击分组 用于后续将选择的用户加入对应分组
        this.groupIndex = index
        this.flag = !this.flag
      },
      /**
       * 关闭组织机构 触发
       */
      fnOnCloseDeptDialog(userMessage) {
        // 添加 选择人员
        this.committeeForm.groupArray[this.groupIndex].people.push(...userMessage)
        // 去重 根据人员编号
        this.committeeForm.groupArray[this.groupIndex].people = this.fnArrayUnique(this.committeeForm.groupArray[this.groupIndex]
          .people, 'account')
        this.flag = false
      },
      /**
       * 点击 添加一个空白分组
       */
      fnClickAddGroup() {
        this.committeeForm.groupArray.push({
          groupName: '',
          people: [],
          inputVisible: false,
          inputValue: '',
          key: Date.now()
        })
      },
      /**
       * 加载loading动画
       */
      fnGetLoadingInstance() {
        const loadingInstance = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.6)'
        })
        return loadingInstance
      },
      /**
       * TODO 需要抽出一个公共方法
       * 数组对象根据某一个属性去重
       * @param arr
       * @param name
       * @returns {*}
       */
      fnArrayUnique(arr, name) {
        const hash = {}
        return arr.reduce(function (item, next) {
          hash[next[name]] ? '' : hash[next[name]] = item.push(next)
          return item
        }, [])
      }
    }
  }

</script>
<style scoped>
  .el-form-item {
    margin-bottom: 40px;
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
