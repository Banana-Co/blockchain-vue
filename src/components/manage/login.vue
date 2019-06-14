<template>
	<div class="wrap">
		<div class="grid-content"><br/><br/><br/><br/><br/><br/><br/></div>
		<center><el-card class="login-card">
			<p v-show="showTishi">{{tishi}}</p>
			<el-input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名"></el-input>
			<el-input type="password" v-model="loginInfoVo.password" placeholder="请输入密码"></el-input>
			<br/><el-button type="primary" v-on:click="login">登录</el-button><br/>
			<div >
				<span v-on:click="ToRegister">没有账号？马上注册</span><br/>
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
					password: ''
				},
				responseResult: [],
				showTishi: false,
				tishi: '',
			}
		},
		mounted() {
			/*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
			if (getCookie('username')) {
				this.$router.push(
					'/messageFlow'
				)
			}
		},
		methods: {
			ToMain() {
				this.$router.push(
					'/main'
				)
			},
			ToRegister() {
				this.$router.push(
					'/register'
				)
			},
			login() {
				this.$axios
					.post('/login', {
						username: this.loginInfoVo.username,
						password: this.loginInfoVo.password
					})
					.then(successResponse => {
						this.responseResult = JSON.stringify(successResponse.data)
						if (successResponse.data.code === 200) {
							setCookie('username', this.loginInfoVo.username, 1000 * 60)
								this.$router.push('/messageFlow')
						} else if (successResponse.data.code === 300) {
							this.tishi = "该用户不存在"
							this.showTishi = true
						} else if (successResponse.data.code === 400) {
							this.tishi = "密码输入错误"
							this.showTishi = true
						}
					})
					.catch(failResponse => {})


			}
		}
	}
</script>

<style>
	.wrap {
		text-align: center;
	}

	.login-card{
		width: 320px;
	}

	.wrap.p {
		color: red;
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
	
	span {
		cursor: pointer;
	}

	span:hover {
		color: #41b883;
	}
</style>
