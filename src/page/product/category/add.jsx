import React, { Component } from "react";
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from "util/mm.jsx";
import TableList from "util/table-list/index.jsx";
import Product from "service/product-service.jsx";
import { Link } from "react-router-dom";
import './add.scss'
const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorylist: [],
      categoryName: "",
      parentCategoryId: this.props.match.params.categoryid || 0,
    };
  }
  componentDidMount() {
    this.loadCategoryList();
  }
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(
      (res) => {
        this.setState(
          {
            categorylist: res,
          },
          () => {
            console.log(this.state.categorylist);
          }
        );
      },
      (errorMsg) => {
        this.setState({
          list: [],
        });
        _mm.errorTips(errorMsg);
      }
    );
  }
  onValueChange(e) {
    console.log(e.target.name);
    let name = e.target.name;
    this.setState(
      {
        [name]: e.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  }
  onSubmit() {
    let categoryName = this.state.categoryName;
    let data = {
      parentId: this.state.parentId || 0,
      categoryName: categoryName,
    };
    if (data.categoryName) {
      _product.addCategory(data).then(
        (res) => {
          _mm.successTips(res);
          this.props.history.push("/product-category");
        },
        (errMsg) => {
          _mm.errorTips(errMsg);
        }
      );
    } else {
      _mm.errorTips("请输入需要添加的品类名称");
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="新增品类" />
        <div className="row">
          <div className="form-horizontal">
            <div className="form-group">
              <label className="col-md-2 control-label">所属品类</label>
              <div className="col-md-2">
                <select
                  className="form-control"
                  name="parentId"
                  onChange={(e) => {
                    this.onValueChange(e);
                  }}
                >
                  <option>所有/</option>
                  {this.state.categorylist.map((category, index) => {
                    return (
                      <option value={category.id} key={index}>
                        所有/{category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label">品类名称</label>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入名称"
                  name="categoryName"
                  value={this.state.categoryName}
                  onChange={(e) => {
                    this.onValueChange(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => {
                    this.onSubmit();
                  }}
                >
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CategoryAdd;
