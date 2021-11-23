/* 
浮动式头部组件
*/
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import Image from "next/image";
import { Input, Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Search } = Input;

// style
import styles from "../styles/components/Floatheader.module.less";

// image
import logo from "../public/image/logo.png";

const Floatheader = () => {
  const router = useRouter();
  // 搜索
  const onSearch = (data) => {
    router.push({
      pathname: "/search",
      query: { keywords: data },
    });
  };
  // 滚动位置
  const [scrollTop, setScrollTop] = useState(0);
  // 滚动
  const scrollHandle = () => {
    setScrollTop(document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHandle);
  }, []);
  // 跳转智采购物车
  const toCart = () => {
    window.open(window.localStorage.getItem("Environment") + "/#/center/cart");
  };

  return (
    <div
      className={styles.floatheader}
      style={scrollTop > 780 ? { top: 0, transitionDuration: "0.7s" } : null}
    >
      <span></span>
      <div>
        <div className={styles.search}>
          <div style={{ cursor: "pointer" }}>
            <Image
              onClick={() => {
                router.push({
                  pathname: "/",
                });
              }}
              src={logo}
              alt="领先未来"
              width={138}
              height={45}
            ></Image>
          </div>
          <Search
            className={styles.searchBox}
            placeholder="请输入商品名称、品牌或型号"
            bordered={false}
            allowClear
            enterButton
            size="large"
            onSearch={onSearch}
          />
          <div className={styles.cartBox}>
            <Button
              type="primary"
              ghost
              className={styles.cart}
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={toCart}
            >
              我的购物车
            </Button>
            <Badge count={0} className={styles.bdg}></Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Floatheader;
