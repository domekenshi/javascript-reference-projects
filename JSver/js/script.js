import { API_INFO } from "./const.js";
import { setAttribute } from "./util.js";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let toatalImages = 0;
let photos = [];
// 初期表示を少なくする
let count = 3;
// 分けてみたけどわかりにくい　一応そのまま
let apiUrl = `${API_INFO.BASE_PI_URL}${API_INFO.CLIENT_ID}${API_INFO.API_KEY}${API_INFO.COUNT}${count}`;

/**
 * 写真取得
 */
async function getPhotes() {
  try {
    // APIからデータを取得
    const response = await fetch(apiUrl);
    photos = await response.json();

    displayPhotes();
  } catch (error) {
    console.error("エラー：", error);
  }
}

/**
 * 写真表示
 */
function displayPhotes() {
  toatalImages = photos.length;
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
    // 画像読込時のイベント
    img.addEventListener("load", imageLoaded);
    // 親子関係の設定
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

/**
 * 画像読込
 */
function imageLoaded() {
  // 読込数加算
  imagesLoaded++;
  // 読込完了処理
  if (imagesLoaded === toatalImages) {
    ready = true;
    loader.hidden = true;
    let count = 10;
    apiUrl = `${API_INFO.BASE_PI_URL}${API_INFO.CLIENT_ID}${API_INFO.API_KEY}${API_INFO.COUNT}${count}`;
  }
}

/**
 * スクロールイベントの設定
 */
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    imagesLoaded = 0;
    ready = false;
    getPhotes();
  }
});

getPhotes();
