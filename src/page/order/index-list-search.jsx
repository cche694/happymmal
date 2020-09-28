import React, { Component } from "react";
class ListSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber:''
    };
  }
  //数据变化的时候
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    this.setState({
      [name]: value,
    });
  }
  onSearchKeywordKeyUp(e) {
    if (e.keyCode == 13) {
      this.onSearch();
    }
  }
  //点击按钮的时候
  onSearch(e) {
    this.props.onSearch(this.state.orderNumber);
  }
  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select
                className="form-control select-btn"
              >
                <option >按订单号查询</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-btn"
                placeholder="订单号"
                name="orderNumber"
                value={this.state.keyword}
                onChange={(e) => this.onValueChange(e)}
                onKeyUp={(e) => {
                  this.onSearchKeywordKeyUp(e);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-default"
              onClick={(e) => {
                this.onSearch(e);
              }}
            >
              搜索
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ListSearch;
