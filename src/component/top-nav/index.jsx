import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'
import MUtil from 'util/mm.jsx'
import  User from 'service/user-service.jsx'
const _user = new User()
const _mm = new MUtil()
class TopNav extends Component{
	constructor(props){
		super(props)
        this.state={
            username:_mm.getStorage('userInfo').username || ''
        }
        this.onLogout=this.onLogout.bind(this)
	}
    //退出登录
    onLogout(){
        _user.logout().then((res)=>{
            _mm.removeStorage('userInfo')
            window.location.href='/login'
        },errMsg=>{
            errorTips(errMsg)
        })
    }
    ShowUsername(){
        if(this.state.username===''){
                            return <span className="admin-name">欢迎,请登录</span>
                        }else{
                            return <span className="admin-name">欢迎,{this.state.username}</span>
        }
    }
	render(){
		return (
			<div className="navbar navbar-default top-navbar" role="navigation">
            <div className="navbar-header">
                <Link to='/' className="navbar-brand" href="index.html"><b>Happy</b>MMALL</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle"  href="javascript:;" >
                        <i className="fa fa-user fa-fw"></i>
                            {this.ShowUsername()}
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a href="#" onClick={this.onLogout}>
                            <i className="fa fa-sign-out fa-fw"></i>退出登录
                            </a>
                        </li>
                    </ul></li> 
            </ul>
        </div>
			)	
	}
}
export default TopNav