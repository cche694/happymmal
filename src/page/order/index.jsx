import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from "util/mm.jsx";
import Order from "service/order-service.jsx";
import TableList from "util/table-list/index.jsx";
import ListSearch from "./index-list-search.jsx";

const _mm = new MUtil();
const _order = new Order();

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      listType: "list",
      orderNo:''
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.loadOrderList();
  }

  loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    listParam.orderNo=this.state.orderNo
    if (this.state.listType === "search") {
      listParam.orderNo = this.state.orderNo;
    }
    _order.getOrderList(listParam).then(
      (res) => {
        this.setState(res);
      },
      (errorMsg) => {
        this.setState({
          list: [],
        });
        _mm.errorTips();
      }
    );
  }
  onChange(pageNum) {
    this.setState(
      {
        pageNum: pageNum,
      },
      () => {
        this.loadOrderList();
      }
    );
  }
  onSearch(orderNum) {
    console.log(orderNum)
    let listType = orderNum === "" ? "list" : "search";
    this.setState(
      {
        listType: listType,
        pageNum: 1,
        orderNo: orderNum,
      },
      () => {
        this.loadOrderList();
      }
    );
  }
  render() {
    let tableHeads = ["订单号", "收件人", "订单状态", "订单总价","创建时间", "操作"];
    return (
      <div id="page-wrapper">
        <PageTitle title="订单页面" />
        <ListSearch onSearch={(orderNum) => this.onSearch(orderNum)} />
        <TableList tableHead={tableHeads}>
          {this.state.list.map((order, index) => {
            return (
              <tr key={index}>
                <td>
                  <p>
                    {" "}
                    <Link to={`/order/detail/${order.orderNo}`}>
                      {order.orderNo}
                    </Link>
                  </p>
                </td>
                <td>
                  <div>
                    <p>{order.receiverName}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{order.statusDesc}</p>
                  </div>
                </td>
                <td>
                  <p>${order.payment}</p>
                </td>
                <td>
                  <p>{order.createTime}</p>
                </td>
                <td>
                  <p>
                    <Link to={`/order/detail/${order.orderNo}`}>
                      查看详情
                    </Link>
                  </p>
                </td>
              </tr>
            );
          })}
        </TableList>
        <Pagination
          defaultCurrent={this.state.pageNum}
          onChange={this.onChange}
          total={this.state.total}
        />
      </div>
    );
  }
}
export default OrderList;
