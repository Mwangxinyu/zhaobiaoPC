<template>
  <div style="border-radius:10px;background:#fff;position:relative">
    <el-button type="primary" size="mini" style="position:absolute;top:14px;right:20px;z-index:9999" @click="goBack">返回</el-button>
    <el-table :data="recordTableData" height="450" :header-row-style="headerClass" :row-style="rowClass"
      :row-class-name="tableRowClassName" :default-sort="{prop: 'releaseTime', order: 'descending'}" style="width: 100%">
      <el-table-column prop="releaseTime" sortable label="发文时间" width="100" />
      <el-table-column prop="releaseId" label="发文编号" width="180" align="center" />
      <el-table-column prop="version" label="版本号" width="180" align="center" />
      <el-table-column prop="modifyTime" label="修改时间" width="180" />
      <el-table-column prop="addAccount" label="修改人" width="180" />
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="fnClickGetExpertDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="background:#fff;margin-top:30px;">
      <el-pagination :page-size="10" @current-change="changePage" :total="Number(count)" small background layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>
<style scoped>

</style>

<script>
  import {
    gethistorspecia
  } from '@/api/public'
  export default {
    data() {
      return {
        //分页
        count: '',
        recordTableData: [{
          releaseTime: '',
          releaseId: '',
          version: ''
        }]
      }
    },
    created() {
      this.fnInitPageData()
    },
    methods: {
      /*
       *返回专家库 最新记录页面
      */
      goBack() {
         this.$router.push({
             path: '/expertDetail/'
         })  
      },
      /**
       * 页面数据初始化
       */
      fnInitPageData() {
        // 获取专家库历史版本
        this.fnGetExpertHistory()
      },
      /**
       *  获取专家库历史版本列表
       */
      fnGetExpertHistory(val) {
        gethistorspecia(val).then(res => {
          this.recordTableData = res.data.speciaList
          this.count = res.data.count
        }).catch(function (error) {})
      },
      /**
       * 点击查看 进入详情/预览页
       * @param row 当前被点击数据
       */
      fnClickGetExpertDetail(row) {
        this.$router.push({
          name: '专家库预览页面',
          params: {
            version: row.version
          }
        })
      },
      /*
       *页码改变
       */
      changePage(val) {
        this.fnGetExpertHistory(val)
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
    }
  }

</script>
