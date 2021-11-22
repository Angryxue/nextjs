/* 
活动组件
*/
import React, { useState, useEffect } from "react";
import { request } from "@/utils/request";
import { ImageLoader, getURLQuery, removeNull } from "@/utils/common";
import baseURL from "@/servicePath.js";

// components
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Layout, Carousel, Spin } from "antd";

// style
import styles from "@/styles/pages/Activity.module.less";

const Activity = ({ menuData, submenu }) => {
  const initData = {
    backGroundPicture: "",
    bannerPictures: [],
    navigations: [],
    skuBriefs: [],
    name: "",
    id: "",
  };
  const [activityData, setActivityData] = useState(initData);
  // 请求活动页数据接口loading
  const [activityLoading, setActivityLoading] = useState(false);
  useEffect(() => {
    const id = getURLQuery("id");
    const fetcher = async () => {
      setActivityLoading(true);
      try {
        const res = await request(
          `/api/mainsite-api-service/mainsite/activity/${id}`,
          "get",
        );
        const { data } = await res;
        let packedData = removeNull(data, []);
        console.log(packedData, 123);
        setActivityData(packedData);
        setActivityLoading(false);
      } catch (e) {
        setActivityLoading(false);
        console.error(e);
      }
    };
    fetcher();
  }, []);
  return (
    <Layout>
      <Header
        firstLevelNavigations={menuData.firstLevelNavigations}
        submenu={submenu}
        subSite={menuData.navigationColumns}
        visible={false}
      ></Header>
      <Spin spinning={activityLoading}>
        <div
          className={styles.Activity}
          style={{
            background: `url(${baseURL}/image${activityData.backGroundPicture})`,
          }}
        >
          <div className={styles.banner}>
            <Carousel effect="fade" autoplay className={styles.curousel}>
              {activityData.bannerPictures.map((i, index) => (
                <Image
                  loader={ImageLoader}
                  src={i}
                  alt=""
                  key={index}
                  width={1920}
                  height={554}
                  // 设置第图片优先加载
                  priority
                  // placeholder="blur"
                ></Image>
              ))}
            </Carousel>
          </div>
          <div className={styles.content}>
            <div className={styles.classify_content}>
              {activityData.skuBriefs.length ? (
                activityData.skuBriefs.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/detail?skuId=${i.id}`,
                      );
                    }}
                    className={styles.card}
                  >
                    <div>
                      <Image
                        loader={ImageLoader}
                        src={i.mainPicture}
                        alt={i.name}
                        width={176}
                        height={176}
                        // placeholder="blur"
                      ></Image>
                    </div>
                    <span className={styles.skuName}>{i.name}</span>
                    <span className={styles.skuPrice}>
                      ￥<span>{i.price}</span>
                    </span>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            {activityData.navigations.length ? (
              activityData.navigations.map((j) => (
                <div key={j.name}>
                  <div className={styles.header}>
                    <span></span>
                    <h2>{j.name}</h2>
                    <span></span>
                  </div>
                  <div className={styles.classify_content}>
                    {j.skuBriefs.length &&
                      j.skuBriefs.map((i) => (
                        <div
                          key={i}
                          onClick={() => {
                            window.open(
                              `${window.location.origin}/detail?skuId=${i.id}`,
                            );
                          }}
                          className={styles.card}
                        >
                          <div>
                            <Image
                              loader={ImageLoader}
                              src={i.mainPicture}
                              alt={i.name}
                              width={176}
                              height={176}
                              //   placeholder="blur"
                            ></Image>
                          </div>
                          <span className={styles.skuName}>{i.name}</span>
                          <span className={styles.skuPrice}>
                            ￥<span>{i.price}</span>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </Spin>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  // 主菜单
  const menuRes = await request(
    `/api/mainsite-api-service/mainsite/homepage`,
    "post",
    { siteType: 1 },
  );
  const { data: menuData } = await menuRes;
  //子菜单
  const subMenuPromises = menuData.firstLevelNavigations.map(async (i) => {
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
    props: { menuData, submenu },
  };
}

export default Activity;
