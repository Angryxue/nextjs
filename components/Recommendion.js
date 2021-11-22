/* 
首页为你推荐组件
*/
import React from "react";
import { ImageLoader } from "@/utils/common";

// components
import Image from "next/image";

// style
import styles from "@/styles/components/Recommendion.module.less";

const Recommendion = ({ data }) => {
  return (
    <div className={styles.recommendion}>
      <h2>为你推荐</h2>
      <div className={styles.content}>
        {data.length &&
          data.map((i) => (
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
                  width={176}
                  height={176}
                  quality={15}
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
    </div>
  );
};

export default Recommendion;
