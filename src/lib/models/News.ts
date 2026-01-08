import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: [true, 'Main heading is required'],
      trim: true,
      maxlength: [500, 'Main heading cannot exceed 500 characters']
    },
    subHeading: {
      type: String,
      required: [true, 'Sub heading is required'],
      trim: true,
      maxlength: [500, 'Sub heading cannot exceed 500 characters']
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    },
    pressReleaseLink: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true; // Optional field
          return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
        },
        message: 'Please provide a valid URL'
      }
    },
    imageUrl: {
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
    videoUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          if (!v) return true; // Optional field
          return v.includes('youtube.com') || v.includes('youtu.be') || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
        },
        message: 'Please provide a valid video URL'
      }
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
      default: new mongoose.Types.ObjectId('6951330cfd1c108524a25858')
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
newsSchema.index({ mainHeading: 'text', subHeading: 'text', content: 'text' });

export default mongoose.models.News || mongoose.model('News', newsSchema);