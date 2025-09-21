import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  // Validate URL param
  if (!url) {
    return NextResponse.json({ error: 'Missing `url` query param' }, { status: 400 });
  }

  try {
    const upstreamResponse = await fetch(url);

    if (!upstreamResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: upstreamResponse.status });
    }

    const contentType = upstreamResponse.headers.get('Content-Type') || 'image/png';
    const imageBuffer = await upstreamResponse.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json({ error: 'Image proxy failed' }, { status: 500 });
  }
}
