import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Publication title is required'],
      trim: true,
      maxlength: [500, 'Title cannot exceed 500 characters']
    },
    authors: {
      type: [String],
      required: [true, 'Authors are required'],
      validate: {
        validator: function(v: string[]) {
          return v.length > 0;
        },
        message: 'At least one author is required'
      }
    },
    journal: {
      type: String,
      required: [true, 'Journal name is required'],
      trim: true
    },
    publicationDate: {
      type: Date,
      required: [true, 'Publication date is required']
    },
    category: {
      type: String,
      enum: ['AmacaGel Platform', 'Biologics and Cell', 'Small Molecules', 'Polymers', 'Hydrogels', 'Drug Delivery'],
      required: [true, 'Category is required'],
      default: 'AmacaGel Platform'
    },
    abstract: {
      type: String,
      required: [true, 'Abstract is required'],
      trim: true
    },
    abstractUrl: {
      type: String,
      trim: true,
      default: null
    },
    pdfUrl: {
      type: String,
      trim: true
    },
    fileName: {
      type: String,
      trim: true
    },
    fileSize: {
      type: Number
    },
    viewCount: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Create text index for search
publicationSchema.index({ title: 'text', abstract: 'text', authors: 'text' });

export default mongoose.models.Publication || mongoose.model('Publication', publicationSchema);