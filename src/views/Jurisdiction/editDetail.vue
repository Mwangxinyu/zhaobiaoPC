<template>
  <div style="background:#fff;padding:20px">
    <div v-if="flag">
      <increase-Approvers :callback="closeQrganization" />
    </div>
    <!-- 已拥有权限的弹窗 -->
    <el-dialog :visible.sync="AuthDialog" center title="权限查看" width="60%">
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index" disabled>{{ city }}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="AuthDialog=false">取 消</el-button>
        <el-button type="primary" size="small" @click="AuthDialog=false">确 定</el-button>
      </div>
    </el-dialog>
    <el-form :model="falgManage" label-width="80px">
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="角色名称">
              <el-input v-model="falgManage.name" size="small" />
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="16" />
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="8">
          <div>
            <el-form-item label="角色描述">
              <el-input v-model="falgManage.tips" size="small" type="textarea" />
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="16" />
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="8">
          <div>
            <el-form-item label="角色类型">
              <el-select v-model="falgManage.roleType" clearable placeholder="请选择">
                <el-option v-for="(item,index) in falgManage.roleOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="16" />
      </el-row>
      <div style="padding:0 20px;margin-top:30px;margin-bottom:20px;">
        <span style="color:#666;font-size:16px;font-weight:bold;">已拥有权限</span>
      </div>
      <el-row style="padding:20px">
        <el-col :span="24">
          <el-button size="small" type="primary" @click="fnClickLookAuth">点击查看权限</el-button>
        </el-col>
      </el-row>
      <div style="padding:0 20px;margin-top:20px;margin-bottom:20px;">
        <span style="color:#666;font-size:14px">添加人员</span>
        <el-button size="small" style="margin-left:20px" @click="editor"> {{ flagName?'保存':'点击添加人员' }}</el-button>
      </div>
      <el-row style="padding:20px">
        <el-tag v-for="(tag,index) in falgManage.tagsUser" :closable="flagName" :key="index" :type="tag.type" style="margin-right:5px;"
          @close="handleClose(tag)">
          {{ tag.name }}
        </el-tag>
        <el-button v-if="flagName" size="small" @click="addName">添加</el-button>
      </el-row>
      <div style="padding:20px">
        <el-button size="small" @click="fnClickCancel">取消</el-button>
        <el-button size="small" type="primary" @click="fnClickModifyRelation">完成</el-button>
      </div>

    </el-form>
  </div>
</template>
<script>
  import IncreaseApprovers from '@/components/expert'
  import {
    getUserByRoleId,
    getMenuByRoleId,
    updateRoleByUserId,
    modifyRole
  } from '@/api/Jurisdiction'
  export default {
    components: {
      IncreaseApprovers
    },
    data() {
      return {
        cities: [],
        checkedCities: [{

        }],
        configurationCheckList: [], // 权限配置的复选框
        configurationCheck: [],
        AuthDialog: false, // 权限弹窗
        flag: false, // 判断组织机构弹窗的变量
        editFlag: '编辑',
        flagName: false, // 判断是否添加人员姓名的变量
        falgManage: {
          name: '',
          alias: '',
          tips: '',
          tagsUser: [],
          roleType: '',
          roleOptions: [{
              value: '普通用户',
              roleType: '0'
            },
            {
              value: '超级管理员',
              roleType: '1'
            },
          ]
        },
        //修改接口的入参
        modifyRoleParameter: {
          id: '',
          num: '',
          roleType: ''
        },
        modifyRelationParticipation: {
          userIds: [],
          roleId: ''
        }
      }
    },
    created() {
      // 角色名称赋值
      this.falgManage.name = this.$route.query.name
      // 角色描述赋值
      this.falgManage.tips = this.$route.query.tips
      this.falgManage.roleType = this.$route.query.roleType == '0' ? '普通用户' : '超级管理员'
      this.editDetails()

    },
    methods: {
      // 判断是否编辑人员姓名
      editor() {
        this.flagName = !this.flagName
      },
      handleClose(tag) {
        this.falgManage.tagsUser.splice(this.falgManage.tagsUser.indexOf(tag), 1)
      },
      addName() {
        this.flag = !this.flag
      },
      // 取消跳转到首页
      fnClickCancel() {
        this.$router.push({
          path: '/role'
        })
      },
      // 编辑详情
      editDetails() {
        getUserByRoleId(this.$route.query.roleId).then(res => {
          if (res.code === 0) {
            this.falgManage.tagsUser = res.data
          }
        }).catch(error => {

        })
      },
      // 根据角色id查看所拥有权限
      fnClickLookAuth() {
        getMenuByRoleId(this.$route.query.roleId).then(res => {
          if (res.data !== '') {

            this.cities = []
            res.data.forEach(element => {
              this.cities.push(element.name)
            })
            this.AuthDialog = true
          } else {
            this.AuthDialog = false
            this.$message({
              message: '该角色没有任何权限',
              type: 'error'
            })

          }

        })

      },
      // 关闭组织架构
      closeQrganization(userMessage) {
        // 添加
        this.falgManage.tagsUser.push(...userMessage)
        // this.committeeForm.groupArray[this.groupIndex].people.push(...userMessage)
        // 去重 根据人员编号 TODO 去重字段变了
        this.flag = false
      },
      /*
       * 修改  人员 角色信息 调修改的接口 还有
       */
      fnClickModifyRelation() {
        //先调修改的接口 modifyRoleParameter
        this.modifyRoleParameter.id = this.$route.query.roleId
        this.modifyRoleParameter.num = this.$route.query.num
        this.modifyRoleParameter.roleType = this.$route.query.roleType
        modifyRole(this.modifyRoleParameter).then(res => {
          if (res.code == 0) {
            alert('修改角色成功')
            this.falgManage.tagsUser.forEach(element => {
              this.modifyRelationParticipation.userIds.push(element.id)
            })
            this.modifyRelationParticipation.roleId = this.$route.query.roleId
            updateRoleByUserId(this.modifyRelationParticipation).then(res => {
              if (res.code === 0) {
                this.$router.push({
                  path: '/role'
                })
                alert('提交成功')
              }
            })
          } else {
            alert("修改失败")
          }
        })


      }
    }
  }

</script>
