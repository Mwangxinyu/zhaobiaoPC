<template>
  <el-dialog :visible.sync="showDialog" title="用户选择" width="78%" @close="closeQrganization">
    <el-row>
      <el-col :span="6" style="margin-right:20px;border:1px solid #dcdfe6;">
        <div style="height:520px;">
          <div style="margin-top:9px">已选择人员</div>
          <el-tabs>
            <el-tree :data="treetable" :props="defaultProps" accordion style="overflow: auto;height: 480px" @node-click="searchPeople" />
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="17" style="height:520px;">
        <div>
          <el-row :gutter="20">
            <el-col :span="20">
              <div>
                <el-input v-model="condition" placeholder="请输入员工名称或用户名查询" suffix-icon="el-icon-search"/>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <el-button type="primary" @click="searchSpecific" icon="el-icon-search">搜索</el-button>
              </div>
            </el-col>
          </el-row>

        </div>

        <div>
          <el-table ref="multipleTable" :data="list" tooltip-effect="dark" height="200" border style="width: 100%;margin-top: 24px;line-height:33px;"
            row-key @select-all="selectStaffAll" @select="selectStaff">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="deptid" label="部门" width="120" />
            <el-table-column prop="jobTitle" label="职务" show-overflow-tooltip />
            <el-table-column prop="phone" label="手机号" show-overflow-tooltip />
          </el-table>
        </div>
        <div>
          <h3>已选择人员</h3>
          <el-table ref="chooseTable" :data="chooseUser" height="200" tooltip-effect="dark" style="width: 100%;margin-top: 24px;line-height:33px;"
            border @row-click="deleterow">
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="deptid" label="部门" width="120" />
            <el-table-column prop="jobTitle" label="职务" show-overflow-tooltip />
            <el-table-column prop="phone" label="手机号" show-overflow-tooltip />
          </el-table>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeQrganization">取 消</el-button>
      <el-button type="primary" @click="AddApprover">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    popupGetAlldepartment,
    showdirector,
    searchpeople,
    searchspecific
  } from '@/api/public'

  export default {
    name: 'IncreaseApprovers',
    props: {
      callback: Function
    },
    computed: {
      ...mapGetters([
        'investmentCost',
        '$cost',
        'app',
        'user',
        'approvalProcess',
        'standardCost'
      ])
    },
    data() {
      return {
        treetable: [

        ],
        list: [{
          name: '',
          deptid: '',
          phone: '',
          jobTitle: ''
        }],
        defaultProps: {
          children: 'children',
          label: 'simplename'
        },
        companyProps: {
          children: 'children',
          label: 'deptname'
        },
        showDialog: true,
        chooseUser: [], // 已选中的人员
        link: '',
        myCompanys: [],
        searchPerson: '',
        organizations: [],
        condition: '',
        bbb: {
          deptid: ''
        }
      }
    },
    methods: {
      ...mapActions([]),
      // 加载动画
      getLoadingInstance() {
        const loadingInstance = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.6)'
        })
        return loadingInstance
      },

      // 根据人员姓名查相关部门
      searchSpecific() {
        //  this.list={}

        searchspecific(this.condition).then(data => {
          this.list = data.data
        }).catch(function (error) {})
      },
      // 点击左侧分组名称，查询员工信息
      // handlecheckchange(data, checked, indeterminate) {
      //   // 调接口,获取员工数据，并赋值给list
      //   // this.bbb.deptid = data.deptId
      //   this.list = []
      //   //* **不需要this.bbb.deptid = data.deptId
      //   // 把入参直接传成对象 {'deptid':data.deptId} code是字符串的'deptid' 值是data.deptId
      //   handlecheckChange({ 'deptid': data.deptId }).then(data => {
      //     this.list = data.data
      //   }).catch(function(error) {

      //   })
      // },
      // 关闭页面
      closeQrganization() {

      },
      //将未选中的数组push到已选中 的  需要去重
      selectStaff(selection, row) {
        // this.chooseUser.push(row)
        for (var k = 0; k < selection.length; k++) {
          var flag = true;
          for (var i = 0; i < this.chooseUser.length; i++) {
            if (JSON.parse(JSON.stringify(selection[k])).account == JSON.parse(JSON.stringify(this.chooseUser[i])).account) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.chooseUser.push(selection[k]);
            flag = true;
          }
        }
      },
      /*
       * 选中人员（多选）
       * val所有选中的人数组
       * */
      selectStaffAll(selection) {

        for (var k = 0; k < selection.length; k++) {
          var flag = true;
          for (var i = 0; i < this.chooseUser.length; i++) {
            if (JSON.parse(JSON.stringify(selection[k])).account == JSON.parse(JSON.stringify(this.chooseUser[i])).account) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.chooseUser.push(selection[k]);
            flag = true;
          }
        }

      },
      deleterow(row, event, column) {
        this.chooseUser.splice(this.chooseUser.indexOf(row), 1)
      },
      /*
       * 已选中人员处理(多)
       * */
      // selectedStaffAll: function() {
      //   this.chooseUser.map((item,index)=>{
      //     this.chengeSelectUser(item)
      //   })
      //   this.chooseUser = []
      // },
      /*
       * 已选中人员处理(单)
       * */
      selectedStaff: function (val, row) {
        this.chooseUser.map((_item, index) => {
          if (_item.deptid === row.deptid) {
            this.chooseUser.splice(index, 1)
            this.chengeSelectUser(row)
            return false
          }
        })
      },
      /*
       * 取消已选人员，改变勾选状态
       * */
      //   chengeSelectUser (row) {
      //     let that = this
      //     if(this.list && this.list.length>0){
      //       this.list.map(item => {
      //         if(item.deptid === row.deptid){
      //           that.$refs.multipleTable.toggleRowSelection(item);
      //         }
      //       })
      //     }
      //   },
      // 确定
      AddApprover() {
        this.callback(this.chooseUser)
        // this.$emit('callback',this.chooseUser)
      },
      // 点击添加人员 获取左侧部门
      showDirector() {
        this.flag = !this.flag
        showdirector({}).then(data => {
          this.treetable = data.data
        }).catch(function (error) { // 加上catch
        })
      },
      searchPeople(data, checked, indeterminate) {
        // 调接口,获取员工数据，并赋值给list
        // this.bbb.deptid = data.deptId
        this.list = []
        //* **不需要this.bbb.deptid = data.deptId
        // 把入参直接传成对象 {'deptid':data.deptId} code是字符串的'deptid' 值是data.deptId
        searchpeople({
          'deptid': data.deptId
        }).then(data => {

          this.list = data.data
          //   this.list.push()
        }).catch(function (error) {

        })
      }
      // 查询人员
      // searchPeople() {
      //   popupGetAlldepartment({}).then(data => { // 反参
      //     this.treetable = data
      //   }).catch(function(error) { // 加上catch
      //   })
      // }
    },
    created() {
      this.showDirector()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table__body {
    color: red;
  }

  .long-pagination-swap {
    padding: 0 10px;
    color: aqua
  }

  .long-pagination-swap .long-pagination-text {
    display: table;
  }

  .long-pagination__total,
  .long-pagination-page-sizes {
    display: table-cell;
    vertical-align: middle;
    padding-right: 10px;
    font-weight: 400;
    color: #606266;
    font-size: 13px;
    padding-top: 4px;
  }

  .increasePaginate {
    float: right;
    margin-top: 10px;
  }

</style>
