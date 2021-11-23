/* 
首页
*/

import React, { useEffect } from "react";
//Image Loader
import { ImageLoader, getZhiCaiURL } from "../utils/common";
import { request } from "../utils/request";

// components
import Image from "next/image";
import Header from "../components/Header";
import Floatheader from "../components/Floatheader";
import Sidetool from "../components/Sidetool";
import Footer from "../components/Footer";
import Scene from "../components/Scene";
import Displayboard from "../components/Displayboard";
import Hot from "../components/Hot";
import Recommendion from "../components/Recommendion";
import { Layout, Carousel } from "antd";

// style
import styles from "../styles/pages/Home.module.less";

const Home = ({
  data,
  displayboardData,
  displayboardDTO,
  hotData,
  submenu,
  sceneSkuList,
  recommendionList,
}) => {
  // 获取跳转智采的路径
  useEffect(() => {
    getZhiCaiURL();
  }, []);
  return (
    <Layout>
      {/* --------------------------浮动式头部组件-------------------------- */}
      <Floatheader />
      {/* ---------------------------右侧工具栏---------------------------- */}
      <Sidetool />
      {/* --------------------------固定式头部组件-------------------------- */}
      <Header
        firstLevelNavigations={data.firstLevelNavigations}
        submenu={submenu}
        subSite={data.navigationColumns}
        visible={true}
      ></Header>
      {/* -----------------------------轮播图----------------------------- */}
      <Carousel effect="fade" autoplay className={styles.curousel}>
        {data.bannerColumns.map((i, index) => (
          <Image
            loader={ImageLoader}
            src={i.picture}
            alt={i.name}
            key={i.id}
            width={1920}
            height={554}
            // 设置第图片优先加载
            priority
            // placeholder="blur"
          ></Image>
        ))}
      </Carousel>
      <div className={styles.home}>
        {/* ---------------------------场景化采购--------------------------- */}
        <div id="scene">
          <Scene sku={sceneSkuList}></Scene>
        </div>
        {/* ----------------------------热卖商品---------------------------- */}
        <div id="hot">
          <Hot list={hotData}></Hot>
        </div>
        {/* ----------------------------品类广场---------------------------- */}
        <div id="displayboard">
          {displayboardData.map((i, index) => (
            <Displayboard
              key={i.id}
              data={displayboardDTO[index].data}
            ></Displayboard>
          ))}
        </div>
        {/* ----------------------------为你推荐---------------------------- */}
        <div id="recommendion">
          <Recommendion data={recommendionList} />
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
/* 
增量静态渲染（ISR）
*/
export const getStaticProps = async () => {
  //首页数据
  const homeRes = await request(
    `/api/mainsite-api-service/mainsite/homepage`,
    "post",
    { siteType: 1 },
  );
  const { data } = await homeRes;
  //子菜单
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

  //品类数据
  const displayboardRes = await request(
    `/api/mainsite-api-service/mainsite/floor/list`,
    "post",
    { siteType: 1 },
  );
  const { data: displayboardData } = await displayboardRes;

  //品类详情
  const DTOpromises = displayboardData.map(async (i) => {
    const singleDTO = await request(
      `/api/mainsite-api-service/mainsite/floor`,
      "post",
      { id: i.id, siteType: 1 },
    );
    return singleDTO;
  });
  const displayboardDTO = await Promise.all(DTOpromises);

  //热卖商品
  const hotRes = await request(
    `/api/mainsite-api-service/mainsite/activity-column`,
    "post",
    { siteType: 1 },
  );
  const { data: hotData } = await hotRes;
  // 场景化采购首屏数据
  const sceneRes = await request(
    `/api/mainsite-api-service/mainsite/scene/sku-list`,
    "post",
    [1458532, 618177, 1104609, 1063714, 621422, 355639],
  );
  const { data: sceneSkuList } = await sceneRes;
  // 为你推荐
  const recommendionRes = await request(
    `/api/mainsite-api-service/mainsite/recommend/sku`,
    "get",
  );
  const { data: recommendionList } = await recommendionRes;

  return {
    props: {
      data,
      displayboardData,
      displayboardDTO,
      hotData,
      submenu,
      sceneSkuList,
      recommendionList,
    },
    revalidate: 30,
  };
};
