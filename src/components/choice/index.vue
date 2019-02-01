<template>
  <div>
    <!-- 对方单位弹窗 -->
    <el-dialog :modal="false" :visible.sync="dialogSecondUnit" width="70%" top="1%">
      <div slot="title">人员查询</div>
      <div>
        <el-form label-width="100px">
          <el-row >
            <el-col :span="11" >
              <el-form-item label="人数:" >
                <el-input v-model="OtherUnit.suppliercode" size="small"/>
              </el-form-item>
            </el-col>
            <el-col :span="11" >
              <el-form-item label="姓名:" >
                <el-input v-model="OtherUnit.supplierGroup" size="small" placeholder="请输入"/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-top: 4px; margin-left: 10px;" >
              <el-button size="small" icon="el-icon-search" type="primary" @click="searchOtherUnit()">搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-row style="padding-top:1%">
          <el-col :span="11" >
            <el-table
              :cell-style="({'cursor':'pointer'})"
              :data= "unitlist"
              :header-cell-style="{background:'#f3f3f3', 'text-align': 'center', color: '#666',fontSize:'13px',height:'35px',border:'0.5px solid #e5e5e5',padding:'6px 0',fontWeight:'500'}"
              highlight-current-row
              border
              height="400px"
              size="small"
              @row-click="contractToRight($event,'click')"
              @row-dblclick="contractToRight($event,'dbClick')">
              <el-table-column align="center" prop="suppliername" show-overflow-tooltip label="姓名" min-width="33%"/>
              <el-table-column prop="suppliermastertype" align="center" show-overflow-tooltip label="分组" min-width="33%"/>
            </el-table>
            <!-- 分页 -->
            <div >
              <el-pagination
                :page-sizes="[20]"
                :page-size="OtherUnit.pageSize"
                :pager-count="5"
                :total="otherTotal"
                popper-class="demo"
                small
                class="paginate"
                background
                layout="total, prev, pager, next"
                @current-change="searchOtherUnit"/>
            </div>
          </el-col>
          <el-col :span="2" class="transferButton">
            <div> <el-button type="primary" icon="el-icon-d-arrow-right" circle @click ="contractToRight('','transferToRight')"/> </div>
            <div><el-button style="margin-left: 1px;margin-top: 14%;" type="primary" icon="el-icon-d-arrow-left" circle @click ="contractToLeft('','transferToLeft')"/></div>
          </el-col>
          <el-col :span="11" >
            <el-table
              :cell-style="({'cursor':'pointer'})"
              :data = "copyNewContracts"
              :header-cell-style="{background:'#f3f3f3', 'text-align': 'center', color: '#666',fontSize:'13px',height:'35px',border:'0.5px solid #e5e5e5',padding:'6px 0',fontWeight:'500'}"
              highlight-current-row
              border
              height="450px"
              size="small"
              @row-dblclick="contractToLeft($event,'dbClick')"
              @row-click="contractToLeft($event,'click')">
              <el-table-column prop="suppliername" align="center" show-overflow-tooltip label="姓名" min-width="30%"/>
              <el-table-column prop="suppliermastertype" align="center" show-overflow-tooltip label="分组" min-width="33%"/>
            </el-table>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" style="margin-left:84%">
          <el-button type="primary" size="small" @click="unitSelection()">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <button @click="aa">aa</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      unitlist: [],
      payee: [],
      approve: false,
      OtherUnit: {
        contractid: this.$route.params.id,
        suppliercode: '',
        pageNum: 1,
        pageSize: 20,
        suppliername: ''
      },
      otherTotal: 0,
      theOtherIndex: '',
      ourIndex: '',
      copyNewContracts: [],
      companyid: [],
      dialogUnit: false,
      dialogSecondUnit: false,

      total: 0,
      dept: []
    }
  },
  computed: {

  },
  created() {

  },
  methods: {
    aa() {
      this.dialogSecondUnit = true
    },
    // 选择页码
    goPage(val) {
      this.OtherUnit.pageNum = val // 页数
      this.searchOtherUnit()
    },
    goDetails(id) {
      if (this.dialogUnit) {
        window.open(
          window.origin +
            config.EVENT_ROUTE_PARAMETER +
            '/#/contract/myunits/' +
            id,
          '_blank'
        )
      } else {
        window.open(
          window.origin +
            config.EVENT_ROUTE_PARAMETER +
            '/#/contract/adverseunits/' +
            id,
          '_blank'
        )
      }
    },
    // 乙方单位查询
    searchOtherUnit(val) {
      if (val) {
        this.OtherUnit.pageNum = val
      }
      this.SelectTmSupplierByMasterType(this.OtherUnit).then(data => {
        this.otherTotal = Number(data.data.total)
        this.unitlist = data.data.list
      })
    },
    // 选择对应乙方单位穿梭到右面
    contractToRight(vel, type) {
      if (type === 'click') {
        this.unitlist.forEach(data => {
          data.checked = false
        })
        vel.checked = true
      } else {
        if (type === 'dbClick') {
          vel.checked = true
        }
        this.unitlist.forEach((data, index) => {
          if (data.checked === true) {
            data.checked = false
            if (
              this.newChangeDetails.contractSubjectChangeContractVo
                .contractpropertydesc == 'ZJHT'
            ) {
              if (this.copyNewContracts.length >= 2) {
                this.$message.error('对方单位最多只能选择两个')
              } else {
                this.copyNewContracts.push(data)
                this.unitlist.splice(index, 1)
              }
            } else {
              if (this.copyNewContracts.length >= 1) {
                this.$message.error('对方单位最多只能选择一个')
              } else {
                this.copyNewContracts.push(data)
                this.unitlist.splice(index, 1)
              }
            }
          }
        })
      }
    },
    // 选择单位穿梭到左边
    contractToLeft(vel, type) {
      if (type === 'click') {
        this.copyNewContracts.forEach(data => {
          data.checked = false
        })
        vel.checked = true
      } else {
        if (type === 'dbClick') {
          vel.checked = true
        }
        this.copyNewContracts.forEach((data, index) => {
          if (data.checked === true) {
            data.checked = false
            this.unitlist.push(data)
            this.copyNewContracts.splice(index, 1)
          }
        })
      }
    },
    // 确定已经选择的对方单位
    unitSelection() {

    }
  }
}
</script>
<style scoped>
.fontWeight >>> .el-input.is-disabled .el-input__inner {
  font-weight: bold;
}
.dev_show_form {
  padding-top: 8px;
  padding-bottom: 0;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.long-tabs-content >>> .cell {
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

.contract-bgc >>> .el-tabs__nav-wrap {
  padding-left: 15px;
}

.contract-bgc >>> .el-tabs__active-bar {
  margin-left: 5px;
}

.contract-bgc >>> .el-tabs__nav-wrap {
  padding-left: 15px;
}

.contract-bgc >>> .el-tabs__active-bar {
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

.dev_show_table >>> .el-table__footer {
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
.headsearch >>> .el-form-item__content {
  display: inline-block;
  line-height: 40px;
  vertical-align: middle;
}
.modialog >>> .el-dialog {
  margin-left: 16%;
}
.contract-form >>> .el-input__inner {
  width: 200px;
}
.targetgroup >>> .el-radio {
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

.bigger >>> .el-input--small .el-input__inner {
  border: none;
  background-color: transparent;
  margin-left: -10px;
}

.readStyle >>> .el-input--small .el-input__inner {
  border: none;
  width: 117%;
  height: 35px;
  line-height: 35px;
  margin-left: -10px;
}

.readStyle >>> .el-input-group__append {
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
  .datastyle>>>.el-input__inner{
    padding-right: 3px;
  }
</style>
