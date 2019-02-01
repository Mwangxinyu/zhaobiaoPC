<template>
  <div class="long-pagination-swap">
    <div class="long-pagination-text">
      <!--总条数-->
      <span class="long-pagination__total">共 {{ total }} 条</span>
      <!--每页要显示的条数-->
      <span class="long-pagination-page-sizes">{{ pageSize }}条/页</span>
      <el-pagination
        :small="small"
        :background="background"
        :layout="layout"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
    export default {
      name: 'LongPagination',
      props: {
        currentPage: {
          type: Number
        },
        pageSize: {
          type: Number,
          default: 20
        },
        total: {
          type: [String, Number]
        },
        background: {
          type: [Boolean],
          default: false
        },
        layout: {
          type: [String],
          default: 'prev, pager, next'
        },
        small: {
          type: [Boolean],
          default: false
        }
      },
      data() {
        return {}
      },
      methods: {
        // 每页显示的条数改变时
        handleSizeChange: function(val) {
          this.$emit('sizeChange', val)
        },
        // 当前页改变的时候
        handleCurrentChange: function(pageIndex) {
          this.$emit('current-change', pageIndex)
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .long-pagination-swap{
    padding:0 10px;
  }
  .long-pagination-swap .long-pagination-text{
    display: table;
  }
  .long-pagination__total,.long-pagination-page-sizes{
    display: table-cell;
    vertical-align: middle;
    padding-right: 10px;
    font-weight: 400;
    color: #606266;
    font-size: 13px;
    padding-top: 4px;
  }
</style>
