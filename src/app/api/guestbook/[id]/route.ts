import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/db";
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.messages.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: "Message deleted" });
}