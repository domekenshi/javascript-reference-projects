import { API_INFO } from "./const.js";
const COUNT = 10;
// 分けてみたけどわかりにくい　一応そのまま
const apiUrl = `${API_INFO.BASE_PI_URL}${API_INFO.CLIENT_ID}${API_INFO.API_KEY}${API_INFO.COUNT}${COUNT}`;
console.log(apiUrl);
async function getPhotes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getPhotes();
