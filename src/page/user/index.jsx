import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
import TableList from 'util/table-list/index.jsx'
const _mm = new MUtil()
const _user = new User() 


class UserList extends Component {
	constructor(props){
		super(props)
		this.state = {
	    list:[],
	    pageNum:1,
	  };
	  this.onChange=this.onChange.bind(this)
	}
	componentDidMount(){
		this.loadUserList()
	}
	loadUserList(){
		_user.getUserList(this.state.pageNum).then(res=>{
			this.setState(res)
		},errorMsg=>{
			this.setState({
				list:[],
			})
			_mm.errorTips()
		})
	}
	onChange (pageNum){
	    this.setState({
			pageNum:pageNum
	    },()=>{
		 	this.loadUserList()
	    })
	};
	render(){
		return (
				<div id="page-wrapper">
				<PageTitle title='用户列表' />
					<TableList tableHead={['ID','用户名','邮箱','电话','创建时间']}>
							{this.state.list.map((user,index)=>{
							return(
							<tr key={index}>
								<td>{user.id}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>{new Date(user.createTime).toLocaleString() }</td>
							</tr>
						)
				})}
					</TableList>
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