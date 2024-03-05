# 野良露營NoraCamping 總覽

## 介紹

歡迎來到**野良露營NoraCamping**——一個結合露營愛好與動物關懷的創新平台。通過我們的網站，我們不僅提供一個親密接觸大自然的場所，還讓您有機會參與保護和照顧流浪動物的活動。我們的目標是推動一種全新的露營文化，讓休閒活動與公益行為相輔相成。

- [野良露營\_簡報](https://drive.google.com/file/d/1hTI494n8lbzKbaudzZiSmbZxcGdhtjUC/view)
- [野良露營\_展示影片](https://www.youtube.com/watch?v=9_ODuTqBn6w)
- [野良露營 Nora Camping](https://tibamef2e.com/chd104/g1/) <--正式網站請由此進入。

## 項目結構

本項目包含三個主要部分：

1. **前台**[repository](https://github.com/rillala/NORA-Camping) - 提供用戶界面，包括營地預約、線上選物等功能。
2. **後台**[repository](https://github.com/rillala/NORA-BackStage) - 給予管理者操作界面，用於管理網站內容和用戶。
3. **後端資料庫與PHP**[repository](https://github.com/rillala/NORA-API) - 處理資料儲存和後端邏輯。

## 技術棧

- 前端開發：HTML, JavaScript, SASS/CSS, Vue 3, GSAP, Axios, VCalendar, Pinia.js
- 後端開發：PHP, MySQL, JWT, Composer
- 工具與服務：Figma, Notion, Vite, WampServer, MySQL Workbench, SourceTree, FileZilla

# 野良露營NoraCamping 前台

## 介紹

野良露營NoraCamping前台提供一個互動式用戶界面，讓訪問者可以探索營地，預約營位，並進行線上選物商品購買。

## 安裝與設置

### 前提條件

- Node.js (建議安裝最新穩定版本)
- Vue 3 (v3.3.11)
- Vue Router (v4.2.5)
- Vue Fire (v3.1.22)
- Axios (v1.6.5)
- Firebase (v10.8.0)
- GSAP (v3.12.5)
- Pinia (v2.1.7)
- qs (v6.11.2)
- VCalendar (v3.1.2)
- Vite (v5.0.10)

### 安裝步驟

1. clone 前台 repository：

```bash
git clone https://github.com/rillala/NORA-Camping.git
cd NORA-Camping
npm install
npm run dev
```
這將啟動一個本地開發服務器。

## 功能特色

- 引導頁與首頁：利用GSAP撰寫互動動畫，並串接中央氣象局天氣API。
- 營地預約：營區類型篩選，將VCalendar與後端資料庫串接顯示剩餘營位數量，並通過步驟條組件經由sessionStorage掌控使用者當前操作步驟。
- 線上選物：商品搜尋、篩選和排序功能，Pinia.js購物車系統。
- 會員登入：使用JSON WEB TOKEN(JWT)進行加密登入，同時支援第三方line登入。

## 貢獻者
<a href="https://github.com/victor6835">
  <img src="https://github.com/victor6835.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="莊程富">
</a>
<a href="https://github.com/tiffany1029tw">
  <img src="https://github.com/tiffany1029tw.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="江坤桂">
</a>
<a href="https://github.com/ortis88">
  <img src="https://github.com/ortis88.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="陳柏廷">
</a>
<a href="https://github.com/nan-sansan">
  <img src="https://github.com/nan-sansan.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="莊乃潔">
</a>
<a href="https://github.com/hsiaoyingchen">
  <img src="https://github.com/hsiaoyingchen.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="陳曉穎">
</a>
<a href="https://github.com/rillala">
  <img src="https://github.com/rillala.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="林育潔">
</a>
<a href="https://github.com/ingridkao">
  <img src="https://github.com/ingridkao.png?size=50" style="border-radius: 50%; border: 1px solid black;" alt="小龜老師">
</a>

