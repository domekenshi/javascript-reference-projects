import { API_INFO } from "./const.js";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photos = [];
const COUNT = 10;
// 分けてみたけどわかりにくい　一応そのまま
const apiUrl = `${API_INFO.BASE_PI_URL}${API_INFO.CLIENT_ID}${API_INFO.API_KEY}${API_INFO.COUNT}${COUNT}`;
/**
 * 写真取得
 */
async function getPhotes() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotes();
  } catch (error) {
    console.error(error);
  }
}

/**
 * 写真表示
 */
function displayPhotes() {
  photos.forEach((photo) => {
    // <a>タグを作成
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // <img>タグを作成
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // 親子関係の設定
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

/**
 * HTML要素に属性を設定
 */
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

getPhotes();
