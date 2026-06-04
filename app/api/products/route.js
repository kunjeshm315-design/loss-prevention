import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

function calculateRiskScore(expiryDate, ourPrice, competitorPrice) {
  const daysLeft = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
  
  let expiryScore = 0;
  if (daysLeft <= 3) expiryScore = 100;
  else if (daysLeft <= 7) expiryScore = 75;
  else if (daysLeft <= 14) expiryScore = 50;
  else if (daysLeft <= 30) expiryScore = 25;

  const priceGap = ((ourPrice - competitorPrice) / ourPrice) * 100;
  let priceScore = 0;
  if (priceGap >= 20) priceScore = 100;
  else if (priceGap >= 10) priceScore = 75;
  else if (priceGap >= 5) priceScore = 50;
  else if (priceGap > 0) priceScore = 25;

  return Math.round((expiryScore * 0.6) + (priceScore * 0.4));
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    
    const productsWithRisk = products.map(p => ({
      ...p.toObject(),
      riskScore: calculateRiskScore(p.expiryDate, p.ourPrice, p.competitorPrice)
    }));

    productsWithRisk.sort((a, b) => b.riskScore - a.riskScore);
    
    return NextResponse.json({ success: true, data: productsWithRisk });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}