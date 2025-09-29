import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/db';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 5;
    const skip = (page - 1) * limit;

    const [messages, totalCount] = await Promise.all([
      prisma.messages.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.messages.count()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, ucapan, isHadir } = body;

    // Validation
    if (!nama || !ucapan) {
      return NextResponse.json(
        { success: false, error: 'Nama and ucapan are required' },
        { status: 400 }
      );
    }

    const newMessage = await prisma.messages.create({
      data: {
        nama,
        ucapan,
        isHadir
      }
    });

    return NextResponse.json({
      success: true,
      data: newMessage
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create message' },
      { status: 500 }
    );
  }
}