/* 
Footer
*/
import React from "react";

// components
import Image from "next/image";

// style
import style from "@/styles/components/Footer.module.less";

// image
import slogan1 from "@/public/image/footer/slogan1.png";
import slogan2 from "@/public/image/footer/slogan2.png";
import slogan3 from "@/public/image/footer/slogan3.png";
import slogan4 from "@/public/image/footer/slogan4.png";
import warn1 from "@/public/image/footer/warn1.png";
import warn2 from "@/public/image/footer/warn2.png";
import warn3 from "@/public/image/footer/warn3.png";
import warn4 from "@/public/image/footer/warn4.png";
import warn5 from "@/public/image/footer/warn5.png";
import qrCode from "@/public/image/footer/qrCode.png";

const Footer = () => {
  const list = {
    slogan: [
      { text: "海量物资，一站购齐", icon: slogan1 },
      { text: "阳光采购，价格透明", icon: slogan2 },
      { text: "严格品控，质量保障", icon: slogan3 },
      { text: "智慧仓配，高效服务", icon: slogan4 },
    ],
    help: [
      {
        title: "购物指南",
        child: [
          { text: "注册流程" },
          { text: "下单流程" },
          { text: "支付流程" },
          { text: "发票制度" },
        ],
      },
      {
        title: "商品配送",
        child: [
          { text: "发货签收" },
          { text: "配送范围" },
          { text: "配送时效" },
          { text: "配送异常" },
        ],
      },
      {
        title: "支付方式",
        child: [
          { text: "网上支付" },
          { text: "公司转账" },
          { text: "月结条款" },
          { text: "货到付款" },
        ],
      },
      {
        title: "售后服务",
        child: [
          { text: "服务范围" },
          { text: "退换货流程" },
          { text: "维保条款" },
          { text: "无理由退换" },
        ],
      },
    ],
    copyright_warn: [
      { img: warn1, text: "可信网站信用评价" },
      { img: warn2, text: "网络警察提醒您" },
      { img: warn3, text: "诚信网站" },
      { img: warn4, text: "中国互联网举报中心" },
      { img: warn5, text: "经营性网站备案信息" },
    ],
    copyright_links: [
      { text: "领先未来集团" },
      { text: "领先未来商城" },
      { text: "关于我们" },
      { text: "人才招聘" },
      { text: "战略合作" },
      { text: "投诉方式：13366012315   13366012315@66123123.com" },
    ],
    copyright_info: [
      {
        row: [
          {
            text: "医疗器械经营许可证（京东食药监械经营许20200039号）",
          },
          {
            text: "增值电信业务经营许可证：B1.B2-20212431",
          },
          {
            text: "出版物经营许可证(新出发京零字第东110024号)",
          },
          {
            text: "食品经营许可证（JY11101172150475）",
          },
        ],
      },
      {
        row: [
          {
            text: "第二类医疗器械经营备案凭证  20190068号",
          },
          {
            text: "营业执照",
          },
        ],
      },
    ],
  };
  return (
    <div className={style.footer}>
      <div className={style.top}>
        {list.slogan.map((item, i) => (
          <div key={i + "top"}>
            <Image
              src={item.icon}
              alt={item.text}
              key={i}
              width={56}
              height={56}
            ></Image>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <i></i>
      <div className={style.con}>
        <div className={style.con_l}>
          {list.help.map((item, i) => (
            <div key={i + "con1"}>
              {item.title}
              {item.child.map((items, j) => (
                <p key={j + "con2"}>{items.text}</p>
              ))}
            </div>
          ))}
        </div>
        <div className={style.con_r}>
          <div className={style.con_r_l}>
            <p>客服热线：</p>
            <p>400-888-1123</p>
            <p>010-66123123</p>
          </div>
          <div className={style.con_r_r}>
            <Image src={qrCode} alt={"二维码"} width={118} height={118}></Image>
            <p>扫描关注领先未来</p>
          </div>
        </div>
      </div>

      <div className={style.foot}>
        <div className={style.foot_1}>
          {list.copyright_warn.map((item, i) => (
            <Image
              src={item.img}
              alt={item.text}
              key={i + "f1"}
              width={103}
              height={32}
              className={style.foot_1_img}
            ></Image>
          ))}
        </div>
        <div className={style.foot_2}>
          {list.copyright_links.map((item, i) => (
            <span key={i + "f2"}>{item.text}</span>
          ))}
        </div>
        <div className={style.foot_3}>
          {list.copyright_info.map((item, i) => (
            <p key={i + "f3"}>
              {item.row.map((items, j) => (
                <a
                  href={items.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={j + "f4"}
                  className={style.foot_3_a}
                >
                  {items.text}
                </a>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
