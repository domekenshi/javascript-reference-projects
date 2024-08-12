let apiQuotes = [];

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}
// APIから引用文取得
async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
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

// 初回画面起動時に呼び出す
getQuotes();
