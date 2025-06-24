// Vercel Serverless Function
// 檔案路徑: /api/threads.js

// 這個函式會處理所有對 /api/threads 的請求
export default function handler(request, response) {
  
  // 為了安全，我們設定這個後端只接受 GET 請求
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // --- 模擬的 API 回應 ---
  // 在這裡，我們之後會加入與真實 Threads API 互動的程式碼。
  // 現在，我們先回傳一個固定的假資料，用來測試前後端串接是否成功。
  const mockData = {
    "data": [
      {
        "id": "thread_12345",
        "author": "markzuckerberg",
        "text": "這是第一則從模擬 API 來的貼文！ #測試",
        "timestamp": "2024-07-31T12:00:00Z",
        "likes": 150,
        "replies": 25
      },
      {
        "id": "thread_67890",
        "author": "instagram",
        "text": "歡迎來到 Threads API 的世界！",
        "timestamp": "2024-07-31T12:05:00Z",
        "likes": 2000,
        "replies": 180
      }
    ],
    "source": "Mock API on Vercel"
  };

  // 設定回應的標頭 (Header)，告訴瀏覽器我們回傳的是 JSON 格式
  response.setHeader('Content-Type', 'application/json');
  
  // 回傳 200 OK 狀態碼以及我們的模擬資料
  response.status(200).json(mockData);
} 