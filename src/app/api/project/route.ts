import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR  = join(process.cwd(), 'data');
const DATA_FILE = join(DATA_DIR, 'portfolio.json');

// GET — renvoie les données du projet sauvegardé
export async function GET() {
  if (!existsSync(DATA_FILE)) {
    return NextResponse.json({});
  }
  const content = readFileSync(DATA_FILE, 'utf-8');
  return new NextResponse(content, {
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST — sauvegarde les données dans data/portfolio.json
export async function POST(request: NextRequest) {
  const body = await request.text();
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, body, 'utf-8');
  return NextResponse.json({ success: true });
}
