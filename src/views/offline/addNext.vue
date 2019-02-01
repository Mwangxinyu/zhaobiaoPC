<template>
  <div style="background:#fff;padding:20px;">
    <el-form ref="addNextForm" :model="addNextForm">
      <el-form-item label="议题1" style="margin-bottom:20px">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="议题说明" style="margin-bottom:20px">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <el-form-item label="附件名称" style="margin-bottom:20px">
        <el-input style="width:40%"></el-input>
      </el-form-item>
      <div style="margin-top:20px;">
        <el-table border :data="tableData" style="width: 50%">
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
      </div>
      <el-form-item label="" style="margin-top:30px">
        <!-- <el-button>保存</el-button> -->
        <el-button>完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        addNextForm: {
           id:'',
           name:'',
          tableData: [{
            option: '2016-05-02',
            content: '王小虎',
          }, {
            option: '2016-05-04',
            content: '王小虎',
          }, {
            option: '2016-05-01',
            content: '王小虎',
          }, {
            option: '2016-05-03',
            content: '王小虎',
          }],
         
        },

      }
    },
    created(){
    }
  }

</script>
