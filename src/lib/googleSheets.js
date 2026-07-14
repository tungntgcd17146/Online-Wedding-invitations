import { google } from 'googleapis';

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
// Thay thế các ký tự \n trong private key
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

// Nếu không cấu hình credentials, ta sẽ dùng mock data để chạy thử nghiệm local mượt mà
const isConfigured = clientEmail && privateKey && spreadsheetId;

let auth;
let sheets;

if (isConfigured) {
  try {
    auth = new google.auth.JWT(
      clientEmail,
      null,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    sheets = google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Lỗi khởi tạo Google Sheets API Client:', error);
  }
} else {
  console.warn('Google Sheets credentials chưa được cấu hình. Đang chạy ở chế độ MOCK (Local).');
}

// Lưu tạm lời chúc trên server (memory) khi chạy ở chế độ Mock
const mockWishes = [
  { timestamp: '08/07/2026 22:00:00', name: 'Anh Việt Anh', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm đón quý tử nhé!' },
  { timestamp: '08/07/2026 22:05:00', name: 'Chị Quỳnh Chi', message: 'Mừng ngày vui của hai em! Trông hai bạn đẹp đôi lắm luôn á.' },
  { timestamp: '08/07/2026 22:15:00', name: 'Bạn Hoàng Nam', message: 'Happy Wedding! Chúc mừng hai vợ chồng nha.' },
];

export async function getWishes() {
  if (!isConfigured || !sheets) {
    return mockWishes;
  }
  try {
    // Đọc từ tab "Wishes", cột A (Thời gian), B (Tên), C (Lời chúc)
    const range = 'Wishes!A2:C500';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values || [];
    return rows.map((row) => ({
      timestamp: row[0] || '',
      name: row[1] || '',
      message: row[2] || '',
    }));
  } catch (error) {
    console.error('Lỗi khi đọc lời chúc từ Google Sheets:', error);
    return mockWishes; // Fallback về mock data nếu lỗi kết nối
  }
}

export async function addWish(name, message) {
  if (!isConfigured || !sheets) {
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const newWish = { timestamp, name, message };
    mockWishes.unshift(newWish); // Thêm lên đầu
    return newWish;
  }
  try {
    const range = 'Wishes!A:C';
    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, message]],
      },
    });
    return { timestamp, name, message };
  } catch (error) {
    console.error('Lỗi khi lưu lời chúc vào Google Sheets:', error);
    throw error;
  }
}
