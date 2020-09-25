import React,{Component} from 'react'

class TableList extends Component{
	constructor(props){
		super(props)
		this.state={
			isFirstLoading:true
		}
	}
	componentWillReceiveProps(){
		this.setState({
			isFirstLoading:false
		})	
	}
	render(){
		//数据改变 render重新执行
		let listInfo=this.state.isFirstLoading
			?<tr><td colSpan={this.props.tableHead.length} className='text-center'>正在加载数据~~~</td></tr>
			:<tr><td colSpan={this.props.tableHead.length} className='text-center'>没有找到对应结果~~~</td></tr>;
		let listBody=this.props.children
		let tableBody=listBody.length>0? listBody:listInfo
		let tableHeader=this.props.tableHead.map((header,index)=>{	
				if(typeof header ==='object'){
					return <th key={index} width={header.width}>{header.name}</th>
				}else if(typeof header ==='string'){
					return <th key={index}>{header}</th>
				}
					
		})
		return(
				<div className="row">
					<div className="col-md-12">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								{tableHeader}						
							</tr>
						</thead>
						<tbody>
							{tableBody}			
						</tbody>
					</table>
					</div>
				</div>
			)
	}
}
export default TableList