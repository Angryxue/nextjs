/* 
Header组件
*/
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getURLQuery } from "@/utils/common";

// components
import Image from "next/image";
import { Dropdown, Input, Button, Badge } from "antd";
import { ShoppingCartOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Search } = Input;

// style
import styles from "@/styles/components/Header.module.less";

// Image
import banner from "@/public/image/topBanner.jpg";
import iconPhone from "@/public/icon/phone.png";
import logo from "@/public/image/logo.png";

const Header = ({ firstLevelNavigations, submenu, subSite, visible }) => {
  const [submenuId, setSubmenuId] = useState(0);
  const [isHide, setHide] = useState(true);
  const router = useRouter();
  const onSearch = (data) => {
    router.push({
      pathname: "/search",
      query: { keywords: data },
    });
  };
  //跳转环境
  const [toPath, setToPath] = useState("");
  const [isLogin, setLoginStatus] = useState(false);
  useEffect(() => {
    //已登录
    const token = getURLQuery("token");
    if (token && token.indexOf("http") < 0) {
      window.localStorage.setItem("zc_token", token);
    }
    if (window.name && window.name.indexOf("http") < 0) {
      window.localStorage.setItem("zc_token", window.name);
    }
    setLoginStatus(window.localStorage.getItem("zc_token"));
    setToPath(window.localStorage.getItem("Environment"));
  }, []);

  // 跳转智采购物车
  const toCart = () => {
    if (isLogin) {
      location.href = `${toPath}/#/center/cart`;
    } else {
      window.name = location.href;
      location.href = `${toPath}/#/login`;
    }
  };

  // 跳转智采登录
  const login = () => {
    window.name = location.href;
    location.href = `${toPath}/#/login`;
  };

  // 登出
  const logout = () => {
    window.name = location.href;
    window.localStorage.setItem("zc_token", "");
    setLoginStatus(false);
  };

  //下拉菜单组件
  const menu = (
    <div className={styles.headerNav}>
      {firstLevelNavigations.map((i, index) => (
        <div
          key={index}
          onMouseEnter={() => (setSubmenuId(index), setHide(false))}
          onMouseLeave={() => setHide(true)}
        >
          {i.length > 1 ? (
            <>
              <span
                onClick={() => {
                  router.push({
                    pathname: "/search",
                    query: {
                      navigationId: i[0].id,
                      isNav: true,
                    },
                  });
                }}
              >
                {i[0].name}
              </span>
              <span>&nbsp;|&nbsp;</span>
              <span
                onClick={() => {
                  router.push({
                    pathname: "/search",
                    query: {
                      navigationId: i[1].id,
                      isNav: true,
                    },
                  });
                }}
              >
                {i[1].name}
              </span>
            </>
          ) : (
            <>
              <span
                onClick={() => {
                  router.push({
                    pathname: "/search",
                    query: {
                      navigationId: i[0].id,
                      isNav: true,
                    },
                  });
                }}
              >
                {i[0].name}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        <Image src={banner} alt="领先未来" width={1920} height={90}></Image>
      </div>
      <span></span>
      <div>
        <div className={styles.shortcut}>
          <a href="http://www.66123123.com/" rel="noreferrer" target="_blank">
            返回旧版
          </a>
          <div>
            {isLogin ? (
              <div>
                <a className={styles.lgot} onClick={logout}>
                  退出登录
                </a>
              </div>
            ) : (
              <div>
                <a onClick={login}>登录</a>
                <span className={styles.spt}></span>
                <a>注册</a>
              </div>
            )}
            <div>
              <div className={styles.icn}>
                <Image src={iconPhone} alt="phone"></Image>
              </div>
              <span>客服电话：010-66123123</span>
            </div>
          </div>
        </div>
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
        <div className={styles.tabs}>
          {visible ? (
            <Dropdown overlay={menu} visible={true} placement="bottomCenter">
              <Button
                className={styles.btn}
                block={true}
                type="primary"
                icon={<MenuFoldOutlined />}
                size="large"
              >
                全部商品分类
              </Button>
            </Dropdown>
          ) : (
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button
                className={styles.btn}
                block={true}
                type="primary"
                icon={<MenuFoldOutlined />}
                size="large"
              >
                全部商品分类
              </Button>
            </Dropdown>
          )}
          <div className={styles.other}>
            {subSite.map((i) => {
              if (i.maintenanceWay == 1)
                return (
                  <a
                    key={i.id}
                    href={i.maintenanceContent}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {i.name}
                  </a>
                );
              if (i.maintenanceWay == 3)
                return (
                  <a
                    key={i.id}
                    href={`/activity?navigationId=${i.maintenanceContent}&isNav=true`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {i.name}
                  </a>
                );
              return (
                <a
                  key={i.id}
                  href={`/activity?id=${i.maintenanceContent}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {i.name}
                </a>
              );
            })}
          </div>
        </div>
        <div
          className={isHide ? styles.hide : null}
          //通过传入字符串 保持二级菜单的激活状态
          onMouseEnter={() => setHide(false)}
          onMouseLeave={() => setHide(true)}
        >
          {submenu[submenuId].map((i) => (
            <div key={i.id}>
              <h4
                onClick={() => {
                  router.push({
                    pathname: "/search",
                    query: {
                      navigationId: i.id,
                      isNav: true,
                    },
                  });
                }}
              >
                {i.name}
              </h4>
              <div>
                {i.child &&
                  i.child.length &&
                  i.child.map((x) => (
                    <span
                      key={x.id}
                      onClick={() => {
                        router.push({
                          pathname: "/search",
                          query: {
                            navigationId: x.id,
                            isNav: true,
                          },
                        });
                      }}
                    >
                      {x.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
