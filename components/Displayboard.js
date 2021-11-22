/* 
品类广场组件
*/
import React, { useState } from "react";
import { request } from "@/utils/request";
import { ImageLoader } from "@/utils/common";

// components
import Image from "next/image";

// style
import styles from "@/styles/components/Displayboard.module.less";

const Displayboard = ({ data }) => {
  // 切换不同品类产生的新数据
  const [newData, setNewData] = useState(data);

  const getSkuList = async (id, ids) => {
    const res = await request(
      `/api/mainsite-api-service/mainsite/floor/navigation/sku/${id}/${ids}`,
      "get",
      null,
      1,
    );
    const { data: skuList } = await res;
    let flag = { ...data };
    flag.skuBriefs = skuList;
    setNewData(flag);
  };
  // 切换品类
  const changeClassify = (val) => {
    getSkuList(newData.id, val.id);
  };
  return (
    <div className={styles.displayboard}>
      <h2 className={styles.name}>
        {newData.name}
        <p className={styles.name_right}>
          {newData.navigations.map((item, i) => (
            <span key={i} onClick={() => changeClassify(item)}>
              {item.name}
            </span>
          ))}
        </p>
      </h2>
      <div>
        <Image
          loader={ImageLoader}
          src={newData.picture}
          alt={newData.name}
          width={190}
          height={492}
          //   placeholder="blur"
        ></Image>
        <div className={styles.middle}>
          {newData.skuBriefs.slice(0, 8).map((i) => (
            <div
              key={i.id}
              onClick={() => {
                window.open(window.location.origin + "/detail?skuId=" + i.id);
              }}
            >
              <div>
                <Image
                  loader={ImageLoader}
                  src={i.mainPicture}
                  alt={i.name}
                  width={138}
                  height={140}
                  //   placeholder="blur"
                ></Image>
              </div>
              <span className={styles.skuName}>{i.name}</span>
              <span className={styles.skuPrice}>
                ￥<i>{i.price}</i>
              </span>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          {newData.skuBriefs.slice(8, 13).map((i) => (
            <div
              key={i.id}
              onClick={() => {
                window.open(window.location.origin + "/detail?skuId=" + i.id);
              }}
            >
              <div className={styles.skuInfo}>
                <span className={styles.skuName}>{i.name}</span>
                <span className={styles.skuPrice}>
                  ￥<i>{i.price}</i>
                </span>
              </div>
              <Image
                loader={ImageLoader}
                src={i.mainPicture}
                alt={i.name}
                width={138}
                height={140}
                // placeholder="blur"
              ></Image>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Displayboard;
