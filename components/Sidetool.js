/* 
右侧工具栏组件
*/
import React, { useState, useEffect } from "react";
import { Anchor } from "antd";
const { Link } = Anchor;

// components
import { BankFilled, UpSquareOutlined } from "@ant-design/icons";

// style
import styles from "../styles/components/Sidetool.module.less";

const Sidetool = () => {
  const [customScrollTop, setCustomScrollTop] = useState(0);
  const navData = [
    {
      id: 1,
      name: "场景采购",
      anchorName: "scene",
      positionRange: [722, 1200],
      position: 722,
    },
    {
      id: 2,
      name: "热卖商品",
      anchorName: "hot",
      positionRange: [1205, 1500],
      position: 1205,
    },
    {
      id: 3,
      name: "品类广场",
      anchorName: "displayboard",
      positionRange: [1500, 4000],
      position: 1500,
    },
    {
      id: 4,
      name: "为你推荐",
      anchorName: "recommendion",
      positionRange: [4000, 100000],
      position: 4000,
    },
  ];

  const scrollHandle = () => {
    setCustomScrollTop(document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandle);
  }, []);

  return (
    <div
      className={styles.sidetool}
      style={customScrollTop > 800 ? { position: "fixed", top: "88px" } : null}
    >
      <div className={styles.head}>
        <BankFilled style={{ color: "#fff", fontSize: "38px" }} />
      </div>
      <div className={styles.content}>
        <Anchor>
          {navData.map((i) => (
            <Link key={i.id} href={`#${i.anchorName}`} title={i.name} />
          ))}
        </Anchor>
      </div>
      <div
        className={styles.gotop}
        onClick={() => (document.documentElement.scrollTop = 0)}
      >
        <UpSquareOutlined style={{ color: "#19A5A7", fontSize: "38px" }} />
      </div>
    </div>
  );
};

export default Sidetool;
