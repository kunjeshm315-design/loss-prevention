import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(
      params.id,
      { ourPrice: body.newPrice },
      { new: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}