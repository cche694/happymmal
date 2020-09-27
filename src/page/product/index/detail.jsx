import React,{Component} from 'react'
import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.jsx'
import './category-selector.scss'
import './save.scss'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
const _product = new Product()
const _mm = new MUtil()

class ProductDetail extends Component {
	constructor(props){
		super(props)
		console.log(this.props.match.params.pid)
		this.state={
			id:this.props.match.params.pid,
			parentCategoryId:0,
			categoryId:0,
			subImages:[],
			detail:'',
			name:'',
			subtitle:'',
			price:'',
			stock:'',
			status:1 ,//商品状态1 在售,
		}
	}
	componentDidMount(){
		this.loadProduct()
	}
	loadProduct(){
		//通过id过来的数据
		if(this.state.id){
			_product.getProduct(this.state.id).then(res=>{
				console.log(res)
				// 防止subimage为空的情况
				if(res.subImages){
					let subImages=res.subImages.split(',')
						res.subImages=subImages.map(imgUri=>{
							return 	{
								url:res.imageHost+imgUri,
								uri:res.uri
										}
						})
				}else{
					res.subImages=[]
				}														
				this.setState(res)
			},errMsg=>{
				_mm.errorTips(errMsg)
			})
		}
	}
	//一二级品类
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title='商品详情'/>
				<div className="form-horizontal">
					  <div className="form-group">
					    <label htmlFor="inputEmail3" className="col-md-2 control-label">商品名称</label>
					    <div className="col-md-5">
                            <p className="from-control">{this.state.name}</p>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword3" className="col-md-2 control-label">商品描述</label>
					    <div className="col-md-5">
                        <p className="from-control">{this.state.subtitle}</p>
					    </div>
					  </div>
					  {/* 选择品类组件 */}
					  <CategorySelector
                      readOnly
					  categoryId={this.state.categoryId}
					  parentCategoryId={this.state.parentCategoryId} 
					  />
					  <div className="form-group">
					    <label htmlFor="inputPassword3" className="col-md-2 control-label">商品价格</label>
					    <div className="col-md-3">
						    <div className="input-group">
								  <input type="number" 
								  className="form-control" 
                                  value={this.state.price}
                                  readOnly
								 />
								  <span className="input-group-addon" id="basic-addon2">元</span>
							</div>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword3" className="col-md-2 control-label">商品库存</label>
					    <div className="col-md-3">
						    <div className="input-group">
								  <input type="text" 
								  className="form-control" 
                                  value={this.state.stock}
                                  readOnly
                                  />
								  <span className="input-group-addon" id="basic-addon2">个</span>
							</div>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword3" className="col-md-2 control-label">商品图片</label>
					    <div className="col-md-2">
						    {this.state.subImages.length?(this.state.subImages.map((item,index)=>{
						    	return (
						    		<div className="img-wraper" key={index}>
										<img className='img' src={item.url} />
					    			</div>
						    		)
						    })):<div className='textwrapper'>暂无图片</div>}
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="inputPassword3" className="col-md-2 control-label">富文本编辑detail</label>
					    <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>    
					    </div>
					  </div>
					</div>
			</div>
			
			)
	}
}
export default ProductDetail