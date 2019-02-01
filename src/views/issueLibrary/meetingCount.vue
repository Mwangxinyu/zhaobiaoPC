<template>
  <div>
    <el-table :data="tableData2" height="500" :header-row-style="headerClass" style="width: 100%" :row-style="rowClass" :row-class-name="tableRowClassName">
      <el-table-column prop="conferenceId.conferenceName" label="会议名称" width="180">
      </el-table-column>
      <el-table-column prop="conferenceId.startTime" label="会议时间" width="180">
      </el-table-column>
      <el-table-column prop="conferenceId.isOnline" label="会议形式">
        <template slot-scope="scope">
          <div v-if="scope.row.conferenceId.isOnline == 0">
            <span class="count">线上</span>
          </div>
          <div v-else>
            <span>线下</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="option" label="会议结果">
      </el-table-column>
    </el-table>
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
    countdetail
  } from '@/api/public'
  export default {

    data() {
      return {
        tableData2: [{
          conferenceName: '2016-05-02',
          startTime: '王小虎',
          isOnline: '上海市普陀区金沙江路 1518 弄',
          option: ''
        }]
      }
    },
    created() {
      this.countDetail()
    },
    methods: {
      countDetail() {
        countdetail(this.$route.query.id).then(res => {
          this.tableData2 = res.data
        })
      },
      // 表头 行高设置
      headerClass({
        row,
        rowIndex
      }) {
        return 'height:60px'
      },
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
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      
    },
  }

</script>
