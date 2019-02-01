<template>
  <div>
    <!--导航tab-->
    <div class="piecerow_main">
      <div class="section_class ">
        <el-tabs v-model="activeName" class="contract-bgc">
          <el-tab-pane name="first">
            <div slot="label">
              <div class="dev1_font">代办</div>
            </div>
            <div class="dev1_border" />
            <div style="background:#fff;padding:10px;border-radius:15px">
              <el-table :data="tableData1" style="width: 100%" :header-row-style="headerClass" :row-style="rowClass"
                :row-class-name="tableRowClassName">
                <el-table-column prop="start_time" label="日期" width="200" />
                <el-table-column prop="conference_name" label="会议名称" show-overflow-tooltip width="200" />
                <el-table-column prop="conference_desc" label="会议说明" show-overflow-tooltip width="333" />
                <el-table-column prop="end_time" label="结束时间" width="200" />
                <el-table-column label="操作" align="center" fixed="right" width="200">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.status === 0" size="mini" type="primary" plain @click="fnClickStatus(scope.row)">进行评标</el-button>
                    <el-button v-if="scope.row.status === 1" size="mini" type="success" plain @click="fnClickStatus(scope.row)">再次评标</el-button>
                    <el-button size="mini" type="danger" @click="deletedaibanortongzhi(scope.row)" plain>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <div style="margin-top:30px;text-align:right">
              <el-pagination :page-size="10" @current-change="dbchangePage" small layout="prev, pager, next" :total="Number(dbcount)">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <div slot="label">
              <div>通知 </div>
            </div>
            <div class="dev1_border" />
            <div style="background:#fff;padding:10px;border-radius:15px">
              <el-table :data="tableData2" style="width: 100%" :header-row-style="headerClass" :row-style="rowClass"
                :row-class-name="tableRowClassName">
                <el-table-column prop="start_time" label="日期" width="200" />
                <el-table-column prop="conference_desc" label="通知内容" show-overflow-tooltip width="400"/>
                <el-table-column label="状态" align="center" fixed="right" width="200">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.status === 2" size="mini" type="primary" plain @click="fnClickStatus(scope.row)">未读</el-button>
                    <el-button v-if="scope.row.status === 3" size="mini" type="info" plain @click="fnClickStatus(scope.row)">已读</el-button>
                    <el-button size="mini" type="danger" @click="deletedaibanortongzhi(scope.row)" plain>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <div style="margin-top:30px;text-align:right">
              <el-pagination :page-size="10" @current-change="tzchangePage" small layout="prev, pager, next" :total="Number(tzcount)">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getJuryInfo,
    getJuryInfoRead,
    deleteDaiBanorTongZhi
  } from '@/api/public'
  export default {
    filters: {
      formatDate(time) {
        if (time) {
          return time.split(' ')[0]
        } else {
          return ''
        }
      }
    },
    data() {
      return {
        dbcount: '',
        tzcount: '',
        activeName: 'first',
        tableData1: [],
        tableData2: []
      }
    },
    computed: {

    },
    created() {
      this.fnInitPageData()
    },
    methods: {
      /*
       *切换通知栏
       */
      tzchange() {},
      /*
       *页代办码改变
       */
      dbchangePage(val) {
        this.fnInitPageData(val)
      },
      /*
       *页代办码改变
       */
      tzchangePage(val) {
        this.fnInitPageData(val)
      },
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
      // 页面数据初始化
      fnInitPageData(val) {
        getJuryInfo(val).then(res => {
          this.dbcount = res.data.done
          this.tableData1 = res.data.doneInfo
        })
        getJuryInfoRead(val).then(res => {
          this.tzcount = res.data.read
          this.tableData2 = res.data.readInfo
        })
      },
      // 点击操作按钮
      fnClickStatus(data) {

        // 评标
        if (data.status === 0 || data.status == 1) {
          this.$router.push({
            name: '投票',
            params: {
              id: data.id
            }
          })
        }
        // 已读 未读 
        else if (data.status === 2) {
          this.$router.push({
            name: '查看详情',
            params: {
              id: data.id
            }
          })
        } else if (data.status === 3) {
          this.$router.push({
            name: '查看详情',
            params: {
              id: data.id
            }
          })
        }
      },
      // 切换tab
      handleClick() {

      },
      /**
       * 删除代办或者通知
       */
      deletedaibanortongzhi(row) {
        deleteDaiBanorTongZhi(row.infoId).then(res => {
          if (res.code == '0') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
             this.fnInitPageData()
          }
        })
      }
    }
  }

</script>
<style>
  .dev1_font {
    margin-left: 10px;
    color: #41549c;
    font-size: 14px;
  }

  .dev1_border {
    background-color: #EEF2F6;
    border: 4px solid #EEF2F6;
  }

  .caption-bgc {
    background-color: white;
    min-height: 500px;
    border-radius: 5px;
  }

</style>
