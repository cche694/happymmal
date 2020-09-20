import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new MUtil()
const _user = new User() 


class UserList extends Component {
	constructor(props){
		super(props)
		this.state = {
	    list:[],
	    pageNum:1,
	    firstLoading:true
	  };
	  this.onChange=this.onChange.bind(this)
	}
	componentDidMount(){
		this.loadUserList()
	}
	loadUserList(){
		_user.getUserList(this.state.pageNum).then(res=>{
			this.setState(res,()=>{
				this.setState({
					firstLoading:false
				})
			})
		},errorMsg=>{
			this.setState({
				firstLoading:false
			})
			_mm.errorTips()
		})
	}
	onChange (pageNum){
	    this.setState({
			pageNum:pageNum
	    },()=>{
	    	console.log(this.state.pageNum)
	    	this.loadUserList()
	    })
	};
	renderListBody(){
		if(this.state.list.length>0){
			return (
						this.state.list.map((user,index)=>{
							return(
							<tr key={index}>
								<td>{user.id}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>{new Date(user.createTime).toLocaleString() }</td>
							</tr>
							)
				})
			)
		}

		if(this.state.firstLoading===true){
			return (
				<tr><td colSpan='5' className='text-center'>正在加载数据~~~</td></tr>
				)	
		}else{

			return(
					<tr><td colSpan='5' className='text-center'>没有找到对应结果~~~</td></tr>
				)
			
		}
		

	}
	render(){
		return (
				<div id="page-wrapper">
				<PageTitle title='用户列表' />
					<div className="row">
						<div className="col-md-12">
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>用户名</th>
									<th>邮箱</th>
									<th>电话</th>
									<th>注册时间</th>						
								</tr>
							</thead>
							<tbody>
							{this.renderListBody()}								
							</tbody>
						</table>
						</div>
					</div>
					<Pagination
					defaultCurrent={this.state.pageNum}
				      onChange={this.onChange}
				      total={this.state.total}
			        />
				</div>
			)
	}
}
export default UserList