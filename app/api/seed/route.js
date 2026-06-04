import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

const sampleProducts = [
  { name: "Amul Milk 1L", category: "Dairy", quantity: 50, expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), ourPrice: 60, competitorPrice: 51 },
  { name: "Britannia Bread", category: "Bakery", quantity: 30, expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), ourPrice: 45, competitorPrice: 40 },
  { name: "Head & Shoulders 200ml", category: "Personal Care", quantity: 20, expiryDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), ourPrice: 220, competitorPrice: 200 },
  { name: "Maggi Noodles 12pk", category: "FMCG", quantity: 100, expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), ourPrice: 180, competitorPrice: 160 },
  { name: "Dettol Soap 4pk", category: "Personal Care", quantity: 45, expiryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), ourPrice: 120, competitorPrice: 110 },
  { name: "India Gate Basmati 5kg", category: "Grains", quantity: 80, expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), ourPrice: 650, competitorPrice: 640 },
  { name: "Tropicana Orange 1L", category: "Beverages", quantity: 25, expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), ourPrice: 99, competitorPrice: 85 },
  { name: "Colgate MaxFresh 150g", category: "Personal Care", quantity: 60, expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), ourPrice: 89, competitorPrice: 82 },
  { name: "Lay's Classic 100g", category: "Snacks", quantity: 40, expiryDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), ourPrice: 30, competitorPrice: 28 },
  { name: "Nestle KitKat 12pk", category: "Confectionery", quantity: 35, expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), ourPrice: 240, competitorPrice: 199 },
];

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    return NextResponse.json({ success: true, message: '10 products seeded!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}