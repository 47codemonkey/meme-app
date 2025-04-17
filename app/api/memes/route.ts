import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import MemeModel from '@/models/Meme';

interface RawMeme {
  id: number;
  name: string;
  likes: number;
  imageUrl: string;
}

export async function GET(request: NextRequest) {
  await dbConnect();
  const memes = await MemeModel.find({}).lean();

  const { origin } = new URL(request.url);

  const mapped = memes.map((m) => ({
    id: m.id,
    name: m.name,
    likes: m.likes,
    imageUrl: `${origin}/images/${m.imageUrl}`,
  }));

  return NextResponse.json(mapped);
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { id, name, likes } = await request.json();

    const updated = await MemeModel.findOneAndUpdate<RawMeme>(
      { id },
      { name, likes },
      { new: true }
    )
      .lean<RawMeme>()
      .exec();

    if (!updated) {
      return new NextResponse('Meme not found', { status: 404 });
    }

    const { origin } = new URL(request.url);
    const mapped = {
      id: updated.id,
      name: updated.name,
      likes: updated.likes,
      imageUrl: `${origin}/images/${updated.imageUrl}`,
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error updating meme', { status: 500 });
  }
}
