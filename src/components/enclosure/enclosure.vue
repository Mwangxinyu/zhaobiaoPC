<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <el-upload class="upload-demo" :on-remove="onremove" :fileType=fileType :on-preview="onpreview" :before-upload="beforeAvatarUpload"
            :file-list="fileList" :on-success="onsuccess" drag :action="upload()" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel/word/pdf文件，按住ctrl多选</div>
          </el-upload>
        </el-col>
        <el-col :span="18"></el-col>
      </el-row>

    </div>

  </div>
</template>
<script>
  import url from '@/api/url'
  export default {
    name: 'enclosure',
    props: {
      callback: Function,
      fileType: Array // [0,1,2] 0检验是否为word 1校验是否为pdf 2校验是否为啥啥啥
    },
    data() {
      return {
        fileList: [

        ],
        arr: []
      }
    },
    methods: {
      /**
       * 上传文件
       */
      upload() {
        return url.uploadInterface
      },

      /**
       * 上传成功的回调
       */
      onsuccess(res, file, fileList) {
        // this.fileList[0].name = res.data[0].fileName
        //  res.data.forEach(element => {
        //      this.fileList.forEach(item=>{
        //          item.name = element.fileName
        //          item.url = element.url

        //      })
        //  });

        //每上传一个附件 就会往arr里面push一个对象
        this.arr.push(res.data[0])
        //对应上name 并赋值  TO DO 对附件进行去重  最后一个会覆盖前一个
        this.fileList = this.arr
        this.arr.forEach(item1 => {
          this.fileList.forEach(item2 => {
            item2.name = item1.fileName
            item2.url = item1.url

          })
        });
        this.callback(this.arr)
      },
      /**
       * beforeAvatarUpload限制上传的格式 和大小 TO DO 还没找到 excel对应的类型 文件大小限制
       */
      beforeAvatarUpload(file) {
        var isword = true
        var isPDF = true 
        this.fileType.forEach(item => {
            if (item === 0) {
                isword = file.type === 'application/msword'
            } else  if (item === 1) {
                isPDF = file.type === 'application/pdf'
            }
        })
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isword && !isPDF &&!isEcxel &&!isEcxel2) {
          this.$message.error('文件格式不对')
        }
        //  if (!isPDF) {
        //   this.$message.error('上传文件只能是 pdf');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isPDF || isword || isEcxel || isEcxel2;
      },
      /**
       * onpreview点击文件列表时已上传的钩子
       */
      onpreview(file) {
        /**
         * word和pdf是查看 excel是下载  TO DO(判断附件是否提交过) 这个功能应该写在子组件里
         */
        if (file.url) {
          window.open(url.downloadInterface + '?fileName=' + file.name)
        }


      },
      /**
       * onremove移除附件
       */
      onremove(file, fileList) {
        this.fileList.splice(this.fileList.indexOf(file), 1)
        console.log(this.fileList)
      }

    },
    created() {
    }
  }

</script>

<style>
  .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 258px;
    height: 135px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

</style>
