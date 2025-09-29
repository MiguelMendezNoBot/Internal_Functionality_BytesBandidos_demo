import mongoose from 'mongoose';

const TextBoxSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'El contenido es requerido'],
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.models.TextBox || mongoose.model('TextBox', TextBoxSchema);