import { API_URL, BASE_TWITTER_URL } from "./const.js";
const quoteContainer = document.getElementById("quote-container");
const quoteTxt = document.getElementById("quote");
const authorTxt = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const UNKNOWN = "不明";
const QUOTE_STYLE_CHANGE_NUM = 50;

/**
 * 引用文取得
 */
async function getQuotes() {
  loading();
  const apiUrl = API_URL;
  try {
    let response = await fetch(apiUrl);
    // レスポンスの文字列をJSONに変換
    apiQuotes = await response.json(); // awaitを追加
    newQuote();
  } catch (error) {
    // エラー処理
    console.log(error);
  }
}

/**
 * 新規引用文生成
 */
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array ランダムに引用文配列から引用を取得
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  // 著者がnullかどうかをチェックする
  if (!quote.author) {
    authorTxt.textContent = UNKNOWN;
  } else {
    authorTxt.textContent = quote.author;
  }
  // Check Quote length to determine sytyling
  // 引用文の長さに応じてスタイルを変更する
  if (quote.text.length > QUOTE_STYLE_CHANGE_NUM) {
    quoteTxt.classList.add("long-quote");
  } else {
    quoteTxt.classList.remove("long-quote");
  }
  quoteTxt.textContent = quote.text;
  complete();
}

/**
 * 引用文ツイート
 */
function tweetQuote() {
  const twitterUrl = `${BASE_TWITTER_URL}${quoteTxt.textContent} - ${authorTxt.textContent}`;
  window.open(twitterUrl, "_blank");
}

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// 初回画面起動時に呼び出す
getQuotes();
