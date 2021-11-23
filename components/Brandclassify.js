/* 
搜索页顶部分类组件
*/
import React, { useState } from "react";
import { useRouter } from "next/router";

// components
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

// style
import styles from "../styles/components/Brandclassify.module.less";

const Brandclassify = ({ classifies, brands, getBrands, getClassifies }) => {
  //展开
  const [showAllClassify, setShowClassifyState] = useState(true);
  const [showAllBrand, setShowBrandState] = useState(true);
  const [selectBrand, setSelectBrand] = useState([]);
  //选择类型、品牌
  const changeBrand = (val) => {
    let arr = [...selectBrand];
    arr.includes(val.id)
      ? arr.splice(arr.indexOf(val.id), 1)
      : arr.push(val.id);
    setSelectBrand(arr);
    getBrands(arr);
  };
  const router = useRouter();
  const changeClassify = (val) => {
    if (!router.query.isNav) {
      router.push({
        pathname: "/search",
        query: {
          navigationId: val.id,
          isNav: true,
        },
      });
    } else {
      getClassifies(val.id);
    }
  };
  return (
    <div className={styles.brandclassify}>
      {classifies && (
        <div>
          {showAllClassify ? (
            <Button
              size="small"
              onClick={() => {
                setShowClassifyState(false);
              }}
              className={styles.btn}
              icon={<DownOutlined />}
            >
              展开
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                setShowClassifyState(true);
              }}
              className={styles.btn}
              icon={<UpOutlined />}
            >
              收起
            </Button>
          )}
          <h4>分类</h4>
          <div className={showAllClassify ? styles.narrow : null}>
            {classifies.map((i) => (
              <span
                key={i.id}
                onClick={() => {
                  changeClassify(i);
                }}
              >
                {i.value}
              </span>
            ))}
          </div>
        </div>
      )}
      {brands && (
        <div>
          {showAllBrand ? (
            <Button
              size="small"
              onClick={() => {
                setShowBrandState(false);
              }}
              className={styles.btn}
              icon={<DownOutlined />}
            >
              展开
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => {
                setShowBrandState(true);
              }}
              className={styles.btn}
              icon={<UpOutlined />}
            >
              收起
            </Button>
          )}
          <h4>品牌</h4>
          <div className={showAllBrand ? styles.narrow : null}>
            {brands.map((i) => (
              <span
                className={selectBrand.includes(i.id) ? styles.active : null}
                key={i.id}
                onClick={() => changeBrand(i)}
              >
                {i.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brandclassify;
