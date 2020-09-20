import React,{ Component,Fragment} from 'react'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
const _mm = new MUtil()
const _user = new User()
import './index.scss'


class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			username:'',
			password:'',
			redirect:_mm.getUrlParam('redirect') ||'/',
		}
		this.onInputChange=this.onInputChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)
		this.onKeyUp=this.onKeyUp.bind(this)

	}
	componentWillMount(){
		document.title='用户登录----HAPPYMMAL'
		
	}
	onKeyUp(e){
		if(e.keyCode==13){
			this.onSubmit()
		}
	}
	onInputChange(e){
		let inputValue=e.target.value
		let inputName=e.target.name
		this.setState({
			[inputName]:inputValue,
		})
	}
	onSubmit(e){
		let loginInfo={
			username:this.state.username,
			password:this.state.password
		},
		//cheack user info before submit to back-end
		checkResult=_user.checkUserInfo(loginInfo)
		if(checkResult.status==true){
			//submit
				_user.login(loginInfo).then(res=>{
					// 用户登录请求成功
					
						_mm.setStorage('userInfo', res )
						this.props.history.push(this.state.redirect)
					},(errMsg)=>{
						_mm.errorTips(errMsg)
					});

		}else{
				_mm.errorTips(checkResult.msg)
		}	
	}
	render(){
		return(
			<div className="col-md-4 col-md-offset-4">
				<div className="panel panel-default login-panel">
					  <div className="panel-heading login-heading col-md-offset-4 col-sm-offset-4 col-lg-offset-4">
					    欢迎登录--MMALL管理系统
					  </div>
					  <div className="panel-body">
					  <div>
							  <div className="form-group">
							    <label >Username</label>
							    <input type="username" 
							    className="form-control" 
							    placeholder="Please input username" 
								name='username'
							    onChange={this.onInputChange}
							    onKeyUp={this.onKeyUp}/>
							  </div>
							  <div className="form-group">
							    <label>Password</label>
							    <input 
							    type="password" 
							    className="form-control"  
							    placeholder="Please input password"
							    name='password'
							    onChange={this.onInputChange}
							    onKeyUp={this.onKeyUp}/>
							  </div>
							  <button className="btn btn-primary btn-block btn-lg" onClick={this.onSubmit}>登录</button>
						</div>
					     
					  </div>
				</div>
			</div>
			)
	}
}
export default Login 