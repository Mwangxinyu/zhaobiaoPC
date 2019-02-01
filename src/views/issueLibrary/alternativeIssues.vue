<template>
  <div style="background:#fff;padding:20px">
    <div style="width:100%;height:80px;border-radius: 5px;">
      <el-row>
        <el-col :span="6">
          <span style="font-size:13px;color:#666">议题名称：</span>
          <el-input placeholder="请输入议题名称" size="mini"></el-input>
        </el-col>
        <el-col :span="4">
          <span style="font-size:13px;color:#666">发起部门：</span>
          <el-input placeholder="请输入发起部门" size="mini"></el-input>
        </el-col>
        <el-col :span="8">
          <span style="font-size:13px;color:#666">创建时间：</span>
          <el-date-picker style="width:38%" size="mini" v-model="startTime" type="datetime" placeholder="请选择开始时间">
          </el-date-picker>
          -
          <el-date-picker style="width:40%" size="mini" v-model="endTime" type="datetime" placeholder="请选择结束时间">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <span style="font-size:13px;color:#666">上会形式：</span>
          <el-select size="mini" v-model="value" placeholder="请选择" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="primary" plain>搜索</el-button>
          <el-button size="mini" type="warning" plain>导出</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 表格 -->
    <div style="margin-top:30px">
      <el-table border :data="discussionTableData" :header-row-style="headerClass" :row-class-name="tableRowClassName"
        :row-style="rowClass" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="议题名称" prop="topicName">

        </el-table-column>
        <el-table-column label="发起部门" prop="sponsorDept" width="180">

        </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上会次数" prop="number" width="180">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)" type="success" plain>查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 分页 -->
    <div style="margin-top:50px;text-align:center">
      <el-pagination :page-size="form.size" @current-change="changePage" layout="prev, pager, next" :total="count">
      </el-pagination>
    </div>

  </div>
</template>
<style>
  .FloatLeft {
    float: left;
    line-height: 80px;
  }

  .FloatRight {
    float: right;
    width: 4%;
    line-height: 80px;

  }

</style>
<style scoped>
  .el-input {
    width: 67%;
  }

</style>

<script>
  import {
    getAuditIssues,
    deleteAuditIssues,
    addAuditIssues
  } from '@/api/alternativeIssues'
  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        count: 0,
        form: {
          page: 1,
          size: 5
        },
        discussionTableData: [],
        issus: '',
        options: [{
            value: '线上',
            label: '0'
          },
          {
            value: '线下',
            label: '1'
          }
        ],
        value: ''
      }
    },
    created() {
      this.fnInitData()
    },
    methods: {
      // 表格行高的设置
      rowClass({
        row,
        rowIndex
      }) {
        return 'height:60px'
      },
      // 表格样式函数
      tableRowClassName({
        row,
        rowIndex
      }) {
        if (rowIndex % 2 === 0) {
          return ''
        } else {
          return ''
        }
      },
      // 表头 行高设置
      headerClass({
        row,
        rowIndex
      }) {
        return 'height:60px'
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(id) {
        deleteAuditIssues([id]).then(res => {
            if(res.code == 0){
                this.$message({
                    type:'success',
                    message:'删除成功'
                })
                this.fnInitData()
            }
        })
      },
      /**
       * 获取待选议题库的列表
       */
      fnInitData() {
        getAuditIssues(this.form).then(res => {
          if (res.code == 0) {
            this.discussionTableData = res.data.issuesInfo
            this.count = res.data.count
          }
        })
      },
      /**
       * 改变页码
       */
      changePage(val) {
        this.form.page = val
        getAuditIssues(this.form).then(res => {
          if (res.code == 0) {
            this.discussionTableData = res.data.issuesInfo
          }
        })
      },
      /**
       * 改变线上还是线下
       */
      fnClickChangeRadio(val) {

      },
      /**
       * 查看待选议题库详情
       */
      handleEdit(id){
          this.$router.push({
              path: '/alternativeIssuesDetail',
              query:{
                  id:id
              }
          })
      },
      /**
       * 添加到待选议题库
       */
      addauditissues(){
          addAuditIssues().then(res=>{
              
          })
      }
    }
  }

</script>
