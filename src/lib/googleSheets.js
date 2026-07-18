// Quản lý kết nối tới Google Sheets qua Google Apps Script Web App
const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

// Lời chúc mock mặc định khi chạy ở chế độ chưa cấu hình biến môi trường
const mockWishes = [
  { timestamp: '08/07/2026 22:00:00', name: 'Anh Việt Anh', message: 'Chúc hai bạn trăm năm hạnh phúc, sớm đón quý tử nhé!' },
  { timestamp: '08/07/2026 22:05:00', name: 'Chị Quỳnh Chi', message: 'Mừng ngày vui của hai em! Trông hai bạn đẹp đôi lắm luôn á.' },
  { timestamp: '08/07/2026 22:15:00', name: 'Bạn Hoàng Nam', message: 'Happy Wedding! Chúc mừng hai vợ chồng nha.' },
];

/**
 * Lấy danh sách lời chúc để hiển thị ở Sổ lưu bút
 */
export async function getWishes() {
  if (!scriptUrl) {
    return mockWishes;
  }
  try {
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    const result = await response.json();
    if (result && result.success && result.data && Array.isArray(result.data)) {
      return result.data;
    }
    return mockWishes;
  } catch (error) {
    console.error('Lỗi khi tải lời chúc từ Google Apps Script:', error);
    return mockWishes;
  }
}

/**
 * Lấy thông tin chi tiết của một khách mời dựa trên số dòng (row)
 */
export async function getGuestInfo(row) {
  if (!scriptUrl || !row) {
    return null;
  }
  try {
    const response = await fetch(`${scriptUrl}?row=${row}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    const result = await response.json();
    if (result && result.success) {
      return result.data; // Trả về { row, name, attending, wish, updatedAt }
    }
    return null;
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin khách mời dòng ${row}:`, error);
    return null;
  }
}

/**
 * Lưu/Cập nhật lời chúc của khách mời tại dòng chỉ định
 */
export async function addWish(name, message, row) {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  
  if (!scriptUrl) {
    const newWish = { timestamp, name, message };
    mockWishes.unshift(newWish);
    return newWish;
  }

  try {
    // Nếu có dòng (row) chỉ định, ta gọi POST để cập nhật vào đúng dòng đó trong Google Sheet
    if (row) {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          row: parseInt(row),
          wish: message
        }),
      });
      const result = await response.json();
      if (result && result.success) {
        return { timestamp, name, message };
      }
      throw new Error(result.error || 'Cập nhật thất bại');
    }
    
    // Fallback: nếu không có dòng, ta có thể log ra cảnh báo
    console.warn('Không nhận được thông tin dòng (row) để cập nhật lời chúc.');
    return { timestamp, name, message };
  } catch (error) {
    console.error('Lỗi khi cập nhật lời chúc qua Google Apps Script:', error);
    throw error;
  }
}

/**
 * Lưu/Cập nhật trạng thái xác nhận tham dự (RSVP) của khách mời tại dòng chỉ định
 */
export async function addRSVP(name, attends, message, row) {
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  if (!scriptUrl) {
    return { timestamp, name, attends, message };
  }

  try {
    if (row) {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          row: parseInt(row),
          attending: attends === 'yes' || attends === true,
          wish: message || undefined
        }),
      });
      const result = await response.json();
      if (result && result.success) {
        return { timestamp, name, attends, message };
      }
      throw new Error(result.error || 'Cập nhật RSVP thất bại');
    }
    
    console.warn('Không nhận được thông tin dòng (row) để cập nhật RSVP.');
    return { timestamp, name, attends, message };
  } catch (error) {
    console.error('Lỗi khi cập nhật RSVP qua Google Apps Script:', error);
    throw error;
  }
}
