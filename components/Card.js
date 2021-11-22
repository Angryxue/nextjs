/* 
sku卡片
*/
import React from "react";
import { ImageLoader } from "@/utils/common";

// components
import Image from "next/image";

// style
import styles from "@/styles/components/Card.module.less";

const Card = ({ data, size, style }) => {
  return (
    <div
      className={styles.card}
      style={style}
      onClick={() => {
        const URL = `${window.location.origin}/detail?skuId=${data.skuId}&token=${window.name}`;
        window.open(URL);
      }}
    >
      <div>
        <Image
          loader={ImageLoader}
          src={data.picUrl}
          alt={data.name}
          key={data.id}
          width={size.w}
          height={size.h}
          //   placeholder="blur"
        ></Image>
      </div>
      <span className={styles.skuName}>{data.name}</span>
      <span className={styles.skuPrice}>
        ￥<i>{data.price}</i>
      </span>
    </div>
  );
};

export default Card;
