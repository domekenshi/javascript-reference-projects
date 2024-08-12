import { API_URL } from "./const.js";
const quoteContainer = document.getElementById("quote-container");
const quoteTxt = document.getElementById("quote");
const authorTxt = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

/**
 * 新規引用文生成
 */
function newQuote() {
  // Pick a random quote from apiQuotes array ランダムに引用文配列から引用を取得
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  // 著者がnullかどうかをチェックする
  if (!quote.author) {
    authorTxt.textContent = "不明";
  } else {
    authorTxt.textContent = quote.author;
  }
  // Check Quote length to determine sytyling
  // 引用文の長さに応じてスタイルを変更する
  if (quote.text.length > 50) {
    console.log("長い");
    quoteTxt.classList.add("long-quote");
  } else {
    console.log("短い");
    quoteTxt.classList.remove("long-quote");
  }
  quoteTxt.textContent = quote.text;
}

/**
 * 引用文取得
 */
async function getQuotes() {
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
 * 引用文ツイート
 */
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// 初回画面起動時に呼び出す
getQuotes();
