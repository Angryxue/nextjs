/* 
放大镜组件
*/
import React, { useState } from "react";
import { ImageLoader } from "@/utils/common";

// components
import Image from "next/image";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

// style
import styles from "@/styles/pages/Magnifier.module.less";

const Magnifier = ({ pictureFile, name, skuId }) => {
  const [showImgIndex, setSowImgIndex] = useState(0);
  const [showMagifier, setShowMagnifier] = useState(false);
  const [fixStyle, setFixStyle] = useState({
    magnifier_hover: {
      left: "0",
      top: "0",
    },
    magnifier_box_img: {
      left: "0",
      top: "0",
    },
  });

  const onMouseMove = (event) => {
    let e = event.nativeEvent;
    mouseMoveFn(e.offsetX, e.offsetY);
  };
  const mouseMoveFn = (x, y) => {
    if (x < 107) {
      x = 107;
    } else if (x > 321) {
      x = 321;
    }
    if (y < 107) {
      y = 107;
    } else if (y > 321) {
      y = 321;
    }
    setFixStyle({
      magnifier_hover: {
        left: parseFloat(x - 107) + "px",
        top: parseFloat(y - 107) + "px",
      },
      magnifier_box_img: {
        left: parseFloat(-(x - 107) * 2) + "px",
        top: parseFloat(-(y - 107) * 2) + "px",
      },
    });
  };
  if (pictureFile.length)
    return (
      <div className={styles.magnifier}>
        <Image
          loader={ImageLoader}
          src={pictureFile[showImgIndex]}
          alt={name}
          key={skuId}
          width={428}
          height={428}
          className={styles["magnifier_img"]}
        ></Image>

        <div
          className={styles["magnifier_shade"]}
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={onMouseMove}
        ></div>

        {showMagifier && (
          <div
            className={styles["magnifier_hover"]}
            style={fixStyle["magnifier_hover"]}
          ></div>
        )}

        {showMagifier && (
          <div className={styles["magnifier_box"]}>
            <div style={fixStyle["magnifier_box_img"]}>
              <Image
                loader={ImageLoader}
                src={pictureFile[showImgIndex]}
                alt={name}
                width={428 * 2}
                height={428 * 2}
              ></Image>
            </div>
          </div>
        )}

        <div className={styles.foot}>
          <Button
            className={styles.abtn}
            icon={<LeftOutlined />}
            onClick={() =>
              setSowImgIndex(showImgIndex > 0 ? showImgIndex - 1 : 0)
            }
          />
          <div className={styles.miniImg}>
            {pictureFile.map((i, index) => (
              <div
                className={index == showImgIndex ? styles.active : null}
                key={index}
                onClick={() => setSowImgIndex(index)}
              >
                <Image
                  loader={ImageLoader}
                  src={i}
                  alt="图片"
                  width={68}
                  height={68}
                ></Image>
              </div>
            ))}
          </div>
          <Button
            className={styles.abtn}
            icon={<RightOutlined />}
            onClick={() =>
              setSowImgIndex(
                showImgIndex < pictureFile.length - 1
                  ? showImgIndex + 1
                  : pictureFile.length - 1,
              )
            }
          />
        </div>
      </div>
    );
  return <></>;
};

export default Magnifier;
