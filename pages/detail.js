import React, { useState, useEffect } from "react";
import { request } from "@/utils/request";
import { getURLQuery } from "@/utils/common";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Magnifier from "@/components/Magnifier";
import { Layout, Spin, InputNumber, Button, Tabs, message } from "antd";
const { TabPane } = Tabs;

// style
import styles from "@/styles/pages/Detail.module.less";

const Detail = ({ data, submenu }) => {
  // 详情数据
  const [skuDetail, setSkuDetail] = useState({
    navigations: [],
    skuImageInfoDTO: {
      detailPictureFile: [],
      mainPictureFile: [],
      slidePictureFile: [],
    },
    skuAttributeGroupDTOList: [],
  });
  // 数量
  const [itemQty, setItemQty] = useState(1);
  // 添加购物车loading
  const [btnLoading, setBtnLoadingStatus] = useState(false);
  // 请求详情页数据接口loading
  const [DTOLoading, setDTOLoadingStatus] = useState(false);
  // 放大镜组件图片数据
  const [magnifierImgs, setMagnifierImgs] = useState([]);

  useEffect(() => {
    const skuId = getURLQuery("skuId");
    const fetcher = async () => {
      setDTOLoadingStatus(true);
      try {
        const res = await request(
          `/api/mainsite-api-service/mainsite/${skuId}/1/sku-detail`,
          "get",
        );
        const { data: skuDetail } = await res;
        setSkuDetail(skuDetail);
        setMagnifierImgs(
          skuDetail.skuImageInfoDTO.slidePictureFile.concat(
            skuDetail.skuImageInfoDTO.mainPictureFile,
          ),
        );
        setDTOLoadingStatus(false);
      } catch (e) {
        console.error(e);
        setDTOLoadingStatus(false);
      }
    };
    fetcher();
  }, []);
  // 数量变化
  const qtyChange = (value) => {
    setItemQty(value);
  };
  // 添加购物车（调用智采添加购物车接口，token从URL获取）
  const addCart = async () => {
    setBtnLoadingStatus(true);
    const token = getURLQuery("token");
    let reqData = {
      skuId: skuDetail.id,
      qty: itemQty,
    };
    if (token) {
      const res = await request(
        `/api/shoppe-api-service/shopping-cart/`,
        "post",
        reqData,
        1,
        { Authorization: "Bearer " + token },
      );
      const { code } = await res;
      if (code == "000000") {
        message.success("添加购物车成功");
      } else {
        message.error("添加购物车失败");
      }
      setBtnLoadingStatus(false);
    } else {
      window.name = location.href;
      location.href = window.localStorage.getItem("Environment") + "/#/login";
    }
  };
  // 立即购买
  const buyNow = () => {
    window.open(
      `${window.localStorage.getItem(
        "Environment",
      )}/#/center/ConfirmOrder/ConfirmOrder?type=website&currentPrice=${
        skuDetail.websitePrice
      }&skuNo=${skuDetail.no}&itemQty=${itemQty}&picture=${
        skuDetail.skuImageInfoDTO.mainPictureFile[0]
      }&skuId=${skuDetail.id}&skuName=${skuDetail.name}`,
    );
  };

  return (
    <Layout>
      <Header
        firstLevelNavigations={data.firstLevelNavigations}
        submenu={submenu}
        subSite={data.navigationColumns}
        visible={false}
      ></Header>
      <Spin spinning={DTOLoading}>
        <div className={styles.detail}>
          <div className={styles.top}>
            <div className={styles.nav}>
              <h3>
                {skuDetail.navigations.length
                  ? skuDetail.navigations[0].name
                  : ""}
              </h3>
            </div>
            <div className={styles.main}>
              <div className={styles.mainImg}>
                <Magnifier pictureFile={magnifierImgs} />
              </div>
              <div className={styles.ctt}>
                <h2>{skuDetail.name}</h2>
                <span>商品编号：{skuDetail.no}</span>
                <div className={styles.price}>
                  <h4>官网价格：</h4>
                  <span>
                    ￥<i>{skuDetail.sellingPrice}</i>/台
                  </span>
                </div>
                <div className={styles.info}>
                  <span>商品品牌：{skuDetail.brandName}</span>
                  <span>商品型号：{skuDetail.primaryAttributeValue}</span>
                </div>
                <div className={styles.buy}>
                  <span>购买数量：</span>
                  <InputNumber
                    size="large"
                    min={1}
                    max={100000}
                    defaultValue={1}
                    onChange={qtyChange}
                  />
                </div>
                <div className={styles.btns}>
                  <Button
                    className={styles.btn}
                    type="primary"
                    size="large"
                    onClick={addCart}
                    loading={btnLoading}
                  >
                    加入购物车
                  </Button>
                  <Button
                    className={styles.btn}
                    type="primary"
                    size="large"
                    danger
                    onClick={buyNow}
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.recommend}>
              <h3>精品推荐</h3>
            </div>
            <div className={styles.skuDetails}>
              <Tabs type="card">
                <TabPane tab="商品介绍" key="1">
                  {skuDetail.skuImageInfoDTO.detailPictureFile.length ? (
                    skuDetail.skuImageInfoDTO.detailPictureFile.map(
                      (i, index) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={index}
                          src={`https://mainsiteprod.66123123.com/image/` + i}
                          alt="1"
                        />
                      ),
                    )
                  ) : (
                    <></>
                  )}
                </TabPane>
                <TabPane tab="规格参数" key="2">
                  <table className={styles.table}>
                    {skuDetail.skuAttributeGroupDTOList.map((item, i) => (
                      <div key={i}>
                        <tr className={styles.table_tittle}>
                          {item.attributeGroupName}
                        </tr>
                        {item.skuAttributeList &&
                          item.skuAttributeList.length > 0 &&
                          item.skuAttributeList.map((items, j) => (
                            <tr key={j}>
                              <td className={styles.table_l}>
                                {items.attributeName}
                              </td>
                              <td className={styles.table_r}>
                                {items.attributeValue}
                              </td>
                            </tr>
                          ))}
                      </div>
                    ))}
                  </table>
                </TabPane>
                <TabPane tab="包装清单" key="3">
                  <table className={styles.table}>
                    {
                      <div>
                        <tr className={styles.table_tittle}>包装清单</tr>
                        <tr className={styles.table_body}>
                          {skuDetail.packingList}
                        </tr>
                      </div>
                    }
                  </table>
                </TabPane>
                <TabPane tab="用户评价" key="4">
                  Content of Tab Pane 4
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </Spin>

      <Footer />
    </Layout>
  );
};

/* 
静态渲染骨架
*/
export async function getStaticProps() {
  // 主菜单
  const homeRes = await request(
    `/api/mainsite-api-service/mainsite/homepage`,
    "post",
    { siteType: 1 },
  );
  const { data } = await homeRes;

  // 子菜单
  const subMenuPromises = data.firstLevelNavigations.map(async (i) => {
    let req = [];
    i.forEach((x) => req.push(x.id));
    const { data: singleSubMenu } = await request(
      `/api/mainsite-api-service/mainsite/navigation/children`,
      "post",
      req,
    );
    return singleSubMenu;
  });
  const submenu = await Promise.all(subMenuPromises);
  return {
    props: { data, submenu },
  };
}

export default Detail;
