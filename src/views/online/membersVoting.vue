<template>
  <div style="background:#fff;padding:20px">
    <el-form>
      <el-form-item label="会议名称：">
        <el-input style="width:30%;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:30px">
        <el-form-item label="会议说明：">
          <el-input style="width:30%;" :disabled="true"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item style="margin-top:30px;margin-bottom:30px;">
        <el-form-item label="结束时间：">
          <el-input style="width:30%;" :disabled="true"></el-input>
        </el-form-item>
      </el-form-item>
      <hr />
      <el-form-item style="margin-top:30px;margin-bottom:30px;">

        <el-form-item label="议题888：">
          <el-input style="width:30%;" :disabled="true"></el-input>
        </el-form-item>


      </el-form-item>
      <el-form-item style="margin-top:30px;margin-bottom:30px;">
        <el-form-item label="议题说明：">
          <el-input style="width:30%;" :disabled="true"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item style="margin-top:30px;margin-bottom:30px;">
        <el-form-item label="附件名称：">
          <el-input style="width:30%;" :readonly="truereadonly"></el-input>
        </el-form-item>
      </el-form-item>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="option" label="选项" width="180">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="180">
        </el-table-column>
        <el-table-column>
            <!-- 准备放开 -->
          <!-- <template scope="scope" v-if="false">
            <el-radio :label="scope.$index"></el-radio>
          </template> -->
          <!-- <template slot-scope="scope">
            <el-checkbox-group v-model="scope.row.checkbox">
              <el-option v-for="option in scope.row.options" :label="option.name" :value="option.value"></el-option>
            </el-checkbox-group>
          </template> -->
        </el-table-column>
      </el-table>
      <div style="text-align:center;margin-top:30px">
        <el-form-item>
          <el-button style="small">提交</el-button>
        </el-form-item>
      </div>

    </el-form>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }

</script>
