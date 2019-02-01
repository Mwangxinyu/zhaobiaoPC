<template>
  <div style="background:#fff;padding:20px">
    <div v-if="flag">
      <increase-Approvers :callback="closeQrganization" />
    </div>
    <!-- 已拥有权限的弹窗 -->
    <el-dialog :visible.sync="AuthDialog" center title="权限查看" width="60%">
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox v-for="city in cities" :label="city" :key="city.name" disabled>{{ city }}</el-checkbox>
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
              <el-input :disabled="true" v-model="falgManage.name" size="small" />
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="16"/>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="8">
          <div>
            <el-form-item label="角色描述">
              <el-input :disabled="true" v-model="falgManage.tips" size="small" type="textarea" />
            </el-form-item>
          </div>

        </el-col>
        <el-col :span="16"/>
      </el-row>
      <div style="padding:0 20px;margin-top:20px;margin-bottom:20px;">
        <span style="color:#666;font-size:14px">已拥有权限</span>
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
        <el-tag
          v-for="tag in falgManage.tagsUser"
          :closable="flagName"
          :key="tag.name"
          :type="tag.type"
          style="margin-right:5px;"
          @close="handleClose(tag)">
          {{ tag.name }}
        </el-tag>
        <el-button v-if="flagName" size="small" @click="addName">添加</el-button>
      </el-row>
      <div style="padding:20px">
        <el-button size="small" @click="fnClickCancel">取消</el-button>
        <el-button size="small" @click="fnClickModifyRelation">完成</el-button>
      </div>

    </el-form>
  </div>
</template>
<script>
import IncreaseApprovers from '@/components/expert'
import {
  getUserByRoleId,
  getMenuByRoleId,
  updateRoleByUserId
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
        tagsUser: []
      },
      modifyRelationParticipation: {
        userIds: [],
        roleId: ''
      }
    }
  },
  created() {
    // 角色名称赋值
    this.falgManage.name = this.$route.params.name
    // 角色描述赋值
    this.falgManage.tips = this.$route.params.tips
    this.FnAccordingToIdCheckStaff()
  },
  methods: {
    // 判断是否编辑人员姓名
    editor() {
      this.flagName = !this.flagName
    },
    handleClose(tag) {
      this.falgManage.tagsUser.splice(this.falgManage.tagsUser.indexOf(tag),1)
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
    // 根据角色id查员工
    FnAccordingToIdCheckStaff() {
      getUserByRoleId(this.$route.params.id).then(res=>{
        if (res.code === 0) {
          this.falgManage.tagsUser = res.data
        }
      }).catch(error=>{

      })
    },
    // 根据角色id查看所拥有权限
    fnClickLookAuth() {
      getMenuByRoleId(this.$route.params.id).then(res=>{
        this.cities = []
        res.data.forEach(element=>{
          this.cities.push(element.name)
        })
      })
      this.AuthDialog = true
    },
    // 关闭组织架构
    closeQrganization(userMessage) {
      // 添加
      this.falgManage.tagsUser.push(...userMessage)
      // this.committeeForm.groupArray[this.groupIndex].people.push(...userMessage)
      // 去重 根据人员编号 TODO 去重字段变了
      this.flag = false
    },
    // 修改员工角色关联
    fnClickModifyRelation() {
      this.falgManage.tagsUser.forEach(element=>{
        this.modifyRelationParticipation.userIds.push(element.id)
      })

      // this.modifyRelationParticipation.userIds =
      this.modifyRelationParticipation.roleId = this.$route.params.id

      updateRoleByUserId(this.modifyRelationParticipation).then(res=>{
        if (res.code === 0) {
          this.$router.push({
            path: '/role'
          })
          alert('提交成功')
        }
      })
    }
  }
}

</script>
