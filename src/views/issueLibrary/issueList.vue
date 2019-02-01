<template>
  <div class="contract-caption-bgc">
    <div class="contract-caption-basic contract-w100">
      <el-form :inline="true" :model="issus" class="demo-form-inline" style="padding:10px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="议题名称：">
              <el-input clearable v-model="issus.topicName" placeholder="请输入议题名称" style="width:400px" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发起部门">
              <el-input clearable v-model="issus.sponsorDept" placeholder="请输入发起部门" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="4">

            <el-button type="primary" size="mini" @click="screen" round>搜索</el-button>


            <el-button type="primary" size="mini" @click="exportById()" round>导出</el-button>
            <el-button type="primary" size="mini" @click="addIssue" round>新建议题</el-button>


          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-row>
                <el-col :span="12">
                  <div class="block">
                    <el-date-picker clearable size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions1"
                      v-model="issus.add_time" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="block">
                    <el-date-picker clearable size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions1"
                      v-model="issus.end_time" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>


            </el-form-item>

          </el-col>

          <el-col :span="8">

            <el-form-item label="上会形式">
              <el-select clearable size="mini" v-model="issus.online" placeholder="请选择活动区域">

                <el-option label="线上" value="0"></el-option>
                <el-option label="线下" value="1"></el-option>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="mini" @click="fnClickAddDisscussion" round>添加到待选议题</el-button>
            <el-button type="primary" size="mini" @click="fnClickAddStayLibrary" round>待审议题库</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="dev1_border" />
      <el-table ref="multipleTable" :header-row-style="headerClass" :row-style="rowClass" :row-class-name="tableRowClassName"
        :data="issueIndexTable" tooltip-effect="dark" height="650" style="width: 100%" @select="selectTable"
        @selection-change="handleSelectionChange" @row-dblclick="showRadio">
        <el-table-column type="selection" width="55" />
        <el-table-column label="议题名称" show-overflow-tooltip width="400">
          <template slot-scope="scope">{{ scope.row.topicName }}</template>
        </el-table-column>
        <el-table-column prop="sponsorDept" label="发起部门" width="120" />
        <el-table-column prop="addTime" label="创建时间" show-overflow-tooltip />
        <el-table-column prop="number" label="上会次数" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <div style="text-align:center">
              <div v-if="roleType == '1'">
                <span class="count" @click="jump(scope.row)">{{scope.row.number}}</span>
              </div>
              <div v-if="roleType == '0'">
                <span>{{scope.row.number}}</span>
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="meetting" label="上会形式" show-overflow-tooltip width="200">
          <template slot-scope="scope">
            <div v-if="show">
              <el-radio v-model="scope.row.flag" label="线上" v-if="scope.row.online == 0" />
              <el-radio v-model="scope.row.flag" label="线下" v-if="scope.row.online == 1" />
            </div>
            <!-- 0 线上 1 线下 -->
            <div v-if="!show">
              <el-radio-group v-model="scope.row.online" @change="meettingFormChange(scope.row)">
                <el-radio :label="'0'">线上</el-radio>
                <el-radio :label="'1'">线下</el-radio>
              </el-radio-group>
            </div>
            <!-- 0 线上 1 线下 -->


          </template>

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="issuesDetail(scope.row)">查看</el-button>
            <el-button type="text" v-if="roleType == '1'" @click="bianji(scope.row)">编辑</el-button>
            <el-button type="text" v-if="scope.row.isAudit == '0'" @click="addAudit(scope.row)">添加为待审议题</el-button>
            <!-- <el-button type="text" v-if="roleType == '1'" @click="HandleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 分页 -->
    <div style="margin-top:30px;text-align:right">
      <el-pagination :page-size="10" @current-change="changePage" small layout="prev, pager, next" :total="Number(count)">
      </el-pagination>
    </div>
  </div>


</template>

<script>
  import {
    addAuditIssues
  } from '@/api/alternativeIssues'
  import {
    initdata,
    discussionSearch,
    issuesdetail,
    exportbyid,
    handledelete,
    getallIssues,
    countdetail,
    updateIssuesonLine,
    addaudit
  } from '@/api/public'
  import url from '@/api/url'
  export default {
    data() {
      return {
        page:0,//当前页数
        roleType: '',
        //分页
        count: '',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //  value1: '',
        exportbyidList: [],
        exportidList: [],
        cccc: '',
        //表单对象
        issus: {
          topicName: '',
          sponsorDept: '',
          add_time: '',
          end_time: '',
          online: '',
        },
        time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        //搜索入参
        search: {
          topicName: '',
          sponsorDept: '',
          add_time: '',
          end_time: '',
          online: ''
        },
        //当前行添加待审议题入参
        auditIssues: [],
        //批量添加待审议题入参
        auditIssuesarr: [],
        //筛选入参
        screendata: {

        },
        options: [{
          value: '0',
          label: '线上'
        }, {
          value: '1',
          label: '线下'
        }],
        //修改议题上会形式入参
        issusStatus: {
          online: '',
          id: ''
        },
        exportbyidaa: [],
        show: true,
        value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        dialogFormVisible: false,
        formInline: { // 议题页绑定的表单
          user: '',
          region: ''
        },
        //   formPopup:{
        //     name:"",
        //     explain:"",
        //     type:"",
        //     optionfirst:""

        //   },
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        formLabelWidth: '120px',
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: '',
        value: '',
        value6: '',
        value7: '',
        issueIndexTable: [

          {
            topicName: '',
            sponsorDept: '',
            add_time: '',
            number: '',
            meetting: '',
            radio1: '',
            id: '',
            flagshow: false,
            isAudit: '',
          }
        ],
        value1: '',
        multipleSelection: []
      }
    },
    created() {
      this.initData()
    },
    methods: {
      /*
       * meettingFormChange
       * 线上线下状态改变
       */
      meettingFormChange(row) {
        this.issusStatus.online = row.online
        this.issusStatus.id = row.id
        updateIssuesonLine(this.issusStatus).then(res => {
          this.initData()
        })
      },
      /*
       * rowClass 
       */
      rowClass({
        row,
        rowIndex
      }) {
        return 'cursor:pointer;height:60px'
      },
      // 表格样式函数
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex % 2 === 0) {
          return ''
        } else {
          return 'success-row'
        }
        // return ''
      },
      // 表头 行高设置
      headerClass({
        row,
        rowIndex
      }) {
        return 'height:60px'
      },
      /*
       *页码改变
       */
      changePage(val) {
        this.page = val
        this.initData(val)
      },
      /*
       *showRadio   双击出现线上线下(只在当前行显示)
       */
      showRadio(row, event) {
        this.show = !this.show

      },
      jump(row) {

        countdetail(row.id).then(res => {

        })
        this.$router.push({
          path: '/meetingCount',
          query: {
            id: row.id
          }
        })
      },



      //点击搜索  条件搜索议题
      screen() {
        this.search.add_time = this.issus.add_time
        this.search.end_time = this.issus.end_time
        this.search.online = this.issus.online
        this.search.topicName = this.issus.topicName
        this.search.sponsorDept = this.issus.sponsorDept
        discussionSearch(this.search).then(res => {
          if (res.data.length > 0) {
            res.data.forEach(item => {
              if (item.online === 0) {
                item.flag = '线上'
              } else {
                item.flag = '线下'
              }
            })
            this.issueIndexTable = res.data
          } else {
            alert("暂时没有数据")
            this.issueIndexTable = []
          }


        })
      },
      // 点击按钮 跳转到对应页面
      addIssue() {
        this.$router.push({
          path: '/newIssues',
          query: {
            id: 0
          }
        })
      },
      bianji(row) { // 点击编辑 跳转页面 调查看的接口 绑数据 拿到数据以后 显示数据
        this.$router.push({
          path: '/issueEditor',
          query: {
            id: row.id
          }
        })
      },
      addAudit(row) { // 添加为待审议题
        this.auditIssues.push(row.id);
        addaudit(this.auditIssues).then(res => {
          this.initData()
        })

      },
      issuesDetail(row) {
        // 获取当前行的id 把id传给后端
        issuesdetail(row.id).then(res => {})
        // this.$router.push({
        //   path: '/IssueTranslation'
        // });
        this.$router.push({
          path: '/IssueTranslation',
          query: {
            id: row.id
          }
        })
        // this.$router.push({path:'/IssueTranslation/'})
      },
      onSearch() {
        this.search.topicName = this.issus.topicName
        this.search.sponsorDept = this.issus.sponsorDept
        discussionSearch(this.search).then(res => {
          this.issueIndexTable = res.data

        })
      },
      handleEdit(index, row) {},
      initData(val) {
        getallIssues(val).then(res => {
          res.data.issues.forEach(item => {
            if (item.online === "0") {
              item.flag = '线上'
            } else {
              item.flag = '线下'
            }
            this.roleType = String(res.data.roleType)
          })
          this.issueIndexTable = res.data.issues
          this.count = res.data.count
        }).catch(function (error) {

        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = []
        this.auditIssuesarr = []
        val.forEach((item => {
          if (item.isAudit == '0') {
            this.auditIssuesarr.push(item.id)
          }
        }))


        this.multipleSelection = val
      },

      selectTable(selection) {

        this.exportidList = selection
      },
      exportById() {
        //
        // 遍历表格绑定的数组  取出点击的id 放入新数组  传给后端
        this.exportidList.forEach(element => {
          this.cccc += element.id + ','

          // this.cccc.push(element.id)  [1,2,3]
        })
        //  window.open('http://10.3.93.148:10003' + '/issues/exportById?id=' + this.cccc)
        window.open(url.exportById + '?id=' + this.cccc)
      },
      HandleDelete(index, row) {
        handledelete(row.id).then(res => {
          if (res.code == 0) {
            this.initData()
          }

        })

      },
      /**
       * 添加到待选议题库
       */
      fnClickAddDisscussion() {
        if (this.auditIssuesarr.length) {
          addAuditIssues(this.auditIssuesarr).then(res => {
            if (res.code == 0) {
                debugger
              
              this.$message({
                type: 'success',
                message: '添加成功！！'
              })
               this.initData(this.page)
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '您已经添加过该议题为待审议题了'
          })
        }
        addAuditIssues(this.auditIssuesarr).then(res => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: '添加成功！！'
            })
             this.initData(this.page)
          }
        })

      },
      /**
       * 待审议题库
       */
      fnClickAddStayLibrary() {
        this.$router.push({
          path: '/alternativeIssues'
        })
      }
    }
  }

</script>

<style scoped>
  .count:hover {
    color: blue;
    font-size: 16px;
    cursor: pointer;

  }

  .bgstyle {
    height: 98%;
    padding: 0px 0px 0px 0px;
  }

  .el-form-item {
    margin: 5px !important;
  }

</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
