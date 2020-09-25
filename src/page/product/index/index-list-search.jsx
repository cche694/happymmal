import React,{Component} from 'react'
class ListSearch extends Component{
	constructor(props){
		super(props)
		this.state={
			searchType:'productId',
			searchKeyword:'',
		}
	}
	//数据变化的时候
	onValueChange(e){
		let name = e.target.name,
		value=e.target.value.trim()
		this.setState({
			[name]:value
		})
	}
	onSearchKeywordKeyUp(e){
		if(e.keyCode==13){
			this.onSearch()
		}
	}
	//点击按钮的时候
	onSearch(e){
		this.props.onSearch(this.state.searchType,this.state.searchKeyword)
	}
	render(){
		return(
			<div className="row search-wrap">
			<div className="col-md-12">
				<div className="form-inline">
					  <div className="form-group">
					    <select className="form-control select-btn" name='searchType'onChange={(e)=>this.onValueChange(e)} >
							<option value="productId">按商品ID查询</option>
							<option value="productName">按商品名称查询</option>
					    </select>
					  </div>
					  <div className="form-group">
					    <input type="text" className="form-control input-btn" 
					    placeholder="关键词"
					    name='searchKeyword'
					    value={this.state.keyword}
					    onChange={(e)=>this.onValueChange(e)}
					    onKeyUp={(e)=>{this.onSearchKeywordKeyUp(e)}}/>
					  </div>
					  <button type="submit" className="btn btn-default" 
					  onClick={(e)=>{this.onSearch(e)}}>搜索</button>
				</div>
			</div>
		</div>
		)
	}
}
export default ListSearch