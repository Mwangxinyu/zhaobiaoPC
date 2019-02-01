<template>
  <div>
    <div class="contract-caption-bgc">
      <div class="contract-caption-basic contract-w100" style="position:relative">
            <el-button type="primary" size="mini" style="position:absolute;top:14px;right:20px;z-index:9999" @click="goBack">返回</el-button>
        <el-table :data="recordTableData" height="450" :header-row-style="headerClass" :row-style="rowClass"
          :row-class-name="tableRowClassName" :default-sort="{prop: 'releaseTime', order: 'descending'}" style="width: 100%">
          <el-table-column sortable prop="releaseTime" label="发文时间" width="100"/>
          <el-table-column prop="releaseId" label="发文编号" width="180" align="center"/>
          <el-table-column prop="version" label="版本号" width="180" align="center" />
          <el-table-column prop="modifyTime" label="修改时间" width="180" />
          <el-table-column prop="addAccount" label="修改人" width="180" />
          <el-table-column :formatter="formatter" prop="address" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="Detail(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="background:#fff;margin-top:30px;">
          <el-pagination :page-size="10" @current-change="changePage" :total="Number(count)" small background layout="prev, pager, next">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {
    gethistorjury,
    getjurybyversion
  } from '@/api/public'
  export default {
    data() {
      return {
        count: '',
        recordTableData: [{
          releaseTime: '',
          releaseId: '',
          version: ''
        }]
      }
    },
    created() {
      this.getCommitteeInfo()
    },
    mounted() {},
    methods: {
      /*
       *返回委员库记录页面
      */
     goBack(){
         this.$router.push({
              path: '/memberDetail'
         })
     },
      formatter(row, column) {
        return row.address
      },
      /*
       *页码改变
       */
      changePage(val) {
        this.getCommitteeInfo(val)
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
      // 查看历史委员库
      getCommitteeInfo(val) {
        gethistorjury(val).then(res => {
          this.recordTableData = res.data.juryList
          this.count = res.data.count
        }).catch(error => {})
      },
      Detail($index, row) {
        // 点击查看 进入预览页
        const loadingInstance = this.getLoadingInstance()
        getjurybyversion(row.version).then(res => {
          loadingInstance.close()
          this.$router.push({
            name: '委员库预览页面',
            params: {
              version: row.version
            }
          })
        }).catch(function (error) {

        })
      },
      getLoadingInstance() {
        const loadingInstance = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.6)'
        })
        return loadingInstance
      }
    }
  }

</script>
