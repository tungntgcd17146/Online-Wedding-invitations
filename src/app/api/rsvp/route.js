import { NextResponse } from 'next/server';
import { addRSVP } from '@/lib/googleSheets';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, attends, message, row } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập tên của bạn.' },
        { status: 400 }
      );
    }

    if (attends === undefined || attends === null) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn trạng thái tham dự.' },
        { status: 400 }
      );
    }

    const rsvpResult = await addRSVP(
      name.trim(),
      attends,
      (message || '').trim(),
      row
    );

    return NextResponse.json({ success: true, data: rsvpResult });
  } catch (error) {
    console.error('API POST /api/rsvp error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể gửi phản hồi. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
