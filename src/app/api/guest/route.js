import { NextResponse } from 'next/server';
import { getGuestInfo } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const row = searchParams.get('row') || searchParams.get('id');

    if (!row) {
      return NextResponse.json(
        { success: false, error: 'Thiếu tham số row.' },
        { status: 400 }
      );
    }

    const guestInfo = await getGuestInfo(row);
    if (!guestInfo) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy khách mời.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: guestInfo });
  } catch (error) {
    console.error('API GET /api/guest error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi máy chủ khi lấy thông tin khách mời.' },
      { status: 500 }
    );
  }
}
