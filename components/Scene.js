/* 
首页场景化采购组件
*/
import React, { useState } from "react";
import { request } from "../utils/request";
import { ImageLoader } from "../utils/common";

// components
import Image from "next/image";
import { Tabs } from "antd";
const { TabPane } = Tabs;

// style
import styles from "../styles/components/Scene.module.less";

// Image
import scene1 from "@/public/image/scene/scene1.jpg";
import scene2 from "@/public/image/scene/scene2.jpg";
import scene3 from "@/public/image/scene/scene3.jpg";
import scene4 from "@/public/image/scene/scene4.jpg";
import scene5 from "@/public/image/scene/scene5.jpg";
import scene6 from "@/public/image/scene/scene6.jpg";
import scene7 from "@/public/image/scene/scene7.jpg";
import scene8 from "@/public/image/scene/scene8.jpg";

const Scene = ({ sku }) => {
  const [dots, setDots] = useState("");
  const [skuList, setSkuList] = useState(sku);
  const sceneTypes = [
    {
      name: "办公室",
      id: 0,
      img: scene1,
      dots: [
        {
          id: 1,
          name: "平板电脑",
          cdnt: [169, 288],
          skuIds: [1458532, 618177, 1104609, 1063714, 621422, 355639],
        },
        {
          id: 2,
          name: "保险柜",
          cdnt: [178, 369],
          skuIds: [460514, 56611, 56616, 56613, 777167, 56609],
        },
        {
          id: 3,
          name: "台历",
          cdnt: [260, 288],
          skuIds: [1606502, 1606505, 1606504, 1606490, 1606506, 1565532],
        },
        {
          id: 4,
          name: "键盘",
          cdnt: [300, 294],
          skuIds: [562474, 1016408, 45909, 32477, 1016305, 45907],
        },
        {
          id: 5,
          name: "台式机",
          cdnt: [320, 256],
          skuIds: [1057354, 1039491, 1136372, 1106439, 1103489, 534940],
        },
        {
          id: 6,
          name: "鼠标",
          cdnt: [365, 304],
          skuIds: [49774, 49776, 49779, 114975, 887501, 49787],
        },
        {
          id: 7,
          name: "电话机",
          cdnt: [505, 300],
          skuIds: [21388, 37704, 37706, 422856, 422857, 422859],
        },
      ],
    },
    {
      name: "仓库",
      id: 1,
      img: scene2,
      dots: [
        {
          id: 1,
          name: "胶带",
          cdnt: [65, 242],
          skuIds: [137142, 240720, 524340, 907447, 759835, 757016],
        },
        {
          id: 2,
          name: "周转箱",
          cdnt: [270, 350],
          skuIds: [354567, 560158, 526158, 1312014, 526145, 1435838],
        },
        {
          id: 3,
          name: "平板推车",
          cdnt: [368, 304],
          skuIds: [235356, 238322, 138652, 720082, 625705],
        }, //todo 这里有两个相同的id 238322
        {
          id: 4,
          name: "扫码枪",
          cdnt: [424, 222],
          skuIds: [200556, 200560, 200562, 208308, 311724, 713081],
        },
        {
          id: 5,
          name: "地面标识",
          cdnt: [424, 420],
          skuIds: [658084, 475854, 642203, 546809, 859211, 1058355],
        },
      ],
    },
    {
      name: "会议室",
      id: 2,
      img: scene3,
      dots: [
        {
          id: 1,
          name: "会议摄像头",
          cdnt: [222, 304],
          skuIds: [590189, 616873, 628838, 674687, 750944, 751027],
        },
        {
          id: 2,
          name: "会议音响",
          cdnt: [222, 271],
          skuIds: [603949, 20292, 32562, 32554, 582144, 415944],
        },
        {
          id: 3,
          name: "传屏器",
          cdnt: [264, 285],
          skuIds: [978084, 458247, 305959, 1100698, 364903, 182814],
        },
        {
          id: 4,
          name: "会议麦克风",
          cdnt: [272, 281],
          skuIds: [592272, 751665, 751672, 750600, 660018, 750597],
        },
        {
          id: 5,
          name: "会议大屏",
          cdnt: [320, 183],
          skuIds: [397325, 1505112, 647999, 1099576, 841032, 1060969],
        },
        {
          id: 5,
          name: "电话交换机",
          cdnt: [417, 320],
          skuIds: [591607, 591639, 621769, 1141592, 1141656, 1141706],
        },
      ],
    },
    {
      name: "健身房",
      id: 3,
      img: scene4,
      dots: [
        {
          id: 1,
          name: "力量训练",
          cdnt: [133, 321 + 32],
          skuIds: [1011282, 1010862, 1011683, 1010931, 1011365],
        }, //todo 这里有两个相同的id 1010931
        {
          id: 2,
          name: "哑铃组合",
          cdnt: [284, 261 + 32],
          skuIds: [1002313, 1002587, 845090, 1002889, 1002884, 1003348],
        },
        {
          id: 3,
          name: "有氧系列",
          cdnt: [425, 385 + 32],
          skuIds: [1011187, 92610, 1011242, 1002164, 1002277, 1002503],
        },
        {
          id: 4,
          name: "综合健身",
          cdnt: [585, 217 + 32],
          skuIds: [59312, 1011585, 1011593, 1011599, 1011647, 1011896],
        },
      ],
    },
    {
      name: "前台",
      id: 4,
      img: scene5,
      dots: [
        {
          id: 1,
          name: "台式电脑",
          cdnt: [215, 226 + 32],
          skuIds: [1053283, 1052620, 978073, 926198, 274398, 792390],
        },
        {
          id: 2,
          name: "考勤机",
          cdnt: [536, 181 + 32],
          skuIds: [321493, 466665, 791778, 791801, 960918, 308622],
        },
        {
          id: 3,
          name: "档案盒",
          cdnt: [461, 235 + 32],
          skuIds: [78367, 78448, 93668, 109621, 109639, 109640],
        },
        {
          id: 4,
          name: "空气净化器",
          cdnt: [504, 254 + 32],
          skuIds: [43052, 609707, 341288, 466022, 538409, 410752],
        },
        {
          id: 5,
          name: "平板电视",
          cdnt: [330, 105 + 32],
          skuIds: [363547, 410607, 435445, 463849, 562495, 883112],
        },
      ],
    },
    {
      name: "卫生间",
      id: 5,
      img: scene6,
      dots: [
        {
          id: 1,
          name: "洗洁精",
          cdnt: [49, 268 + 32],
          skuIds: [20628, 20620, 75173, 21072, 77021, 397008],
        },
        {
          id: 2,
          name: "消毒液",
          cdnt: [87, 241 + 32],
          skuIds: [74705, 46283, 46345, 546467, 696680, 34999],
        },
        {
          id: 3,
          name: "拖把",
          cdnt: [226, 212 + 32],
          skuIds: [62919, 62948, 967450, 1084814, 691949, 62954],
        },
        {
          id: 4,
          name: "大盘纸",
          cdnt: [397, 179 + 32],
          skuIds: [297236, 508155, 140458, 562771, 76566, 170413],
        },
        {
          id: 5,
          name: "垃圾袋",
          cdnt: [371, 344 + 32],
          skuIds: [27420, 76853, 109688, 143656, 143671, 143672],
        },
        {
          id: 6,
          name: "垃圾桶",
          cdnt: [409, 377 + 32],
          skuIds: [62883, 109650, 115304, 115396, 140787, 141718],
        },
      ],
    },
    {
      name: "文印室",
      id: 6,
      img: scene7,
      dots: [
        {
          id: 1,
          name: "多功能一体机",
          cdnt: [142, 268 + 32],
          skuIds: [29899, 29678, 65848, 510387, 109539, 391373],
        },
        {
          id: 2,
          name: "复印纸",
          cdnt: [211, 292 + 32],
          skuIds: [142713, 938360, 36883, 119471, 339378, 28196],
        },
        {
          id: 3,
          name: "硒鼓",
          cdnt: [388, 206 + 32],
          skuIds: [228531, 81356, 210704, 877437, 562675, 88901],
        },
        {
          id: 4,
          name: "打印机",
          cdnt: [436, 239 + 32],
          skuIds: [48267, 29557, 29626, 29806, 208361, 72580],
        },
      ],
    },
    {
      name: "休息区",
      id: 7,
      img: scene8,
      dots: [
        {
          id: 1,
          name: "相框组合",
          cdnt: [251, 114 + 32],
          skuIds: [1220615, 779331, 778732, 1220607, 422276, 778814],
        },
        {
          id: 2,
          name: "饮水机",
          cdnt: [137, 191 + 32],
          skuIds: [264092, 670621, 1126963, 297517, 297279, 293522],
        },
        {
          id: 3,
          name: "一次性纸杯",
          cdnt: [174, 225 + 32],
          skuIds: [144414, 144416, 820924, 58266, 71174, 80816],
        },
        {
          id: 4,
          name: "抱枕",
          cdnt: [45, 290 + 32],
          skuIds: [1204171, 1204253, 1204261, 1204266, 1204274, 1204279],
        },
        {
          id: 5,
          name: "药箱",
          cdnt: [388, 225 + 32],
          skuIds: [1129947, 1129994, 17824, 17829, 58901, 138792],
        },
        {
          id: 6,
          name: "吧台椅",
          cdnt: [463, 261 + 32],
          skuIds: [1206223, 1206532, 1206677, 1005231, 1005310, 1005495],
        },
        {
          id: 7,
          name: "咖啡机",
          cdnt: [509, 196 + 32],
          skuIds: [827450, 537020, 827458, 827441, 444383, 51785],
        },
      ],
    },
  ];

  const sceneTypeChange = () => {
    setDots("");
  };

  const getDotslist = async (sendList) => {
    const res = await request(
      "/api/mainsite-api-service/mainsite/scene/sku-list",
      "post",
      sendList,
      1,
    );
    const { data } = await res;
    setSkuList(data);
  };

  const clickDots = (i, j) => {
    getDotslist(sceneTypes[i].dots[j].skuIds);
  };
  return (
    <div className={styles.scene}>
      <h2>场景化采购</h2>
      <div className={styles.content}>
        <div className={styles.left} style={{ position: "relative" }}>
          <Tabs defaultActiveKey="0" onChange={sceneTypeChange}>
            {sceneTypes.length &&
              sceneTypes.map((item, i) => (
                <TabPane tab={item.name} key={item.id}>
                  <div className={styles.sceneImage}>
                    {item.img && (
                      <Image
                        src={item.img}
                        alt={item.id}
                        key={item.id}
                        width={860}
                        height={575}
                        quality={50}
                        placeholder="blur"
                      ></Image>
                    )}
                  </div>

                  {item.dots.length &&
                    item.dots.map((items, j) => (
                      <div
                        key={j}
                        className={styles.dots}
                        style={{
                          position: "absolute",
                          left: items.cdnt[0],
                          top: items.cdnt[1],
                        }}
                        onMouseEnter={() => setDots(j + "enter")}
                        onMouseLeave={() => setDots(j + "leave")}
                        onClick={() => clickDots(i, j)}
                      >
                        {/* warning:不能删，这三个是图标 */}
                        <span></span>
                        <span></span>
                        <span></span>
                        <p
                          className={
                            dots === j + "enter"
                              ? styles.dots_name_enter
                              : dots === j + "leave"
                              ? styles.dots_name_leave
                              : ""
                          }
                        >
                          {items.name}
                        </p>
                      </div>
                    ))}
                </TabPane>
              ))}
          </Tabs>
        </div>
        <div className={styles.right}>
          {skuList.length &&
            skuList.map((i, j) => (
              <div
                key={i.skuId + j}
                onClick={() => {
                  window.open(
                    window.location.origin + "/detail?skuId=" + i.skuId,
                  );
                }}
              >
                <div>
                  {i.picUrl && (
                    <Image
                      loader={ImageLoader}
                      src={i.picUrl}
                      alt={i.skuName}
                      width={125}
                      height={125}
                      quality={15}
                      //   placeholder="blur"
                    ></Image>
                  )}
                </div>
                <span className={styles.skuName}>{i.skuName}</span>
                <span className={styles.skuPrice}>
                  ￥<i>{i.websitePrice}</i>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Scene;
