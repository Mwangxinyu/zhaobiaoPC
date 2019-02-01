<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  gethistorjury,getToken
} from '@/api/public'
export default {
  name: 'mainSystemLogin',
  created () {
    var that = this
    if (this.$route.params.pageType === 'index' || this.$route.params.pageType === 'commission' || this.$route.params.pageType === 'notice') {
      gethistorjury().then(data => {
        switch (that.$route.params.pageType) {
          case 'index': that.$router.push('/index'); break
          case 'notice': that.$router.push('/noticDetail/' + that.$route.query.id); break
          case 'commission': that.$router.push('/commissionDetail/' + that.$route.query.id); break
        }
      })
    } else {
      getToken({
        code: this.$route.query.code,
        redirect_uri: window.location.origin +
             '/mainSystemLogin/' + JSON.stringify({
               path: JSON.parse(this.$route.params.pageType).path,
               id: JSON.parse(this.$route.params.pageType).id,
               getToken: JSON.parse(this.$route.params.pageType).getToken})
      }).then(data => {
        if (data.code === 0) { // 代办通知带id跳转问题（暂未开发）
          localStorage.setItem('roleType',data.data.roleType)
          var pageType = JSON.parse(that.$route.params.pageType)
          switch (pageType.path) {
            case 'index': that.$router.push('/index'); break
            case 'notice': that.$router.push('/noticDetail/' + pageType.id); break
            case 'commission': that.$router.push('/commissionDetail/' + pageType.id); break
          }
        }
      })
    }
  }
}
</script>
