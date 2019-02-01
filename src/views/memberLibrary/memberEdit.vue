<template>
  <div style="background:#fff;padding:20px">
    <!-- 弹窗 -->
    <div v-if="flag">
      <increase-Approvers :callback="fnOnCloseDeptDialog" />
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
              <div v-for="(item,index) in committeeForm.groupArray" :key="index">
                <div>
                  <el-row style="margin-bottom:30px">
                    <el-col :span="10">
                      <div>
                        <el-form-item prop="groupName">
                          <span style="color:#666">{{item.groupName}}：</span>
                          <!-- <el-input :disabled="true" v-model="item.groupName" style="width:60%" size="small"/> -->
                          <!-- <el-button size="small" @click="deleteGroup(index)">删除</el-button> -->
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="14"/>

                  </el-row>
                </div>
                <!-- 分组下边的每个人 -->
                <el-tag
                  v-for="(tag,indexTag) in committeeForm.groupArray[index].dynamicTags"
                  :key="indexTag"
                  :disable-transitions="false"
                  closable
                  @close="fnClosePeopleTag(indexTag,tag,index)">
                  {{ tag.name }}
                </el-tag>
                <el-button class="button-new-tag" size="small" @click="fnClickAddPerson(item,index)">添加人员</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
      <el-row style="margin-top:30px;text-align:center;">
        <el-button size="mini" @click="cancel">取消</el-button>
        <el-button size="mini" type="success" @click="savemember">保存</el-button>
        <el-button size="mini" type="primary" @click="fnClickRelease('committeeForm')">发布</el-button>
        
      </el-row>

    </el-form>

  </div>
</template>

<script>
import IncreaseApprovers from '@/components/expert'
import {
  submitmemberform,
  getjurybyversion
} from '@/api/public'

export default {
  components: {
    IncreaseApprovers
  },
  data() {
    return {
      groupindex:'',
      flag: false,
      chooseUser: [],
      //发布入参
      committeeForm: {
        releaseId: '',
        releaseTime: '',
        account: '',
        groupArray: [{
          groupName: '主任',
          dynamicTags: []
        },
        {
          groupName: '委员',
          dynamicTags: []
        }
        ],
        isSave:0,

      },
      //保存入参
       saveMember: {
        releaseId: '',
        releaseTime: '',
        account: '',
        groupArray: [{
          groupName: '主任',
          dynamicTags: []
        },
        {
          groupName: '委员',
          dynamicTags: []
        }
        ],
        isSave:1,
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
    this.fnInitPageData()
  },
  methods: {
    /*
     *保存委员库
    */
    savemember(){
        this.saveMember.releaseId = this.committeeForm.releaseId
        this.saveMember.releaseTime = this.committeeForm.releaseTime
        this.saveMember.account = this.committeeForm.account
        this.saveMember.groupArray = this.committeeForm.groupArray
        submitmemberform(this.saveMember).then(res=>{
           if(res.code == 0){
               this.$message.success("保存成功")
               this.$router.push({
                    path: '/memberDetail'
               })
           }
        })
    },
    /*
     *取消编辑委员库
    */
   cancel(){
       this.$router.push({
           path: '/memberDetail'
       })
   },
    /**
     * 页面初始话
     */
    fnInitPageData() {
      // 查询版本号对应数据渲染页面
      this.fnNetGetJuryByVersion(this.$route.params.version)
    },
    /**
     * 根据版本号查询委员库数据
     * @param version
     */
    fnNetGetJuryByVersion(version) {
      getjurybyversion(version).then(res=>{
        this.committeeForm.releaseId = res.data[0].releaseId
        this.committeeForm.releaseTime = res.data[0].releaseTime
        this.committeeForm.version = res.data[0].version
        res.data.forEach((item1,index1,arr1)=>{
          if (item1.groupName === '主任') {
            this.committeeForm.groupArray[0].dynamicTags.push(item1)
          } else {
            this.committeeForm.groupArray[1].dynamicTags.push(item1)
          }
        })
      }).catch(error=>{

      })
    },
    /**
     * 添加人员 到不同的分组
     * @param groupType 分组名称
     */
    fnClickAddPerson(item,index) {
        this.groupindex = index
    //   this.groupType = groupType
      this.flag = !this.flag
    },
    /**
     * 关闭组织机构 触发
     */
    fnOnCloseDeptDialog(userMessage) {
        for (var k = 0; k < userMessage.length; k++) {
          var flag = true;
          for (var i = 0; i < this.committeeForm.groupArray[this.groupindex].dynamicTags.length; i++) {
            if (JSON.parse(JSON.stringify(userMessage[k])).account == JSON.parse(JSON.stringify(this.committeeForm.groupArray[this.groupindex].dynamicTags[i])).account) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.committeeForm.groupArray[this.groupindex].dynamicTags.push(userMessage[k]);
            flag = true;
          }
        }
      this.flag = false
    },
    /**
     *  点击发布 添加到委员库
     */
    fnClickRelease(formName) {
      this.$refs[formName].validate((valid)=>{
        if (valid) {
          const loadingInstance = this.fnGetLoadingInstance()
          submitmemberform(this.committeeForm).then(res=>{
            loadingInstance.close()
            this.$router.push({
              path: '/committeeRecord'
            })

            if (res.code === '0') {
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
    /**
     * 移除一个动态人员tag
     */
    fnClosePeopleTag(indexTag,tag,index) {
      // 移除点击的tag
      this.committeeForm.groupArray[index].dynamicTags.splice(indexTag,1)
      // 强制渲染
      this.$forceUpdate()
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
    /*
     *删除分组
    */
    deleteGroup(val){
       this.committeeForm.groupArray.splice(val,1)
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
