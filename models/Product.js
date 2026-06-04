import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  ourPrice: { type: Number, required: true },
  competitorPrice: { type: Number, required: true },
  riskScore: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Product || 
  mongoose.model('Product', ProductSchema);