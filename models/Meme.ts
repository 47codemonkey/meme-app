import mongoose, { Schema, model, models } from 'mongoose';

const MemeSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },

    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [100, 'Name must be at most 100 characters'],
    },

    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: (v: string) => /^https?:\/\/.+\.(jpe?g)$/i.test(v),
        message: 'Image URL must be a valid JPG link',
      },
    },

    likes: {
      type: Number,
      required: [true, 'Likes count is required'],
      min: [0, 'Likes must be at least 0'],
      max: [99, 'Likes must be at most 99'],
      default: () => Math.floor(Math.random() * 100),
    },
  },
  { timestamps: true }
);

export default models.Meme || model('Meme', MemeSchema);
