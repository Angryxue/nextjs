/* 
搜索页
*/

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { request } from "@/utils/request";
import { removeNull } from "@/utils/common";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Brandclassify from "@/components/Brandclassify";
import Card from "@/components/Card";
import { Pagination, Tag, Button, Input, Empty, Spin } from "antd";
const { Search: SearchInput } = Input;

// style
import styles from "@/styles/pages/Search.module.less";

const Search = ({ menu, submenu }) => {
  // 搜索结果缺省值
  const initSearchData = {
    mainSiteNavigateMap: { 分类: [], 品牌: [] },
    navigations: [],
    recommendSku: [],
    searchSpu: { items: [] },
  };
  // 所有品牌
  const [brands, setBrands] = useState([]);
  // 所有分类
  const [classifies, setClassifies] = useState([]);
  // 所选品牌（可多选）
  const [selectedBrands, setSelectedBrands] = useState([]);
  // 所选分类（单选）
  const [selectedClassifies, setSelectedClassifies] = useState(null);
  // 搜索结果
  const [searchData, setSearchData] = useState(initSearchData);
  // 分页参数 TODO：不管传多少都返回12条数据？？？
  const [pageSize, setPageSize] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);
  // 排序类型
  const [sortType, setSortType] = useState(0);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  // 在搜索结果中搜索
  const [searchWords, setSearchWords] = useState(null);
  const [minPriceFlag, setMinPriceFlag] = useState(null);
  const [maxPriceFlag, setMaxPriceFlag] = useState(null);
  const [loading, setLoadingStatus] = useState(true);

  //获取选择的品牌
  const getBrands = (val) => {
    setSelectedBrands(val);
  };

  //获取选择的分类
  const getClassifies = (val) => {
    setSelectedClassifies(val);
  };
  // 获取搜索关键词
  const router = useRouter();
  const keywords = router.query.keywords || "";

  //获取数据
  useEffect(() => {
    const navigationId = router.query.navigationId;
    const fetcher = async () => {
      setLoadingStatus(true);
      let res = null;
      try {
        if (!keywords && navigationId) {
          res = await request(
            `/api/mainsite-api-service/mainsite/search/`,
            "post",
            {
              brandIds: selectedBrands,
              highestPrice: maxPrice,
              lowestPrice: minPrice,
              navigationId: selectedClassifies || navigationId,
              pageNum: pageNumber,
              pageSize: pageSize,
              resultSearchContext: searchWords,
              searchContext: keywords,
              siftAttributes: [],
              siteType: 1,
              sortType: sortType,
            },
            1,
          );
        } else if (keywords) {
          res = await request(
            `/api/mainsite-api-service/mainsite/search/1/spuList?keyword=${encodeURI(
              keywords,
            )}`,
            "get",
            null,
            1,
          );
        }
        const {
          data,
          data: { mainSiteNavigateMap },
        } = await res;
        let packedData = removeNull(data, []);
        setSearchData(packedData);
        setClassifies(mainSiteNavigateMap["分类"]);
        mainSiteNavigateMap["品牌"] && setBrands(mainSiteNavigateMap["品牌"]);
        setLoadingStatus(false);
      } catch (e) {
        setLoadingStatus(false);
        console.error(e);
      }
    };
    fetcher();
  }, [
    selectedBrands,
    selectedClassifies,
    pageSize,
    pageNumber,
    sortType,
    minPrice,
    maxPrice,
    searchWords,
    router,
    keywords,
  ]);

  //删除搜索条件（tag）
  const handleClose = (index) => {
    setSelectedClassifies(searchData.navigations[index].id);
    //   setSelectedBrands([]);
  };

  //删除价格限制
  const clearPriceLimit = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setMinPriceFlag(null);
    setMaxPriceFlag(null);
  };

  //设置价格限制
  const setPriceLimit = () => {
    setMinPrice(minPriceFlag);
    setMaxPrice(maxPriceFlag);
  };

  return (
    <div>
      <Header
        firstLevelNavigations={menu.firstLevelNavigations}
        subSite={menu.navigationColumns}
        submenu={submenu}
      ></Header>
      {
        <div className={styles.search}>
          <h3>搜索条件</h3>
          <div className={styles.tags}>
            {searchData.navigations.length &&
              searchData.navigations.map((i, index) => (
                //   搜索条件
                <Tag
                  color="#19A5A7"
                  key={i.id}
                  closable={index != 0}
                  onClose={(e) => {
                    e.preventDefault();
                    handleClose(index - 1);
                  }}
                >
                  {i.name}
                </Tag>
              ))}
            {!searchData.navigations.length && (
              <Tag color="#19A5A7">{keywords}</Tag>
            )}
          </div>
          {/* --------------------------品牌&分类-------------------------- */}
          <Brandclassify
            classifies={classifies}
            brands={brands}
            getBrands={getBrands}
            getClassifies={getClassifies}
          />
          <div className={styles.main}>
            {/* --------------------------精品推荐-------------------------- */}
            <div className={styles.left}>
              <h2>精品推荐</h2>
              {loading ? (
                <Spin className={styles.lding} />
              ) : (
                <>
                  {searchData.recommendSku.length ? (
                    searchData.recommendSku.map((i) => (
                      <Card
                        key={i.skuId}
                        data={i}
                        size={{
                          w: 150,
                          h: 150,
                        }}
                        style={{
                          width: "200px",
                          height: "255px",
                          margin: "0 0 20px 0",
                          padding: "15px 10px",
                        }}
                      ></Card>
                    ))
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            <div className={styles.right}>
              {/* --------------------------搜索条件区域-------------------------- */}
              <div className={styles.opt}>
                <Button
                  size={"small"}
                  type={!sortType ? "primary" : null}
                  onClick={() => setSortType(0)}
                >
                  综合
                </Button>
                {!sortType && (
                  <div
                    className={styles.sortbtn}
                    onClick={() => setSortType(2)}
                  >
                    价 格
                    <div>
                      <span className={styles.upArrow}></span>
                      <span className={styles.downArrow}></span>
                    </div>
                  </div>
                )}
                {sortType == 2 && (
                  <div
                    className={styles.sortbtn_up}
                    onClick={() => setSortType(1)}
                  >
                    价 格
                    <div>
                      <span className={styles.upArrow}></span>
                      <span className={styles.downArrow}></span>
                    </div>
                  </div>
                )}
                {sortType == 1 && (
                  <div
                    className={styles.sortbtn_down}
                    onClick={() => setSortType(2)}
                  >
                    价 格
                    <div>
                      <span className={styles.upArrow}></span>
                      <span className={styles.downArrow}></span>
                    </div>
                  </div>
                )}
                <div className={styles.pricelmtDiv}>
                  <div>
                    <Input
                      allowClear={true}
                      value={minPriceFlag}
                      onChange={(e) => setMinPriceFlag(e.target.value)}
                      size="small"
                      prefix={"￥"}
                    />
                  </div>
                  &nbsp;-&nbsp;
                  <div style={{ marginRight: "10px" }}>
                    <Input
                      allowClear={true}
                      value={maxPriceFlag}
                      onChange={(e) => setMaxPriceFlag(e.target.value)}
                      size="small"
                      prefix={"￥"}
                    />
                  </div>
                  <Button size={"small"} type="primary" onClick={setPriceLimit}>
                    确定
                  </Button>
                  <Button
                    size={"small"}
                    type="primary"
                    ghost
                    onClick={clearPriceLimit}
                  >
                    清除
                  </Button>
                </div>
                <div className={styles.searchBox}>
                  <SearchInput
                    allowClear={true}
                    placeholder="在结果中搜索"
                    onSearch={(value) => setSearchWords(value)}
                    style={{ width: 200 }}
                  />
                </div>
              </div>
              {/* --------------------------搜索结果展示-------------------------- */}
              <div className={styles.content}>
                {loading ? (
                  <Spin className={styles.lding} />
                ) : (
                  <>
                    {searchData.searchSpu.items.length ? (
                      searchData.searchSpu.items.map((i) => (
                        <Card
                          key={i.skuId}
                          data={i}
                          size={{
                            w: 175,
                            h: 175,
                          }}
                          style={{
                            width: "235px",
                            height: "300px",
                            padding: "0 20px",
                            padding: "30px 10px 0 10px",
                          }}
                        ></Card>
                      ))
                    ) : (
                      <Empty className={styles.ept} description={false} />
                    )}
                  </>
                )}
              </div>
              {/* --------------------------分页-------------------------- */}
              <div className={styles.pgnation}>
                {searchData.searchSpu.items.length ? (
                  <Pagination
                    total={searchData.searchSpu.total}
                    showSizeChanger
                    showQuickJumper
                    defaultPageSize={12}
                    onShowSizeChange={(current, pageSize) => {
                      setPageSize(pageSize);
                    }}
                    onChange={(page) => {
                      setPageNumber(page);
                    }}
                    showTotal={(total) => `共 ${total} 条`}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
};

/* 
静态渲染骨架
*/
export async function getStaticProps() {
  // 主菜单
  const menuRes = await request(
    `/api/mainsite-api-service/mainsite/homepage`,
    "post",
    { siteType: 1 },
  );
  const { data: menu } = await menuRes;

  //子菜单
  const subMenuPromises = menu.firstLevelNavigations.map(async (i) => {
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

  // Pass data to the page via props
  return { props: { menu, submenu } };
}

export default Search;
