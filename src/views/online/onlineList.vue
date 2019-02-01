<template>
  <div>
    <div style="background:#fff;padding:10px;border-radius:15px;">
      <el-form :model="form">
        <el-row>
          <el-col :span="6">
            <div v-if="roleType ==='1'">
              <el-form-item>
                <el-button type="primary" plain size="small" round @click="fnClickStartMeeting">发起线上会议</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="">
                <el-input v-model="form.name" placeholder="请输入会议名称" style="width:190px" size="small" />
                <el-button type="primary" plain round style="margin-left:30px;" icon="el-icon-search" size="small"
                  @click="fnClickSearch">搜索</el-button>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div />
          </el-col>

        </el-row>
      </el-form>
    </div>
    <div class="dev1_border" />
    <div style="background:#fff;padding:10px;border-radius:15px">
      <el-table :data="tableData" style="width: 100%" height="400" :header-row-style="headerClass" :row-style="rowClass" :row-class-name="tableRowClassName">
        <el-table-column prop="conference.conferenceName" label="会议名称"/>
        <el-table-column prop="conference.startTime" label="会议发起时间">
          <template slot-scope="scope">
            {{ scope.row.conference.startTime }}
          </template>
        </el-table-column>
        <el-table-column prop="conference.endTime" label="会议结束时间">
          <template slot-scope="scope">
            {{ scope.row.conference.endTime }}
          </template>
        </el-table-column>
        <el-table-column prop="conference.isEnd" label="会议状态">
          <template slot-scope="scope">
            <div v-if="scope.row.conference.isEnd == '1'">
              <span class="voted" style="cursor: pointer;" @click="fnClickJumpToVate(scope.row)">{{ scope.row.voted }}</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span>{{
                scope.row.allVoted }}</span>
            </div>
            <div v-if="scope.row.conference.isEnd == '0'">
              已结束
            </div>
          </template>
        </el-table-column>
        <!-- 如果是空 啥都不显示 如果是url不为空 显示附件两个字 -->
        <el-table-column prop="conference.url" label="会议纪要" width="100">
          <template slot-scope="scope">
            <a v-if="scope.row.conference.url != ''" style="cursor: pointer;" @click="fnClickPreview(scope.row.conference.url)">附件</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="fnClickShowDetail(scope.row)">查看</el-button>
            <el-button v-if="(scope.row.conference.isEnd =='1')&&roleType==='1'" size="mini" type="text" @click="fnClickEndMeeting(scope.row)">结束会议</el-button>
            <el-button v-if="scope.row.conference.isEnd =='0'&&(scope.row.conference.url ==''||scope.row.conference.url ==null)&&roleType==='1'"
              size="mini" type="text" @click="fnClickUploadSummary(scope.row)">上传会议纪要</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:30px;text-align:right">
        <el-pagination :page-size="10" :current-page.sync="currentPage" :total="total" background layout="prev, pager, next"
          @current-change="dialogAddPage" />
      </div>

    </div>
  </div>
</template>
<script>
  import {
    launchOnlinIndexConference,
    onlinepage,
    SearchOnlineIndexConference,
    leaveChair
  } from '@/api/public'
  import url from '@/api/url'
  import {} from 'element-ui'
  import pagination from '@/components/pagination'
  export default {
    filters: {
      formatDate(time) {
        time = time.replace(/\-/g, '\/')
        const date = new Date(time)
        let fmt = 'yyyy-MM-dd hh:mm'
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (const k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
          }
        }
        return fmt
      }
    },
    rounding(value) {
      return value.toFixed(2)
    },
    components: {
      pagination
    },
    data() {
      return {
        form: {
          name: ''
        },
        //普通用户 入参
        ordinary: {
          account: '',
          conferenceId: ''
        },
        roleType: '',
        currentPage: 1,
        total: 0, // 总页数
        limit: 10,
        tableData: [{
          conference: {},
          conferenceName: '',
          startTime: '',
          endTime: '',
          isEnd: '',
          url: ''
        }],
        urlUpload: {
          fileUrl: ''
        }
      }
    },
    created() {
      this.fnNetGetOnlineList()
    },
    mounted() {},
    methods: {
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
        if (rowIndex%2 === 0) {
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
      /**
       * 线上会议管理 列表数据
       */
      fnNetGetOnlineList() {
        const loadingInstance = this.getLoadingInstance()
        launchOnlinIndexConference().then(res => {
          if (res.code === 0) {
            loadingInstance.close()
            this.total = res.data.count
            this.tableData = res.data.conferenceInfo
            this.roleType = String(res.data.roleType)
            res.data.conferenceInfo.forEach(element => {
              // TODO 不知道这是什么 删掉
            })
          }
        }).catch(function (error) {

        })
      },
      /**
       * 搜索
       */
      fnClickSearch() {
        SearchOnlineIndexConference(this.form.name).then(res => {
          this.tableData = res.data
          this.$message({
            message: '搜索成功',
            type: 'success'
          })
        }).catch(function (error) {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        })
      },
      /**
       * TODO 翻页 这个和 搜索 列表 和成一个比较好 待优化
       */
      dialogAddPage(val) {
        onlinepage(val).then(res => {
          this.tableData = res.data.conferenceInfo
        }).catch(function (error) {

        })
      },
      /**
       * 查看 会议详情
       * @param row
       */
      fnClickShowDetail(row) {
        if (this.roleType == '1') {
          this.$router.push({
            name: '线上会议详情页面',
            params: {
              id: row.conference.id
            }
          })
        } else {
          this.ordinary.conferenceId = row.conference.id
          this.$router.push({
            path: '/voteDetail',
            query: {
              votedDetailByUser: this.ordinary
            }
          })
        }

      },
      /**
       * 上传会议纪要
       * @param row
       */
      fnClickUploadSummary(row) {
        this.$router.push({
          name: '上传会议纪要',
          params: {
            id: row.conference.id
          }
        })
      },
      /**
       * 结束会议
       * @param row
       */
      fnClickEndMeeting(row) {
        leaveChair(row.conference.id).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.fnNetGetOnlineList()
          }
        }).catch(function (error) {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
        })
      },
      /**
       * 点击跳转 发起线上会议
       */
      fnClickStartMeeting() {
        this.$router.push({
          path: '/launch'
        })
      },
      /**
       * 点击跳转 投票情况
       * 整体/已投
       */
      fnClickJumpToVate(row) {
        this.$router.push({
          path: '/wholeCast',
          query: {
            id: row.conference.id
          }
        })
      },
      /**
       * 点击附件 预览
       * @param url
       */
      fnClickPreview(fileName) {
        if (fileName) {
          window.open(url.downloadInterface + '?fileName=' + fileName)
          window.close()
        }
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
<style scoped>
  .voted:hover {
    color: blue;
    font-size: 16px
  }

  .el-input--small .el-input__inner {
    border-radius: 26px;

  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
