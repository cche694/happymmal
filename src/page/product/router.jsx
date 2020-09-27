import React,{ Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'
import CategoryList from 'page/product/category/index.jsx'
import CategoryAdd from 'page/product/category/add.jsx'
class ProductRouter extends Component {
	render(){
		return(
			<Switch>
				<Route path="/product/index" component={ProductList}></Route>
				<Route path="/product/save/:pid?" component={ProductSave}></Route>
				<Route path="/product/detail/:pid?" component={ProductDetail}></Route>
				<Route path='/product-category/index/:categoryid?' component={CategoryList}></Route>
				<Route path='/product-category/add' component={CategoryAdd}></Route>
				<Redirect exact from="/product" to='/product/index'></Redirect>
				<Redirect from='/product-category' to='/product-category/index'></Redirect>
			</Switch>
			)
	}
}
export default ProductRouter