// 共用function可以放在這邊

export const getDBImage = paths => {
  return `http://localhost/NORAapi/image/${paths}`;
  // return `https://tibamef2e.com/chd104/g1/image/${paths}`;
};

export const memberRedirect = () => {
  return `http://localhost:5173`;
  // return `https://tibamef2e.com/chd104/g1`;
};

// 資料庫中圖片路徑使用辦法:
// import { getDBImage } from "@/assets/js/common";

// methods:{
//     getDBImage(paths){
//     return getDBImage(paths);
//     },
// }
// paths == image資料架下的路徑和檔案名稱
// 到時候資料庫表格裡的圖片路徑, 就要輸入'paths'
