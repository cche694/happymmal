import React, { Component } from "react";
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";
import "./category-selector.scss";
import FileUploader from "util/file-uploader/index.jsx";
import "./save.scss";
import RichEditor from "util/rich-editor/index.jsx";
import MUtil from "util/mm.jsx";
import Product from "service/product-service.jsx";
const _product = new Product();
const _mm = new MUtil();

class ProductSave extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.pid);
    this.state = {
      id: this.props.match.params.pid,
      parentCategoryId: 0,
      categoryId: 0,
      subImages: [],
      detail: "",
      name: "",
      subtitle: "",
      price: "",
      stock: "",
      status: 1, //商品状态1 在售,
    };
  }
  componentDidMount() {
    this.loadProduct();
  }
  loadProduct() {
    //通过id过来的数据
    if (this.state.id) {
      _product.getProduct(this.state.id).then(
        (res) => {
          console.log(res.subImages);
          if (!res.subImages) {
            res.subImages = "";
          }
          let images = res.subImages.split(",");
          res.subImages = images.map((imgUri) => {
            return {
              uri: imgUri,
              url: res.imageHost + imgUri,
            };
          });
          res.defaultDetail = res.detail;
          this.setState(res);
        },
        (errMsg) => {
          _mm.errorTips(errMsg);
        }
      );
    }
  }
  //一二级品类
  onCategoryChange(parentCategoryId, categoryId) {
    console.log("parentCategoryId: " + parentCategoryId);
    console.log("categoryId: " + categoryId);
    this.setState({
      parentCategoryId: parentCategoryId,
      categoryId: categoryId,
    });
  }
  onUploadSuccess(res) {
    console.log(res);
    this.state.subImages.push(res);
    let newimageList = this.state.subImages;
    this.setState(
      {
        subImages: newimageList,
      },
      () => {
        console.log(this.state.subImages);
      }
    );
  }
  onUploadError(err) {
    _mm.errorTips(err);
  }
  //小图片删除
  onImageDelete(e) {
    console.log(e.target.attributes.index.value);
    let index = e.target.attributes.index.value;
    this.state.subImages.splice(index, 1);
    let newList = this.state.subImages;
    this.setState({
      subImages: newList,
    });
  }
  //富文本改变
  onDetailValueChange(value) {
    this.setState({
      detail: value,
    });
  }
  //简单字段改变
  onValueChange(e) {
    let name = e.target.name;
    console.log(typeof e.target.value);
    this.setState(
      {
        [name]: e.target.value,
      },
      () => {
        console.log(name + ":" + this.state[name]);
      }
    );
  }
  getSubImagesString() {
    return this.state.subImages.map((image) => image.uri).join(",");
  }
  onSubmit(e) {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      subImages: this.getSubImagesString() || "",
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status,
    };
    if (this.state.id) {
      product.id = this.state.id;
    }
    let productCheckResult = _product.checkProduct(product);
    if (productCheckResult.status) {
      _product.saveProduct(product).then(
        (res) => {
          _mm.successTips(res);
          this.props.history.push("/product/index");
        },
        (errMsg) => {
          _mm.errorTips(err);
        }
      );
    } else {
      _mm.errorTips(productCheckResult.msg);
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        {this.state.id?<PageTitle title="编辑商品" />:<PageTitle title="添加商品" /> }
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-md-2 control-label">
              商品名称
            </label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品名称"
                name="name"
                value={this.state.name}
                onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-md-2 control-label">
              商品描述
            </label>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="请输入商品描述"
                value={this.state.subtitle}
                name="subtitle"
                onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          {/* 选择品类组件 */}
          <CategorySelector
            categoryId={this.state.categoryId}
            parentCategoryId={this.state.parentCategoryId}
            onCategoryChange={(parentCategoryId, categoryId) =>
              this.onCategoryChange(parentCategoryId, categoryId)
            }
          />
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-md-2 control-label">
              商品价格
            </label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入价格"
                  name="price"
                  value={this.state.price}
                  onChange={(e) => this.onValueChange(e)}
                />
                <span className="input-group-addon" id="basic-addon2">
                  元
                </span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-md-2 control-label">
              商品库存
            </label>
            <div className="col-md-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="请输入库存"
                  aria-describedby="basic-addon2"
                  name="stock"
                  value={this.state.stock}
                  onChange={(e) => this.onValueChange(e)}
                />
                <span className="input-group-addon" id="basic-addon2">
                  个
                </span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-md-2 control-label">
              商品图片
            </label>
            <div className="col-md-2">
              {this.state.subImages.length ? (
                this.state.subImages.map((item, index) => {
                  return (
                    <div className="img-wraper" key={index}>
                      <img className="img" src={item.url} />
                      <i
                        className="fa fa-close"
                        index={index}
                        onClick={(e) => this.onImageDelete(e)}
                      ></i>
                    </div>
                  );
                })
              ) : (
                <div className="textwrapper">请添加图片</div>
              )}
            </div>

            {/*图片上传组件*/}
            <div className="col-md-10 col-md-offset-2">
              <FileUploader
                onUploadSuccess={(res) => {
                  this.onUploadSuccess(res);
                }}
                onUploadError={(err) => {
                  this.onUploadError(err);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-md-2 control-label">
              富文本编辑detail
            </label>
            <div className="col-md-10">
              {/* 富文本组件 */}
              <RichEditor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={(value) => {
                  this.onDetailValueChange(value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  this.onSubmit(e);
                }}
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// categoryId=1
// name=三星洗衣机
// subtitle=三星大促销
// mainImage=sss.jpg
// subImages=test.jpg
// detail=detailtext
// price=1000
// stock=100
// status=1&id=3
export default ProductSave;
