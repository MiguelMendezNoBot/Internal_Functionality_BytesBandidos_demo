import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connection';
import TextBox from '@/models/TextBox';

export async function GET() {
  try {
    await connectDB();
    const textBoxes = await TextBox.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: textBoxes
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error al obtener los cuadros de texto'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { content } = body;
    
    if (!content) {
      return NextResponse.json({
        success: false,
        error: 'El contenido es requerido'
      }, { status: 400 });
    }
    
    const textBox = await TextBox.create({ content });
    
    return NextResponse.json({
      success: true,
      data: textBox
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error al crear el cuadro de texto'
    }, { status: 500 });
  }
}