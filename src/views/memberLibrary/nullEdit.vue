<template>
  <div style="background:#fff;padding:20px">
    <!-- 弹窗 -->
    <div v-if="flag">
      <increase-Approvers :callback="closeQrganization" />
    </div>
    <el-form ref="committeeForm" :model="committeeForm" :rules="rules">
      <!-- 发文 -->
      <el-row :gutter="20" style="margin-bottom:30px">
        <el-col :span="6">
          <div>
            <el-form-item label="发文编号：" prop="releaseId">
              <el-input v-model="committeeForm.releaseId" style="width:50%"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="发文日期：" prop="releaseTime">
              <el-input v-model="committeeForm.releaseTime" style="width:50%"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div/>
        </el-col>
        <el-col :span="6">
          <div/>
        </el-col>
      </el-row>
      <!-- 分组 -->

      <el-row v-model="committeeForm.groupArray">
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <div>
                <div>
                  <el-row style="margin-bottom:30px">
                    <el-col :span="6">
                      <div>
                        <el-form-item label="分组名称：" prop="groupName">
                          <el-input :disabled="true" v-model="committeeForm.groupArray[0].groupName" style="width:60%" size="small"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="18"/>

                  </el-row>
                </div>

                <el-tag
                  v-for="(tag,index) in committeeForm.groupArray[0].dynamicTags"
                  :key="index"
                  :disable-transitions="false"
                  closable
                  @close="handleCloseZhuren(tag)">
                  {{ tag.name }}
                </el-tag>
                <el-button class="button-new-tag" size="small" @click="showZhuren()">添加人员</el-button>
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
                        <el-form-item label="分组名称：" prop="groupName">
                          <el-input :disabled="true" v-model="committeeForm.groupArray[1].groupName" style="width:60%" size="small"/>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="18"/>
                  </el-row>
                </div>

                <el-tag
                  v-for="(tag,index) in committeeForm.groupArray[1].dynamicTags"
                  :key="index"
                  :disable-transitions="false"
                  closable
                  @close="handleCloseWeiyuan(tag)">
                  {{ tag.name }}
                </el-tag>
                <el-button class="button-new-tag" size="small" @click="showWeiyuan()">添加人员</el-button>

              </div>
            </el-col>
          </el-row>

        </el-col>

      </el-row>
      <el-row style="margin-top:30px;text-align:center;">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" type="primary" @click="submitmember">保存</el-button>
        <el-button size="mini" type="success" @click="submitEdit('committeeForm')">发布</el-button>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import IncreaseApprovers from '@/components/expert'
import {
  submitmemberform
} from '@/api/public'
export default {
  components: {
    IncreaseApprovers
  },
  data() {
    return {
      flag: false,
      groupType: '',
      weiyuan: [],
      zhuren: [],
      chooseUser: [],
      //保存入参
      saveForm: {
        isSave:1,
        releaseId: '',
        releaseTime: '',
        addAccount: '',
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
      //发布入参
      committeeForm: {
        isSave:0,
        releaseId: '',
        releaseTime: '',
        addAccount: '',
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
      }
    }
  },
  created() {

  },
  methods: {
    cancel(){
      /*
       *取消发布
      */  





    },
    /*
     *保存
    */
   submitmember(){
       this.saveForm.releaseId = this.committeeForm.releaseId
       this.saveForm.releaseTime = this.committeeForm.releaseTime
       this.saveForm.addAccount = this.committeeForm.addAccount
       this.saveForm.groupArray = this.committeeForm.groupArray
       debugger
       submitmemberform(this.saveForm).then(res=>{
           debugger
            if (res.code == 0) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$router.push({
                  name: '委员库预览页面'
              })
            }
          })
   },
    // 关闭组织机构
    closeQrganization(userMessage) {
      // 添加
      if (this.groupType === 'zhuren') {
        this.zhuren.push(...userMessage)
        // 去重 根据人员编号
        this.zhuren = this.fnArrayUnique(this.zhuren,'personnel_num')
        this.committeeForm.groupArray[0].dynamicTags = this.zhuren
      } else {
        this.weiyuan.push(...userMessage)
        // 去重 根据人员编号
        this.weiyuan = this.fnArrayUnique(this.weiyuan,'personnel_num')
        this.committeeForm.groupArray[1].dynamicTags = this.weiyuan
      }
      this.flag = false
    },
    // 点击发布
    submitEdit(formName) {
      this.$refs[formName].validate((valid)=>{
        if (valid) {
          const loadingInstance = this.getLoadingInstance()
          submitmemberform(this.committeeForm).then(res=>{
            loadingInstance.close()
            this.$router.push({
              path: '/committeeRecord'
            })

            if (res.code === 0) {
              this.$message({
                message: '发布成功',
                type: 'success'
              })
            }
          }).catch(res=>{
            this.$message({
              message: '发布失败',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '请检查表单是否填写完整',
            type: 'error'
          })
        }
      })
    },
    // 委员
    showWeiyuan() {
      this.groupType = 'weiyuan'
      this.flag = !this.flag
    },
    // 主任
    showZhuren() {
      this.groupType = 'zhuren'
      this.flag = !this.flag
    },
    handleCloseZhuren(tag) {
      this.committeeForm.groupArray[0].dynamicTags.splice(this.committeeForm.groupArray[0].dynamicTags.indexOf(tag),1)
    },
    handleCloseWeiyuan(tag) {
      this.committeeForm.groupArray[1].dynamicTags.splice(this.committeeForm.groupArray[1].dynamicTags.indexOf(tag),1)
    },
    getLoadingInstance() {
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
    fnArrayUnique(arr,name) {
      const hash = {}
      return arr.reduce(function(item,next) {
        hash[next[name]] ? '' : hash[next[name]] = item.push(next)
        return item
      },[])
    }
  }
}

</script>
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
