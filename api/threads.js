// Vercel Serverless Function
// 檔案路徑: /api/threads.js

// 這個函式會處理所有對 /api/threads 的請求
// 我們加上 async 關鍵字，因為我們要使用 await fetch
export default async function handler(request, response) {
  
  // 從 Vercel 的環境變數中讀取我們設定好的 Access Token
  // process.env.VARIABLE_NAME 是 Node.js 讀取環境變數的方式
  const accessToken = process.env.THREADS_ACCESS_TOKEN;

  // 如果因為某些原因伺服器找不到 Access Token，回傳錯誤訊息
  if (!accessToken) {
    // 500 代表伺服器內部錯誤
    return response.status(500).json({ error: '伺服器未正確設定 THREADS_ACCESS_TOKEN 環境變數。' });
  }

  // --- 連接真實的 Threads API ---
  // Threads API 的使用者端點 (endpoint)，'me' 代表我們自己
  // 我們向 API 請求 id, username, 和 threads_profile_picture_url 這幾個欄位
  const fields = 'id,username,threads_profile_picture_url';
  const apiUrl = `https://graph.threads.net/v1.0/me?fields=${fields}&access_token=${accessToken}`;

  try {
    // 使用 fetch 向 Threads API 發送請求
    const apiResponse = await fetch(apiUrl);

    // 解析從 API 收到的 JSON 資料 (無論成功或失敗，都可能有內容)
    const data = await apiResponse.json();

    // 如果 API 回應不成功 (例如 token 失效、權限不足等)
    if (!apiResponse.ok) {
      // 將 API 回傳的完整錯誤訊息回傳給前端，方便我們除錯
      return response.status(apiResponse.status).json({
        error: '無法從 Threads API 取得資料，請檢查權杖或權限。',
        details: data
      });
    }
    
    // 設定回應的標頭 (Header)，告訴瀏覽器我們回傳的是 JSON 格式
    response.setHeader('Content-Type', 'application/json');

    // 將從 API 拿到的真實資料回傳給前端
    response.status(200).json(data);

  } catch (error) {
    // 如果在過程中發生任何網路或其他錯誤
    console.error('呼叫 Threads API 時發生無法預期的錯誤:', error);
    response.status(500).json({ error: '伺服器內部在呼叫 API 時發生錯誤。' });
  }
} 