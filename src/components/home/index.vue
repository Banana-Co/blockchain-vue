<template>
	<center>
	<el-card class="box-card">
	  <div slot="header" class="clearfix">
	    <center><span>你好!</span></center>
	  </div>
	  <div>
		<span><br/>用户名:<br/>{{name}}</span><br/><br/>
		<span>注册时间:<br/>{{time}}</span>
		</div>
		<br/><br/><br/>
		<div>
		<el-button plain @click="ToChange">更改密码</el-button>
		<el-button plain @click="quit">注销</el-button>
		</div>
		<div >
			<center><el-button type=text @click="$router.back(-1)">返回</el-button></center>
		</div>
		
	</el-card>
	</center>
</template>

<script>
/*引入公共方法*/
import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
    export default{
        data(){
            return{
                name: '',
				time:'',
				VueUserNameVo:{username:''}
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.replace('/')
            }
			this.$axios.post('/time',{
						username: this.name,
					}).then((res)=>{
			    this.time = res.data
			})
        },
        methods:{
			ToMessage() {
				this.$router.push(
					'/messageFlow'
				)
			},
			ToChange() {
				this.$router.push(
					'/change'
				)
			},
            quit(){
                /*删除cookie*/
                delCookie('username')
				this.$router.replace('/')
            }
        }
    }
</script>



<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 360px;
  }
  .wrap {
  	text-align: center;
  }
  
  input {
  	display: block;
  	width: 250px;
  	height: 40px;
  	line-height: 40px;
  	margin: 0 auto;
  	margin-bottom: 10px;
  	outline: none;
  	border: 1px solid #888;
  	padding: 10px;
  	box-sizing: border-box;
  }
  
  p {
  	color: red;
  }
  
  
  span {
  	cursor: pointer;
  }
  
  span:hover {
  	color: #41b883;
  }
</style>