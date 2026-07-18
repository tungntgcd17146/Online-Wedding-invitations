import { NextResponse } from 'next/server';
import { getWishes, addWish } from '@/lib/googleSheets';

export async function GET() {
  try {
    const wishes = await getWishes();
    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    console.error('API GET /api/wishes error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tải danh sách lời chúc.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message, row } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập tên của bạn.' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập lời chúc của bạn.' },
        { status: 400 }
      );
    }

    const newWish = await addWish(name.trim(), message.trim(), row);
    return NextResponse.json({ success: true, data: newWish });
  } catch (error) {
    console.error('API POST /api/wishes error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể lưu lời chúc. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
