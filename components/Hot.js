/* 
热卖商品组件
*/
import React from "react";
import { ImageLoader } from "../utils/common";

// components
import Image from "next/image";

// style
import styles from "../styles/components/Hot.module.less";

const Hot = ({ list }) => {
  return (
    <div className={styles.hot}>
      <h2>特色频道</h2>
      <div className={styles.content}>
        {list.map((i) => {
          if (i.maintenanceWay == 1)
            return (
              <a
                key={i.id}
                href={i.maintenanceContent}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  loader={ImageLoader}
                  src={i.picture}
                  alt={i.name}
                  width={390}
                  height={220}
                  //   placeholder="blur"
                ></Image>
              </a>
            );
          if (i.maintenanceWay == 3)
            return (
              <a
                key={i.id}
                href={`/search?navigationId=${
                  i.maintenanceContent.split(",")[0]
                }&isNav=true`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  loader={ImageLoader}
                  src={i.picture}
                  alt={i.name}
                  width={390}
                  height={220}
                  //   placeholder="blur"
                ></Image>
              </a>
            );
          return (
            <a
              key={i.id}
              href={`/activity?id=${i.maintenanceContent}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                loader={ImageLoader}
                src={i.picture}
                alt={i.name}
                width={390}
                height={220}
                // placeholder="blur"
              ></Image>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Hot;
