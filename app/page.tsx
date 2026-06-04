'use client';
import { useState } from 'react';

const initialProducts = [
  { _id: '1', name: 'Amul Milk 1L', category: 'Dairy', quantity: 50, expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), ourPrice: 60, competitorPrice: 51, riskScore: 90 },
  { _id: '2', name: 'Nestle KitKat 12pk', category: 'Confectionery', quantity: 35, expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), ourPrice: 240, competitorPrice: 199, riskScore: 88 },
  { _id: '3', name: 'Maggi Noodles 12pk', category: 'FMCG', quantity: 100, expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), ourPrice: 180, competitorPrice: 160, riskScore: 82 },
  { _id: '4', name: 'Tropicana Orange 1L', category: 'Beverages', quantity: 25, expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), ourPrice: 99, competitorPrice: 85, riskScore: 75 },
  { _id: '5', name: 'Britannia Bread', category: 'Bakery', quantity: 30, expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), ourPrice: 45, competitorPrice: 40, riskScore: 70 },
  { _id: '6', name: 'Dettol Soap 4pk', category: 'Personal Care', quantity: 45, expiryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), ourPrice: 120, competitorPrice: 110, riskScore: 60 },
  { _id: '7', name: 'Head & Shoulders 200ml', category: 'Personal Care', quantity: 20, expiryDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), ourPrice: 220, competitorPrice: 200, riskScore: 45 },
  { _id: '8', name: 'Colgate MaxFresh 150g', category: 'Personal Care', quantity: 60, expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), ourPrice: 89, competitorPrice: 82, riskScore: 20 },
  { _id: '9', name: "Lay's Classic 100g", category: 'Snacks', quantity: 40, expiryDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), ourPrice: 30, competitorPrice: 28, riskScore: 35 },
  { _id: '10', name: 'India Gate Basmati 5kg', category: 'Grains', quantity: 80, expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), ourPrice: 650, competitorPrice: 640, riskScore: 5 },
];

export default function Home() {
  const [products, setProducts] = useState(initialProducts);

  const applyMarkdown = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p._id !== id) return p;
      const newPrice = Math.floor(p.competitorPrice * 0.98);
      return { ...p, ourPrice: newPrice, riskScore: Math.max(0, p.riskScore - 30) };
    }));
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'bg-red-100 text-red-800';
    if (score >= 50) return 'bg-orange-100 text-orange-800';
    if (score >= 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getRiskLabel = (score) => {
    if (score >= 80) return '🔴 Critical';
    if (score >= 50) return '🟠 High';
    if (score >= 25) return '🟡 Medium';
    return '✅ Safe';
  };

  const criticalCount = products.filter(p => p.riskScore >= 80).length;
  const potentialLoss = products
    .filter(p => p.riskScore >= 50)
    .reduce((sum, p) => sum + (p.ourPrice - p.competitorPrice) * p.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🛡️ Loss Prevention Dashboard</h1>
            <p className="text-gray-500 mt-1">Real-time inventory risk monitoring</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">Critical Items</p>
            <p className="text-3xl font-bold text-red-600">{criticalCount} 🔴</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500 text-sm">Potential Loss</p>
            <p className="text-3xl font-bold text-orange-600">₹{potentialLoss.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 text-gray-700 font-semibold">Product</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Category</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Expiry</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Our Price</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Comp. Price</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Risk</th>
                <th className="text-left p-4 text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const daysLeft = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold text-gray-900">{product.name}</td>
                    <td className="p-4 text-gray-900">{product.category}</td>
                    <td className="p-4">
                      <span className={daysLeft <= 3 ? 'text-red-600 font-bold' : 'text-gray-900'}>
                        {daysLeft}d left
                      </span>
                    </td>
                    <td className="p-4 text-gray-900 font-medium">₹{product.ourPrice}</td>
                    <td className="p-4 text-gray-900 font-medium">₹{product.competitorPrice}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskColor(product.riskScore)}`}>
                        {getRiskLabel(product.riskScore)} ({product.riskScore})
                      </span>
                    </td>
                    <td className="p-4">
                      <button onClick={() => applyMarkdown(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">
                        📉 Markdown
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}