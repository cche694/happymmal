import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'

class TopNav extends Component{
	constructor(props){
		super(props)
        this.Logout=this.Logout.bind(this)
	}
    //退出登录
    Logout(){
            console.log('退出登录')
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
                        <span className="admin-name">欢迎,admin xxx</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a href="#" onClick={this.Logout}>
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