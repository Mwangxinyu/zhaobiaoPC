<template>
  <div class="offlineIndex">
    <el-form :model="formData">
      <el-row style="margin-bottom:30px">
        <el-col :span="8">
          <div>
            <el-form-item label="会议名称">
              <el-input v-model="formData.conferenceName" style="width:40%" size="small" placeholder="请输入会议名称" />
              <el-button size="small" @click="search()">搜索</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="16">
          <div>
            <el-form-item label="会议时间">
              <!-- <div class="block">
                <el-date-picker size="mini" v-model="value7" type="daterange" align="right" unlink-panels
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button size="mini" @click="screen">筛选</el-button>
              </div> -->
              <div class="block">
                <el-date-picker v-model="formData.startTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" size="mini"
                  placeholder="开始时间" />
                <el-date-picker v-model="formData.endTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" size="mini"
                  placeholder="结束时间" />
                <el-button size="mini" @click="screen">筛选</el-button>
                <el-button size="mini" type="primary" @click="addConference">新增会议</el-button>
              </div>
            </el-form-item>
          </div>
        </el-col>

        <!-- <el-col :span="3">
          <el-button @click="addConference" size="mini" type="primary">新增会议</el-button>
        </el-col> -->
      </el-row>
      <div style="padding:0px 0">
        <el-table :data="tableData4" border height="400" style="width: 100%" max-height="450" :header-row-style="headerClass"
          :row-style="rowClass" :row-class-name="tableRowClassName">
          <el-table-column prop="conferenceName" label="会议名称" />
          <el-table-column prop="endTime" label="会议时间">
            <template slot-scope="scope">
              {{ scope.row.endTime}}
            </template>
          </el-table-column>
          <el-table-column prop="url" label="会议纪要">
            <template slot-scope="scope">
              <span v-if="scope.row.url !== ''" @click="fnPreviewPdf(scope.row.url)">附件</span>
            </template>
          </el-table-column>
          <el-table-column prop="isEnd" label="状态">
            <template slot-scope="scope">
              {{ scope.row.isEnd }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button @click.native.prevent="edit(scope.row)" type="text" size="small">
                编辑
              </el-button> -->
              <el-button type="text" size="small" @click="seeDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <!-- 分页 -->
    <div style="margin-top:30px;text-align:right">
      <el-pagination :page-size="10" :total="Number(conferenceCount)" small layout="prev, pager, next" @current-change="changePage" />
    </div>
  </div>
</template>
<style scoped>
  .offlineIndex {
    background: #fff;
    padding: 10px;
  }

  .el-form-item__content {
    width: 300px;
  }

</style>
<script>
  import {
    launchonlinindexconference,
    SearchOfflineIndexConference
  } from '@/api/public'
  import url from '@/api/url'
  import {
    Loading
  } from 'element-ui'
  export default {
    data() {
      return {
        conferenceCount: '', // 后端返回的总数
        currentPage: 1,
        // 表单
        formData: {
          conferenceName: '',
          startTime: '',
          endTime: ''
        },
        // 点击搜索的入参
        searchData: {
          conferenceName: ''
        },
        // 点击筛选的入参
        screenData: {
          startTime: '',
          endTime: ''
        },
        total: 0,
        tableData4: [{
          conferenceName: '2016-05-03',
          endTime: '王小虎',
          url: '上海',
          isOnline: '',
          isEnd: ''
        }],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一个月',
            onClick(picker) {
              const endTime = new Date()
              const startTime = new Date()

              // start.setTime(startTime.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [startTime, endTime])
            }
          }, {
            // text: '最近一个月',
            onClick(picker) {
              const endTime = new Date()
              const startTime = new Date()
              start.setTime(startTime.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [startTime, endTime])
            }
          }, {
            // text: '最近三个月',
            onClick(picker) {
              const endTime = new Date()
              const startTime = new Date()
              start.setTime(startTime.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [startTime, endTime])
            }
          }]
        },
        value7: ''
      }
    },
    created() {
      Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        customClass: 'long-loading'
      }).close()
      this.initData()
    },
    methods: {
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
      /*
       * rowClass 
       */
      rowClass({
        row,
        rowIndex
      }) {
        return 'cursor:pointer;height:60px'
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
        this.initData(val)
      },
      // 点击筛选
      screen() {
        this.screenData.startTime = this.formData.startTime
        this.screenData.endTime = this.formData.endTime
        SearchOfflineIndexConference(this.screenData).then(res => {

          this.tableData4 = res.data
        }).catch(function (error) {})
      },
      /**
       * 预览
       * @param fileName 附件地址
       */
      fnPreviewPdf(fileName) {
        if (fileName) {
          window.open(url.download + '?fileName=' + fileName, '_blank')
          window.close()
        }
      },
      dialogAddPage(val) {
        onlinepage(val).then(res => {

        }).catch(function (error) {

        })
      },
      // 点击搜索
      search() {
        this.searchData.conferenceName = this.formData.conferenceName
        SearchOfflineIndexConference(this.searchData).then(res => {
          this.tableData4 = res.data
          this.tableData4.forEach((item, index, arr) => {
            if (item.isEnd == '0') {
              this.tableData4[index].isEnd = '已确认'
            } else {
              this.tableData4[index].isEnd = ''
            }

          })
        }).catch(function (error) {

        })
      },
      // 点击查看按钮进入详情页面
      seeDetail(row) {
        this.$router.push({
          name: '线下会议详情',
          params: {
            id: row.id
          }
        })
      },
      // 点击编辑掉查看接口
      edit(row) {

      },
      initData(val) {
        launchonlinindexconference(val).then(res => {
          this.tableData4 = res.data.conference

          this.tableData4.forEach((item, index, arr) => {
            if (item.isEnd == '0') {
              this.tableData4[index].isEnd = '已确认'
            } else {
              this.tableData4[index].isEnd = ''
            }

          })

          this.conferenceCount = res.data.conferenceCount
        })
      },
      addConference() {
        this.$router.push({
          path: '/add'
        })
      }
    }
  }

</script>
