import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import Post from '@/models/Post';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: posts
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error al obtener los posts'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { title, content } = body;
    
    if (!title || !content) {
      return NextResponse.json({
        success: false,
        error: 'Título y contenido son requeridos'
      }, { status: 400 });
    }
    
    const post = await Post.create({ title, content });
    
    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error al crear el post'
    }, { status: 500 });
  }
}