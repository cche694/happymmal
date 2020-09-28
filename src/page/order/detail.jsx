import React, { Component } from "react";
import PageTitle from "component/page-title/index.jsx";
import MUtil from "util/mm.jsx";
import Order from "service/order-service.jsx";
import TableList from "util/table-list/index.jsx";
import "./detail.scss";
const _mm = new MUtil();
const _order = new Order();

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.id);
    this.state = {
      orderNumber: this.props.match.params.id,
      orderInfo: {},
    };
  }
  componentDidMount() {
    this.loadOrderDetail();
  }
  loadOrderDetail() {
    _order.getOrderDetail(this.state.orderNumber).then(
      (res) => {
        this.setState(
          {
            orderInfo: res,
          },
          () => {
            console.log(this.state);
          }
        );
      },
      (errMsg) => {
        _mm.errorTips(errMsg);
      }
    );
  }
  sendItem() {
    let orderNo=this.state.orderNumber
    _order.sendItemRequest(orderNo).then(
      (res) => {
        _mm.successTips('发货成功');
        loadOrderDetail();
      },
      (errMsg) => {
        _mm.errorTips('发货失败');
      }
    );
  }

  //一二级品类
  render() {
    let receiverInfo = this.state.orderInfo.shippingVo || {};
    let productList = this.state.orderInfo.orderItemVoList || [];
    let tablehead = [
      { name: "商品图片", width: "5%" },
      { name: "商品信息", width: "20%" },
      { name: "单价", width: "20%" },
      { name: "数量", width: "20%" },
      { name: "合计", width: "20%" },
    ];

    console.log(productList);
    return (
      <div id="page-wrapper">
        <PageTitle title="商品详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <p><label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.orderNo}
              </p>
            </div></p>
            
          </div>
          <div className="form-group">
            <p><label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.createTime}
              </p>
            </div></p>
            
          </div>
          <div className="form-group">
            <p>
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {receiverInfo.receiverName}
                {receiverInfo.receiverProvince}
                {receiverInfo.receiverCity}
                {receiverInfo.receiverDistrict}
                {receiverInfo.receiverAddress}
                {receiverInfo.receiverZip}
                {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
              </p>
            </div>
            </p>
          </div>
          <div className="form-group">
            <p>
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {this.state.orderInfo.status === 20 ? (
                  <button
                    onClick={(e) => this.sendItem(e)}
                    className="btn btn-default btn-sm"
                  >
                    发货
                  </button>
                 ) : null}
              </p>
            </div>
            </p>
          </div>
          <div className="form-group">
            <p>
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.paymentTypeDesc}
              </p>
            </div>
            </p>
          </div>
          <div className="form-group">
            <p>
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.payment}
              </p>
            </div>
            </p>
          </div>
          <div className="form-group">
          <p>
            <label className="col-md-2 control-label">订单列表</label>
            <div className="col-md-8">
              <TableList tableHead={tablehead}>
                {productList.map((product, index) => {
                  console.log(product);
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <img
                            className="product-Img"
                            src={
                              this.state.orderInfo.imageHost +
                              product.productImage
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>{product.productName}</p>
                        </div>
                      </td>
                      <td>
                        <p>${product.currentUnitPrice}</p>
                      </td>
                      <td>
                        <p>{product.quantity}</p>
                      </td>
                      <td>
                        <p>${product.totalPrice}</p>
                      </td>
                    </tr>
                  );
                })}
              </TableList>
            </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderDetail;
