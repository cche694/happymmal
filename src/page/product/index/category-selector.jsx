import React,{ Component } from 'react'
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new Product() 

class CategorySelector extends Component {
	constructor(props){
		super(props)
		this.state={
			firstCategoryList:[],
			firstCategoryId:0,
			secondCategoryList:[],
			secondCategoryId:0
		}
	}
	componentWillReceiveProps(nextPorps){
		console.log(nextPorps)
		console.log(this.props.categoryId)
		let categoryIdChange =this.props.categoryId !== nextPorps.categoryId
		let parentCategoryIdChange =this.props.parentCategoryId !== nextPorps.parentCategoryId
		if(!categoryIdChange&&!parentCategoryIdChange){
			return;
		}
		// 假如只有一级品类
		if(nextPorps.parentCategoryId === 0){
			this.setState({
				firstCategoryId:nextPorps.categoryId,
				secondCategoryId:0
			})
		}
		// 有两级品类
		else{
			this.setState({
				firstCategoryId:nextPorps.parentCategoryId,
				secondCategoryId:nextPorps.categoryId
			},()=>{
				parentCategoryIdChange&&this.loadSecondCategory()
			})
		}
		    
	}
	componentDidMount(){
		this.loadFirstCategoryList()
	}
	loadFirstCategoryList(){
		_product.getCategoryList().then(res=>{
			this.setState({
				firstCategoryList:res
			})
		},(errMsg)=>{
			_mm.errorTips(errMsg)
		})
	}
	loadSecondCategory(){
		_product.getCategoryList(this.state.firstCategoryId).then(res=>{
			this.setState({
				secondCategoryList:res
			})
		},(errMsg)=>{
			_mm.errorTips(errMsg)
		})
	}
	onfirstCategoryChange(e){
		if(this.props.readOnly){
			return
		}
		let newValue=e.target.value||0
		this.setState({
			firstCategoryId:newValue,
			secondCategoryId:0,
			secondCategoryList:[]
		},()=>{
			this.loadSecondCategory()
			this.onPropsCategoryChange()
		})
	}
	onsecondCategoryChange(e){
		if(this.props.readOnly){
			return
		}
		let newValue=e.target.value||0
		this.setState({
			secondCategoryId:newValue
		},()=>{
			this.onPropsCategoryChange()
		})
	}
	onPropsCategoryChange(){
			let categorychangeble=typeof this.props.onCategoryChange==='function'
		if(this.state.secondCategoryId){
			categorychangeble&&this.props.onCategoryChange(this.state.firstCategoryId,this.state.secondCategoryId)
		}else{
			categorychangeble&& this.props.onCategoryChange(0,this.state.firstCategoryId)
		}
	}
	render(){
		return(
			<div className="form-group">
			    <label className="col-md-2 control-label">所属分类</label>
			    <div className="col-md-5">
			      <select 
			      type="text" 
			      className="form-control cat-select" 
				  placeholder='请输入商品描述'
				  value={this.state.firstCategoryId}
				  readOnly={this.props.readOnly}
			      onChange={(e)=>{this.onfirstCategoryChange(e)}} >
					<option >请选择一级分类</option>
					{
						this.state.firstCategoryList.map((category,index)=>{
							return <option value={category.id} key={index}>{category.name}</option>
						})
					}
			      </select>
			      { this.state.secondCategoryList.length >0 ?
					  (<select type="text"
					  readOnly={this.props.readOnly}
			      		className="form-control cat-select" 
						  placeholder='请输入商品描述'
						  value={this.state.secondCategoryId}
			      		onChange={e=>this.onsecondCategoryChange(e)} >
						<option>请选择二级分类</option>
						{
							this.state.secondCategoryList.map((category,index)=>{
								return <option value={category.id} key={index}>{category.name}</option>
							})
						}
				      </select>):null
			      }
			      
			    </div>
			  </div>
			)
	}
}
export default CategorySelector