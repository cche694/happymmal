import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
import TableList from 'util/table-list/index.jsx'
import ListSearch from './index-list-search.jsx'
import './index.scss'

const _mm = new MUtil()
const _product = new Product() 


class ProductList extends Component {
	constructor(props){
		super(props)
		this.state = {
	    list:[],
	    pageNum:1,
	    listType:'list'
	  };
	  this.onChange=this.onChange.bind(this)
	}
	componentDidMount(){
		this.loadProductList()
	}

	loadProductList(){
		let listParam={}
		listParam.listType=this.state.listType
		listParam.pageNum=this.state.pageNum
		//如果时搜索的话 需要搜索类型和搜索关键字
		if(this.state.listType==='search'){
			listParam.searchType=this.state.searchType
			listParam.keyword=this.state.searchKeyword
		}
		_product.getProductList(listParam).then(res=>{
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
		 	this.loadProductList()
	    })
	};
	onProductStatusChange(productId,currentStatus){
		console.log(currentStatus)
		let newStatus= currentStatus==1?2:1,
		confirmTips=currentStatus==1?'确定要下架吗':'确定要上架吗';
		if(window.confirm(confirmTips)){
			_product.setProductStatus({
				productId:productId,
				status:newStatus
			}).then(res=>{
				this.loadProductList()
				_mm.successTips(res)
			},errMsg=>{
				_mm.errorTips(errMsg)
			})
		}
	}
	onSearch(searchType,searchKeyword){
		let listType=searchKeyword===''?'list':'search'
		this.setState({
			listType:listType,
			pageNum:1,
			searchType:searchType,
			searchKeyword:searchKeyword
		},()=>{
				this.loadProductList()
		})
			}
	render(){
		let tableHeads=[
			{name:'商品ID',width:'10%'},
			{name:'商品信息',width:'50%'},
			{name:'价格',width:'10%'},
			{name:'状态',width:'10%'},
			{name:'操作',width:'15%'},
		]
		return (
				<div id="page-wrapper">
				<PageTitle title='商品列表' >
					<div className="page-header-right">

						<Link to='/product/save'
						className='btn btn-primary'>
						<i className='fa fa-plus'></i>
						新增商品</Link>
					</div>
				</PageTitle>
				<ListSearch onSearch={(searchType,searchKeyword)=>this.onSearch(searchType,searchKeyword)}/>
					<TableList tableHead={tableHeads}>
							{this.state.list.map((product,index)=>{
							return(
							<tr key={index}>
								<td><p>{product.id}</p></td>
								<td>
								<div><p>{product.name}</p></div>
								<div><p>{product.subtitle}</p></div>
								</td>
								<td><p>${product.price}</p></td>
								<td>
								<p>{product.status==1?'在售':'已下架'}</p>
								<button 
								className='btn-xs btn-warning'
								onClick={(e)=>{this.onProductStatusChange(product.id,product.status)}
								} >{product.status==1?'下架':'上架'}</button>
								</td>
								<td>
									<p><Link to={`/product/detail/${product.id}`}>查看详情</Link></p>
									<p><Link to={`/product/save/${product.id}`}>编辑</Link></p>	
								</td>
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
export default ProductList