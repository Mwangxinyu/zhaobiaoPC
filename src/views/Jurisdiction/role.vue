<template>
  <div>
    <div style="background:#fff;padding:20px">
      <!-- 添加
      角色的弹窗 -->
      <el-dialog :visible.sync="addFlagDialog" center title="添加角色" width="40%">
        <el-form :model="Addform" :rules="addRules" ref="Addform" label-width="100px">
          <el-row>
            <el-col :span="20">
              <div>
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="Addform.name" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4" />
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="20">
              <div>
                <el-form-item label="角色描述" prop="tips">
                  <el-input v-model="Addform.tips" type="textarea" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4" />
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="20">
              <div>
                <el-form-item label="角色类型" prop="roleType">
                  <el-select v-model="Addform.roleType" clearable placeholder="请选择">
                    <el-option v-for="item in Addform.roleOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="Addform.roleType" /> -->
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4" />
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="fnClickCancelAdd">取 消</el-button>
          <el-button type="primary" size="small" @click="fnClickAddRole('Addform')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改角色的弹窗 -->
      <!-- <el-dialog :visible.sync="modifyFlagDialog" center title="修改角色" width="40%">
        <el-form :model="modifyRoleForm" label-width="100px">
          <el-row>
            <el-col :span="20">
              <div>
                <el-form-item label="角色名称">
                  <el-input v-model="modifyRoleForm.name" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4" />
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :span="20">
              <div>
                <el-form-item label="   ">
                  <el-input v-model="modifyRoleForm.tips" type="textarea" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4" />
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="modifyFlagDialog = false">取 消</el-button>
          <el-button type="primary" size="small" @click="fnClickmodifyRole()">确 定</el-button>
        </div>
      </el-dialog> -->
      <!-- 权限配置的弹窗 -->
      <el-dialog :visible.sync="configurationFlagDialog" center title="权限配置" width="60%">

        <el-checkbox-group v-model="configurationCheck">
          <el-row>
            <el-col :span="16" style="margin-left:20px">
              <el-checkbox v-for="(item) in configurationCheckList" :label="item.name" :key="item.id" style="margin-left:20px"
                @change="checkedChange" />
            </el-col>
          </el-row>
        </el-checkbox-group>

        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="configurationFlagDialog=false">取 消</el-button>
          <el-button type="primary" size="small" @click="fnClickMakeSureGetAllAuth">确 定</el-button>
        </div>
      </el-dialog>
      <el-form :model="RoleForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="角色名称">
                    <el-input v-model="RoleForm.name" size="small" style="width:240px" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="">
                    <el-button size="small" type="primary" @click="searchByRole">搜索</el-button>
                    <el-button size="small" @click="addRole">添加</el-button>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
          </el-col>
          <el-col :span="12" />
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="8">
            <div>
              <el-row>
                <div style="margin-left:-72px">
                  <el-col :span="6">
                    <el-form-item>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>

                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>
                    </el-form-item>
                  </el-col>
                </div>

              </el-row>
            </div>
          </el-col>
          <el-col :span="16">
            <div />
          </el-col>
        </el-row>
      </el-form>

    </div>
    <div class="dev1_border" />
    <div style="background:#fff">
      <!-- 表格 -->
      <div>
        <el-table :data="roleTableData" :header-row-style="headerClass" :row-style="rowClass" :row-class-name="tableRowClassName"
          style="width: 100%">
          <el-table-column prop="name" label="角色名称" width="180" />
          <el-table-column prop="tips" label="角色描述" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="modifyRole(scope.row)">编辑</el-button>
              <el-button size="small" @click="fnDeleteRole(scope.row.id)">删除</el-button>
              <el-button size="small" @click="configuration(scope.row.id)">权限配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
<script>
  import {
    getAllRole,
    getRoleByContion,
    addRole,
    modifyRole,
    deleteRole,
    getAllAuth,
    reloReleAuth,
    getMenuByRoleId
  } from '@/api/Jurisdiction'
  export default {
    data() {
      return {
        // 添加角色弹窗表单
        Addform: {
          name: '',
          tips: '',
          roleType: '',
          roleOptions: [{
              value: '普通用户',
              roleType: '0',
            },
            {
              value: '超级管理员',
              roleType: '1',
            },
          ]
        },
        //添加角色表单校验
        addRules: {
          name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          tips: [{
            required: true,
            message: '请输入角色描述',
            trigger: 'blur'
          }],
          roleType: [{
            required: true,
            message: '请输入角色描述',
            trigger: 'change'
          }]
        },
        //添加的入参
        addformParameter: {
          name: '',
          tips: '',
          roleType: '',
        },
        // 修改角色
        modifyRoleForm: {
          name: '',
          tips: '',
          num: '',
          id: ''
        },
        modifyRoleId: '',
        modifyRoleNum: '',
        deleteRoleId: '',
        roleId: '',
        roleAuthArray: [],
        deleteRoleArray: [],
        roleObject: {
          roleId: '',
          authIds: []
        },
        formLabelWidth: '120px', // 输入框长度
        addFlagDialog: false, // 添加弹窗显示的变量
        modifyFlagDialog: false, // 修改弹窗显示的变量
        configurationFlagDialog: false, // 权限配置的弹窗
        configurationCheckList: [], // 权限配置的复选框
        configurationCheck: [],
        flagShuzu: [],
        RoleForm: {
          name: ''
        },
        roleTableData: [{
          id: 1,
          name: '2016-05-02',
          alias: '王小虎',
          tips: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          name: '2016-05-04',
          alias: '王小虎',
          tips: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 3,
          name: '2016-05-01',
          alias: '王小虎',
          tips: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 4,
          name: '2016-05-03',
          alias: '王小虎',
          tips: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    created() {
      // 查询所有角色
      this.fnSearchAllRole()
    },
    mounted() {
      // 查询所有角色
      this.fnSearchAllRole()
    },
    methods: {
      // 表格行高的设置
      rowClass({
        row,
        rowIndex
      }) {
        return 'height:60px'
      },
      // 表头 行高设置
      headerClass({
        row,
        rowIndex
      }) {
        return 'height:60px'
      },

      // 查询所有角色(点击搜索)
      fnSearchAllRole() {
        getAllRole().then(res => {
          if (res.code == 0) {
            this.roleTableData = res.data
          }
        }).catch(error => {})
        this.$forceUpdate()
      },
      // 根据 name 查角色
      searchByRole() {
        getRoleByContion(this.RoleForm.name).then(res => {
          if (res.code == 0) {
            this.roleTableData = res.data
          }
        }).catch(error => {

        })
      },
      // 添加角色信息
      fnClickAddRole(formName) {
        this.addformParameter.name = this.Addform.name
        this.addformParameter.tips = this.Addform.tips
        this.addformParameter.roleType = this.Addform.roleType == '普通用户' ? '0' : '1'
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addRole(this.addformParameter).then(res => {
              if (res.code == 0) {
                this.Addform.name = ''
                this.Addform.tips = ''
                
              }
              this.addFlagDialog = false
               this.fnSearchAllRole()
            }).catch(error => {

            })
          } else {
           
            return false;
          }
        });
      },
      // 取消添加
      fnClickCancelAdd() {
        this.addFlagDialog = false
      },
      // 添加弹窗显示
      addRole() {
        this.addFlagDialog = true
      },
      /* 
       *编辑 跳转到编辑详情
       */
      modifyRole(roleId) {
        this.$router.push({
          path: '/editDetail',
          query: {
            roleId: roleId.id,
            name: roleId.name,
            tips: roleId.tips,
            roleType: roleId.roleType,
            num: roleId.num
          }
        })
      },
      /*删除按钮 对表格选中的行删除 传id 放个数组里面 调接口 因为有分页功能 每页固定传10条 删除是后端删除 删除后重新去掉 获取列表的接口
       *和修改一样的问题 To do  
       */
      fnDeleteRole(id) {
        deleteRole(id).then(res => {
           if (res.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
           this.fnSearchAllRole()
          }else if(res.message == '该角色还有人，不能删除'){
             this.$message({
              message: '该角色还有人，不能删除',
              type: 'error'
            })   
          }
        }).catch(error => {

        })
      },
      /*
       *配置权限
       */
      configuration(id) {
        this.configurationCheckList = []
        this.configurationCheck = []
        getAllAuth().then(res => {
          if (res.code == 0) {
            this.roleId = id
            // 调  getmenubyroleid的接口 默认显示上一次勾选的权限   //根据角色id查看所拥有权限
            getMenuByRoleId(this.roleId).then(res => {
              res.data.forEach(element => {
                this.configurationCheck.push(element.name)
              })
            }).catch(error => {})
            res.data.forEach(element => {
              this.configurationCheckList.push(element)
            })
            this.configurationFlagDialog = true
          }
        }).catch(error => {})

      },
      // 点击 复选框
      checkedChange(val) {

      },
      // 角色权限关联
      fnClickMakeSureGetAllAuth() {

        var cc = this.configurationCheckList.filter(item => {
          return this.configurationCheck.includes(item.name)
        })
        cc.forEach(element => {
          this.roleObject.authIds.push(element.id)
        })
        // 所有状态为true
        // //状态为true 的对象的id 取出来 传给后端
        this.roleObject.roleId = this.roleId
        reloReleAuth(this.roleObject).then(res => {
          if (res.code == 0) {
            this.configurationFlagDialog = false
          }
        }).catch(error => {
          alert('操作失败')
          this.configurationFlagDialog = false
        })
        // this.configurationFlagDialog = false
      },
      // 表格样式函数
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      // fnClickToDetail 查看角色详情  也可以这么说 (根据角色id查员工)
      //   fnClickToDetail(row, column, cell, event) {
      //     this.$router.push({
      //       name: '角色详情',
      //       params: {
      //         id: row.id,
      //         name: row.name,
      //         tips: row.tips
      //       }
      //     })
      //   }

    }
  }

</script>
<style>
  .el-table th,
  .el-table tr {
    cursor: pointer;
  }

</style>
