<template>
<div id="header" class="header">
  <el-row>

    <el-col :span="4">
        <el-button  type="text"><img src="@/assets/logo.png" alt="" @click="ToLogin" height="40px"></el-button>
    </el-col>

    <el-col :span="3" :offset="17">
      
        <el-button type="plain" @click="ToIndex">
          <i class="el-icon-user el-icon--right"></i>
          账户管理
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </el-button>
      
    </el-col>

  </el-row>
  <el-divider></el-divider>
</div>
</template>

<style>
  .header {
    margin-left: 120px;
    margin-right: 120px;
  }
  .el-select{
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
export default {
  name: 'BlogHeader',
  data() {
    return {
      input: '',
      select: ''
    }
  },
	methods:{
		ToIndex() {
			this.$router.push(
				'/index'
			)
		},
		ToLogin() {
			this.$router.replace( {
				path: '/login'
			})
		},
	}
}
</script>