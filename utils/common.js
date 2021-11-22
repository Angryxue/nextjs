import baseURL from "@/servicePath.js";

/**
 * 获取跳转智采的地址
 */
export const getZhiCaiURL = () => {
  let _orgin = window.location.origin,
    url = "";
  if (_orgin.indexOf("test") != -1 || _orgin.indexOf("pre") != -1) {
    let _e = _orgin.slice(12, _orgin.length);
    _e = _e.split(".")[0];
    url = `https://shoppe"${_e}.66123123.com`;
  } else {
    url = `https://shoppe.66123123.com`;
  }
  window.localStorage.setItem("Environment", url);
};

/**
 * next/Image组件图片loader
 */
export const ImageLoader = ({ src, width, quality }) => {
  return `${baseURL}/image/${src}?w=${width}&q=${quality || 75}`;
};

/**
 * 去掉数据中的null
 */
export const removeNull = (data, defaultStr = "") => {
  if (typeof data != "object" || data == null) {
    if (data == null || data == "null") {
      return defaultStr;
    } else {
      return data;
    }
  }
  for (const v in data) {
    if (data[v] == null || data[v] == "null") {
      data[v] = defaultStr;
    }
    if (typeof data[v] == "object") {
      removeNull(data[v]);
    }
  }
  return data;
};

/**
 * 获取URL中的参数
 */
export const getURLQuery = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
