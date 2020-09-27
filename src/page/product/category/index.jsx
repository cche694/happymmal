import React, { Component } from "react";
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from "util/mm.jsx";
import TableList from "util/table-list/index.jsx";
import Product from "service/product-service.jsx"
import { Link } from "react-router-dom";
const _mm = new MUtil();
const _product =new Product()

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      parentCategoryId:this.props.match.params.categoryid||0,
      pageNum: 1,
    };
   
  }
  componentDidMount() {
    this.loadCategoryList();
  }
  componentDidUpdate(prevProps,prevState){
      let oldPath = prevProps.location.pathname
      let newPath=this.props.location.pathname
      let newId = this.props.match.params.categoryid
      console.log(oldPath)
      console.log(newPath)
      if(oldPath!==newPath){
          this.setState({
            parentCategoryId:newId
          },()=>{
              this.loadCategoryList()
          })
      }
  }

  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(
      (res) => {
          console.log(res)
        this.setState({
            list:res
        });
      },
      (errorMsg) => {
        this.setState({
          list: [],
        });
        _mm.errorTips();
      }
    );
  }
  onUpdateName(categoryid,categoryname){
    //   console.log(categoryid)
   let Newcategoryname=window.prompt('请输入新的品类名',categoryname)
      let categoryStatus={
          categoryId:categoryid,
          categoryName:Newcategoryname,
      }
   _product.setCategoryName(categoryStatus).then(res=>{
            _mm.successTips(res)
            this.loadCategoryList()
   },errMsg=>{
            _mm.errorTips(errMsg)
   })
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="品类管理" >
            {/* 新增品类按钮 */}
        <div className="page-header-right">
            <Link to='/product-category/add'
            className='btn btn-primary'>
            <i className='fa fa-plus'></i>
            新增品类</Link>
        </div>
        </PageTitle>
        <div className='row'>
            <div className="col-md-12">
                <p>当前商品分类ID:{this.state.parentCategoryId}</p>
            </div>
        </div>
        <TableList tableHead={["品类ID", "品类名称", "操作"]}>
          {this.state.list.map((category, index) => {
            return (
              <tr key={index}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    <a className='opera'
                    onClick={()=>{this.onUpdateName(category.id,category.name)}}>修改名称</a>
                    {category.parentId===0?
                     <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>:null
                    }
                   
                </td>
              </tr>
            );
          })}
        </TableList>
      </div>
    );
  }
}
export default CategoryList;
