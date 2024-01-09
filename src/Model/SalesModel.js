const mongoose=require('mongoose')
const SalesSchema =mongoose.Schema({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {timestamps:true,versionKey:false});
  
  const SalesModel = mongoose.model('sales', SalesSchema);
  
  module.exports = SalesModel;