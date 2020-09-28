/*
* @Author: Administrator
* @Date:   2020-09-16 17:15:48
* @Last Modified by:   chang__ccge
* @Last Modified time: 2020-09-16 19:03:10
*/
import React,{ Component,Fragment} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom'
import Home from 'page/home/index.jsx'
import Layout from 'component/layout/index.jsx'
import Login from "page/login/index.jsx"
import ErrorPage from 'page/error/index.jsx'
import OrderList from 'page/order/index.jsx'
import OrderDetail from 'page/order/detail.jsx'
import UserList from 'page/user/index.jsx'
import ProductRouter from 'page/product/router.jsx'

class App extends Component {
	render(){
		let LayoutRouter=(
			<Layout>
				<Switch>
					<Route exact path="/" component={ Home }></Route>
					<Route path='/product' component={ProductRouter}></Route>
					<Route path='/product-category' component={ProductRouter}></Route>
					<Route path='/order/index' component={OrderList}></Route>
					<Route path='/order/detail/:id' component={OrderDetail}></Route>
					<Route path="/user/index" component={ UserList }></Route>
					<Redirect exact from='/order' to='/order/index'></Redirect>
					<Redirect exact from='/user' to='/user/index'></Redirect>
					<Route component={ ErrorPage }></Route>
				</Switch>
			</Layout>
			)
		
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/" render={(props)=>{return LayoutRouter}}></Route>
				</Switch>
			</Router>
			)
	}
}


ReactDom.render(<App />,document.getElementById('app'))