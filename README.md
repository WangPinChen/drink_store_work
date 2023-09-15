# Drink Store Web APP
使用 Node.js 搭配後端框架 Express 打造一個飲料店前後台網站，資料庫採用MongoDB。
# Features:功能
-網站前台:提供一般使用者瀏覽飲料店對外相關資訊
 -首頁:
  -提供跑馬燈橫幅宣傳飲料店活動
  -列出六筆熱門飲品
  -簡短品牌故事
 -門市資訊:
  -列出所有門店相關資訊
  -提供下拉選單進行地區篩選
 -飲品清單:
  -列出所有飲品
  -熱門飲品出現熱門標籤
 -關於我們:
  -搭配圖文呈現「我們的故事」﹑「我們的店內環境」﹑「品質保證」  

-網站後台:提供管理者進行飲品﹑門市據點﹑帳號管理
 -後台使用必須輸入帳號密碼
 -可進行飲品新增
 -飲品可放置照片﹑是否為熱門﹑是否已失效以及備註。
 -可增刪修門市據點
 -可進行一般帳號新增
 -一般帳號僅能修改自己密碼，無法刪除以及新增帳號
 -管理者帳號可進行帳號新增﹑所有帳號密碼修改以及刪除
 -管理者帳號無法被刪除

  # Environment Setup：環境安裝
- Node.js:v14.16.0
- Express.js:4.16.4
- Express-handlebars:^3.0.0

# Installing Procedure：安裝流程
1.開啟終端機將專案存至本機:
```
git clone https://github.com/WangPinChen/drink_store_work.git
```
2.進入存放此專案的資料夾
```
3.環境變數設定
將根目錄.env.example檔案中輸入MongoDB的URI﹑imgur金鑰，再把.env.example檔案名稱修改為.env

4.安裝 npm 套件
```
npm install
```
5.加入種子資料
```
npm run seeder
```
6.啟動專案
```
npm run dev
```
7.使用
終端機出現下列訊息" "App is running on http://localhost:3000"
可開啟瀏覽器輸入 http://localhost:3000 使用

8.Seed data
-管理者帳號密碼預設為: admin / 12345678
-20筆預設飲品資料
-10筆預設門市資料
