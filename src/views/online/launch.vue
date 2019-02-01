<template>
  <div style="background:#fff;">
    <!--组织机构弹窗-->
    <div v-if="bShowDeptDialog">
      <increase-Approvers :callback="fnOnCloseDeptDialog" />
    </div>
    <!-- 专家库弹窗 -->
    <el-dialog :modal="true" :visible.sync="bShowPersonList" width="70%" top="1%">
      <div slot="title">人员查询</div>
      <div>
        <el-form label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:">
                <el-input v-model="oJurySearch.name" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分组:">
                <el-input v-model="oJurySearch.groupName" size="small" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button style="margin-left:60px" size="small" icon="el-icon-search" type="primary" @click="fnClickSearchJuryList()">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row style="padding-top:1%">
          <el-col :span="11">
            <el-table :cell-style="({'cursor':'pointer'})" :data="oJuryList" :header-cell-style="{background:'#f3f3f3', 'text-align': 'center', color: '#666',fontSize:'13px',height:'35px',border:'0.5px solid #e5e5e5',padding:'6px 0',fontWeight:'500'}"
              highlight-current-row border height="400px" size="small" @row-click="fnClickJuryToRight">
              <el-table-column align="center" prop="name" show-overflow-tooltip label="姓名" min-width="33%" />
              <el-table-column align="center" prop="groupName" show-overflow-tooltip label="分组" min-width="33%" />
            </el-table>
          </el-col>
          <el-col :span="2" class="transferButton">
            <!-- <div>
              <el-button type="primary" icon="el-icon-d-arrow-right" circle />
            </div>
            <div>
              <el-button style="margin-left: 1px;margin-top: 14%;" type="primary" icon="el-icon-d-arrow-left" circle />
            </div> -->
          </el-col>
          <el-col :span="11">
            <el-table :cell-style="({'cursor':'pointer'})" :data="oJuryListSelect" :header-cell-style="{background:'#f3f3f3', 'text-align': 'center', color: '#666',fontSize:'13px',height:'35px',border:'0.5px solid #e5e5e5',padding:'6px 0',fontWeight:'500'}"
              highlight-current-row border height="450px" size="small" @row-click="fnClickJuryToLeft">
              <el-table-column align="center" prop="name" show-overflow-tooltip label="姓名" min-width="33%" />
              <el-table-column align="center" prop="groupName" show-overflow-tooltip label="分组" min-width="33%" />
            </el-table>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" style="margin-left:84%">
          <el-button type="primary" size="small" @click="fnClickClosePersonDialog()">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加议题的弹窗 -->
    <el-dialog :visible.sync="bShowIssueList" title="添加议题">
      <el-table :data="oIssueList" height="250" border style="width: 100%" @selection-change="fnSelectIssueChange">
        <el-table-column type="selection" />
        <el-table-column prop="topicName" label="议题名称" width="180" />
        <el-table-column prop="sponsorDept" label="发起部门" width="180" />
        <el-table-column prop="add_time" label="创建时间" />
        <el-table-column prop="number" label="上会次数" width="180" />
        <el-table-column prop="form" label="上会形式" />
      </el-table>
      <div style="margin-top:30px;text-align:right">
        <el-pagination small :page-size="10" :current-page.sync="currentPage" :total="total" background layout="prev, pager, next"
          @current-change="dialogAddPage" />
      </div>
      <div style="text-align:center;margin-top:20px">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="fnClickCloseIssueDialog">确定</el-button>
      </div>
    </el-dialog>
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100">
        <el-row>
          <el-col :span="10" class="contract-ml10">
            <span class="dev1-line" />
            <span class="dev1_font">详情信息</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-form ref="conference" :rules="rules" :model="conference" style="padding:0 30px">
      <el-row style="margin-top:20px">
        <el-col :span="24">
          <div>
            <el-form-item label="会议名称" prop="conferenceName">
              <el-input v-model="conference.conferenceName" style="width:28%;margin-bottom:10px;" size="small" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <el-form-item label="会议内容" prop="conferenceDesc">
              <el-input v-model="conference.conferenceDesc" style="width:28%;margin-bottom:10px;" size="small" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px">
        <el-col :span="24">
          <div>
            <div style="width:28%;margin-bottom:30px;">
              <span style="color:#666;font-size:14px;">选择议题：</span>
              <el-button size="small" @click="fnClickSelectIssue('')">添加</el-button>
            </div>
            <div style="margin-left:88px;">
              <el-form-item>
                <el-table :data="conference.issuesId" :cell-class-name="setTableContentStyle" :header-cell-style="{background:'#f3f3f3', 'text-align': 'center', color: '#666',fontSize:'13px',height:'35px',border:'0.5px solid #e5e5e5',padding:'6px 0',fontWeight:'500'}"
                  style="width: 50%" highlight-current-row border size="small" class="inputStyle">
                  <el-table-column prop="sno" label="编号" width="180">
                    <template slot-scope="scope">
                      <format-input :precision="1" v-model="scope.row.sno" empty-value="请添加" thousands="true" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column prop="topicName" show-overflow-tooltip label="议题名称" align="center" />
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="fnClickRemoveIssue(scope.$index,conference.issuesId)">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>

            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div>
            <div style="margin-bottom:30px">
              <span style="color:#666;font-size:14px;">选择评标委员：</span>
              <el-button style="margin-left:20px;" size="small" @click="fnClickShowPersonDialog">添加</el-button>
            </div>
            <div>
              <el-form-item label="">
                <el-tag style="margin-right:10px;" v-for="tag in pbArr" :key="tag.account" closable @close="fnClickRemoveJury(tag)">
                  {{ tag.name }}
                </el-tag>
              </el-form-item>
            </div>

          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="24">
          <div>
            <div style="margin-bottom:30px">
              <span style="color:#666;font-size:14px;">选择监察委员：</span>
              <el-button style="margin-left:20px;" size="small" @click="fnClickShowDeptDialog">添加</el-button>
            </div>
            <div>
              <el-form-item label="">
                <el-tag v-for="tag in oSuperviseListSelect" :key="tag.account" closable @close="fnClickRemoveSupervise(tag)">
                  {{ tag.name }}
                </el-tag>
              </el-form-item>
            </div>

          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px">
        <el-col :span="12">
          <div>
            <el-form-item label="结束时间" prop="endTime">
              <div class="block">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="conference.endTime" type="datetime"
                  placeholder="选择日期时间" />
              </div>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top:30px">
        <el-form-item style="text-align:center">
          <el-button size="small" @click="fnClickCancel">取消</el-button>
          <el-button size="small" @click="fnClickSubmit('conference')">提交</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
  import formatInput from '@/components/formatInput/index'
  import choice from '@/components/choice/index'
  import IncreaseApprovers from '@/components/expert'
  import {
    getallIssues,
    launchOnlineConference,
    searchbyNameorgroup,
    onlinepage,
  } from '@/api/public'
  export default {
    components: {
      IncreaseApprovers,
      formatInput,
      choice
    },
    data() {
      return {
        total: 0, // 总页数
        currentPage: 1,
        issuseArray: [],
        //  议题 dialog
        oIssueList: [],
        // 显示隐藏议题 dialog
        bShowIssueList: false,
        // 显示隐藏选择人员
        bShowPersonList: false,
        // 查询委员库条件
        oJurySearch: {
          name: '',
          groupName: ''
        },
        // jury 因为是直接赋值对象的 所以不写详细字段也可以 写上方便查
        oJuryList: [{
          groupName: '',
          name: '',
          // 这些字段暂时没有用到
          releaseId: '',
          releaseTime: '',
          id: '',
          account: '',
          addAccount: ''
        }],
        // 选中的专家 (评标委员) 从专家库选
        oJuryListSelect: [],
        pbArr: [],
        // 选择的监察委员 从组织机构选
        oSuperviseListSelect: [],
        // 显示隐藏组织机构
        bShowDeptDialog: '',
        // 发起线上会议 model
        conference: {
          conferenceName: '',
          conferenceDesc: '',
          // [{"issuesId":"1","sno":"1.1"},{"issuesId":"2","sno":"2"}]   sno 是排序字段 带小数点
          issuesId: [],
          juryStr: [],
          superviseStr: [],
          endTime: '',
          startTime: '',
          isOnline: 0,
          // 发起人id 登录后session取出
          addAccount: ''
        },
        // 发起线上会议的校验   conferenceDesc
        rules: {
          conferenceName: [{
            required: true,
            message: '请输入会议名称',
            trigger: 'blur'
          }],
          conferenceDesc: [{
            required: true,
            message: '请输入会议内容',
            trigger: 'blur'
          }],
          endTime: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }]

        }
      }
    },
    methods: {
      /**
       *  添加议题  //280
       */
      fnClickSelectIssue(val) {
        // 查询议题列表 
        getallIssues(val).then(res => {
         this.oIssueList = res.data.issues
          this.total = res.data.count
        })
        this.bShowIssueList = true
      },
      /**
       * 关闭议题弹窗
       */
      fnClickCloseIssueDialog() {
         for (var k = 0; k < this.issuseArray.length; k++) {
          var flag = true;
          for (var i = 0; i < this.conference.issuesId.length; i++) {
            if (JSON.parse(JSON.stringify(this.issuseArray[k])).id == JSON.parse(JSON.stringify(this.conference
                .issuesId[i])).id) {
              flag = false;
              break;
            }
          }
          if (flag) {
           this.conference.issuesId.push(this.issuseArray[k]);
            flag = true;
          }
        }
        //  this.issuseArray.forEach((item)=>{
        //      this.conference.issuesId.push(item)
        //  })

        // 关闭议题弹窗
        this.bShowIssueList = false
      },
      /**
       * TODO 翻页 这个和 搜索 列表 和成一个比较好 待优化 318
       */
      dialogAddPage(val) {
        getallIssues(val).then(res => {
          this.oIssueList = res.data.issues
        }).catch(function (error) {

        })
      },
      /**
       * 选择议题改变时 设置选择值
       */
      fnSelectIssueChange(val) {
        this.issuseArray = val
      },
      /**
       * 点击移除 一个已选择议题
       */
      fnClickRemoveIssue(index, rows) {
        rows.splice(index, 1)
        
      },
      /**
       *  打开选择人员弹窗
       */
      fnClickShowPersonDialog() {
        // 不直接去初始话数据 必须填写搜索条件 手动点击搜索
        this.bShowPersonList = true
        this.oJuryList = []
        this.oJuryListSelect = []
      },
      /**
       * 专家库人员查询
       */
      fnClickSearchJuryList() {
        // TODO 前端判断空不是到是不是这样 写?
        if (this.oJurySearch.name === '' && this.oJurySearch.groupName === '') {
          // 弹出提示
          this.$message.error('姓名和分组最少填写一个')
          return
        }
        searchbyNameorgroup(this.oJurySearch).then(data => {
          this.oJuryList = data.data
        })
      },
      /**
       * 点击选择专家 穿梭到右边
       */
      fnClickJuryToRight(row, event, column) {
        this.oJuryListSelect.push(row)
        var result = [];
        var obj = {};
        for (var i = 0; i < this.oJuryListSelect.length; i++) {
          if (!obj[this.oJuryListSelect[i].account]) {
            result.push(this.oJuryListSelect[i]);
            obj[this.oJuryListSelect[i].account] = true;
          }
        }
        this.oJuryListSelect = result
      },
      /**
       * 点击专家 删除右侧
       */
      fnClickJuryToLeft(row, event, column) {
        this.oJuryListSelect.splice(this.oJuryListSelect.indexOf(row), 1)
        //   this.oJuryList.push(row)
      },
      /**
       * 关闭专家弹窗
       */
      fnClickClosePersonDialog() {
        this.pbArr = this.pbArr.concat(this.oJuryListSelect)
        var result = []
        var obj = {}
        for (var i = 0; i < this.pbArr.length; i++) {
          if (!obj[this.pbArr[i].account]) {
            result.push(this.pbArr[i])
            obj[this.pbArr[i].account] = true
          }
        }
        this.pbArr = result
        this.bShowPersonList = false
      },
      /**
       * 点击移除一个已选择的专家
       */
      fnClickRemoveJury(tag) {
        this.pbArr.splice(this.pbArr.indexOf(tag), 1)
        this.$forceUpdate()
        // 添加到未选中
        this.oJuryList.push(tag)
      },
      /**
       * 点击显示组织机构弹窗
       */
      fnClickShowDeptDialog() {
        this.bShowDeptDialog = !this.bShowDeptDialog
      },
      /**
       * 关闭组织机构 触发
       */
      fnOnCloseDeptDialog(userMessage) {
        // 添加 选择人员
        // this.oSuperviseListSelect.push(...userMessage)
        for (var k = 0; k < userMessage.length; k++) {
          var flag = true;
          for (var i = 0; i < this.oSuperviseListSelect.length; i++) {
            if (JSON.parse(JSON.stringify(userMessage[k])).account == JSON.parse(JSON.stringify(this.oSuperviseListSelect[
                i])).account) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.oSuperviseListSelect.push(userMessage[k]);
            flag = true;
          }
        }
        // 去重 根据人员编号
        this.fnArrayUnique(this.oSuperviseListSelect, 'personnel_num')
        this.bShowDeptDialog = false
      },
      /**
       * 点击移除一个已选择的委员
       */
      fnClickRemoveSupervise(tag) {
        this.oSuperviseListSelect.splice(this.oSuperviseListSelect.indexOf(tag), 1)
      },
      /**
       * 点击取消跳转线上会议列表
       */
      fnClickCancel() {
        this.$router.push({
          path: '/onlineList'
        })
      },
      /**
       * 提交数据 发起线上会议
       */
      fnClickSubmit(formName) {
        // 将后端不需要的属性去除
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 校验通过 在判断委员 监察 议题是否为空
            if (this.conference.issuesId.length === 0) {
              alert('请添加议题')
              return false
            }
            if (this.oJuryListSelect.length === 0) {
              alert('请添加委员')
              return false
            }
            if (this.oSuperviseListSelect.length === 0) {
              alert('请添加监察')
              return false
            }
            this.conference.issuesId = this.conference.issuesId.map(x => {
              return {
                'issuesId': x.id,
                'sno': x.sno.toFixed(1)
              }
            })
            // 设置已选择的专家(评标委员)
            this.conference.juryStr = this.pbArr.map(x => x.account).join(',')
            // 设置已选择的监察委员
            this.conference.superviseStr = this.oSuperviseListSelect.map(x => x.account).join(',')
            this.conference.startTime = this.getNowDate()
            // TODO 非空校验 2018年12月22日 记得要写 谢栋遗留问题
            launchOnlineConference(this.conference).then(res => {
              this.$router.push({
                path: '/onlineList'
              })
            })
          } else {
            return false
          }
        })
      },
      // 表格内容样式
      setTableContentStyle() {
        return 'tableContent-bg'
      }
    }
  }

</script>
<style scoped>
  .fontWeight>>>.el-input.is-disabled .el-input__inner {
    font-weight: bold;
  }

  .dev_show_form {
    padding-top: 8px;
    padding-bottom: 0;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .long-tabs-content>>>.cell {
    text-align: center;
  }

  .loadBtn {
    color: #41549c;
    font-size: 13px;
  }

  .contract-bgc {
    background-color: #ffffff;
    border-radius: 4px;
  }

  .contract-bgc>>>.el-tabs__nav-wrap {
    padding-left: 15px;
  }

  .contract-bgc>>>.el-tabs__active-bar {
    margin-left: 5px;
  }

  .contract-bgc>>>.el-tabs__nav-wrap {
    padding-left: 15px;
  }

  .contract-bgc>>>.el-tabs__active-bar {
    margin-left: 5px;
  }

  .otherMargin {
    margin-top: 6px !important;
  }

  .dev_show_form {
    padding-top: 8px;
    padding-bottom: 0;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .from-margin8 {
    margin-bottom: 4px;
  }

  .from-margin-7 {
    margin-bottom: -12px;
  }

  .piecerow_main {
    background-color: #edf2f7;
  }

  .dev_show_table>>>.el-table__footer {
    height: 35px;
  }

  .contract-bgc {
    background-color: #ffffff;
    border-radius: 4px;
  }

  .el-table .interleave_row {
    background: #f5f7fa;
  }

  .el-table .success-row {
    background: #faecd7;
  }

  .position_top_r {
    position: absolute;
    top: 13px;
    right: 20px;
    z-index: 12;
  }

  .dev1_span {
    margin-top: -16%;
    font-size: 12px;
    color: #999;
    margin-right: 6%;
  }

  .position_relative {
    position: relative;
  }

  .from-margin-7 {
    margin-bottom: -16px;
  }

  .contract-red {
    color: red;
  }

  .dialog-btn {
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .transferButton {
    text-align: center;
    font-size: 30px;
    margin-top: 17%;
  }

  .piecerow_main {
    background-color: #edf2f7;
  }

  .dev_show_form {
    padding-top: 8px;
    padding-bottom: 0;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .dev_show_formOther {
    height: 100%;
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .dialog-btn {
    position: absolute;
    top: 15px;
    right: 20px;
  }

  .headsearch>>>.el-form-item__content {
    display: inline-block;
    line-height: 40px;
    vertical-align: middle;
  }

  .modialog>>>.el-dialog {
    margin-left: 16%;
  }

  .contract-form>>>.el-input__inner {
    width: 200px;
  }

  .targetgroup>>>.el-radio {
    line-height: 33px;
  }

  .transferButton {
    text-align: center;
    font-size: 30px;
    margin-top: 17%;
  }

  .bigger .el-select {
    width: 100%;
  }

  .el-input_color_red input {
    color: red !important;
  }

  .bigger>>>.el-input--small .el-input__inner {
    border: none;
    background-color: transparent;
    margin-left: -10px;
  }

  .readStyle>>>.el-input--small .el-input__inner {
    border: none;
    width: 117%;
    height: 35px;
    line-height: 35px;
    margin-left: -10px;
  }

  .readStyle>>>.el-input-group__append {
    border: none;
  }

  .el-input-group__append .el-button,
  .el-input-group__append .el-select,
  .el-input-group__prepend .el-button,
  .el-input-group__prepend .el-select {
    margin: -10px -28px;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 224px;
  }

</style>
<style>
  .el-input_color_red .el-input.is-disabled .el-input__inner {
    color: red;
  }

  .color_red .el-select .el-input__inner {
    color: red;
  }

  .introducer .el-input__inner {
    background-color: white !important;
  }

</style>
<style>
  .introducer .el-input__inner {
    background-color: white !important;
  }

  .el-tooltip__popper {
    max-width: 350px !important;
  }

</style>
<style scoped>
  .datastyle>>>.el-input__inner {
    padding-right: 3px;
  }

</style>
