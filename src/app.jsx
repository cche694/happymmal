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
class App extends Component {
	render(){
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={ Home }></Route>
					</Switch>
				</Layout>
			</Router>
			)
	}
}


ReactDom.render(<App />,document.getElementById('app'))