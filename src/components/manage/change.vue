<template>
	
	<div class="wrap">
		<center><el-card class="box-card">
			<p v-show="showTishi">{{tishi}}</p>
			<h3>用户名: {{name}}</h3>
			<el-input type="password" v-model="loginInfoVo.password0" placeholder="请输入旧密码"></el-input>
			<el-input type="password" v-model="loginInfoVo.password1" placeholder="请输入新密码"></el-input>
			<el-input type="password" v-model="loginInfoVo.password2" placeholder="请确认新密码"></el-input>
			<el-button plain @click="change">修改密码</el-button>
			<div >
				<br/><span @click="$router.back(-1)">返回</span>
			</div>
			
		</el-card></center>
	</div>
</template>

<script>
	import {
		setCookie,
		getCookie
	} from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				loginInfoVo: {
					username: '',
					password0: '',
					password1: '',
					password2: '',
				},
				responseResult: [],
				showTishi: false,
				tishi: '',
				name: '',
			}
		},
		mounted() {
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let uname = getCookie('username')
			this.name = uname
			this.loginInfoVo.username = this.name
		},
		methods: {
			change() {
				if (this.loginInfoVo.password1 != this.loginInfoVo.password2) {
					this.tishi = "两次输入密码不同"
					this.showTishi = true
				} else {
					this.$axios
						.post('/changepswd', {
							username: this.loginInfoVo.username,
							old_password:this.loginInfoVo.password0,
							new_password: this.loginInfoVo.password1,
						})
						.then(successResponse => {
							this.responseResult = JSON.stringify(successResponse.data)
							if (successResponse.data.code === 200) {
								this.$router.push('/index')
							}else if (successResponse.data.code === 400) {
								this.tishi = "密码错误"
								this.showTishi = true
							}
						})
						.catch(failResponse => {})
				}

			}
		}
	}
</script>

<style>
	.wrap {
		text-align: center;
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
