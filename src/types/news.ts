import mongoose, { Document, Types } from 'mongoose';

// Main interface extending Mongoose Document
export interface INews extends Document {
  mainHeading: string;
  subHeading: string;
  date: Date;
  pressReleaseLink?: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: number;
  videoUrl?: string;
  content: string;
  uploadedBy: Types.ObjectId;
  viewCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Virtuals
  formattedDate?: string;
  id: string;
}

// Lean type (without Mongoose methods) for API responses
export type NewsLean = {
  _id: string;
  mainHeading: string;
  subHeading: string;
  date: Date;
  pressReleaseLink?: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: number;
  videoUrl?: string;
  content: string;
  uploadedBy: string | { _id: string; name: string }; // Can be populated
  viewCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  formattedDate?: string;
};

// For creating new news items
export interface CreateNewsDto {
  mainHeading: string;
  subHeading: string;
  date: string | Date;
  pressReleaseLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  content: string;
  isPublished?: boolean;
}

// For updating news items
export interface UpdateNewsDto {
  mainHeading?: string;
  subHeading?: string;
  date?: string | Date;
  pressReleaseLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  content?: string;
  isPublished?: boolean;
}

// For API responses
export interface NewsApiResponse {
  success: boolean;
  data: NewsLean[];
  total: number;
  page?: number;
  totalPages?: number;
}

// For the NewsGrid component (simplified version)
export interface NewsItemForGrid {
  _id: string;
  mainHeading: string;
  subHeading: string;
  date: string; // ISO string
  formattedDate?: string;
  imageUrl?: string;
  viewCount: number;
}

// For single news detail page
export interface NewsDetail extends NewsLean {
  // Additional properties for detail view
  nextNews?: { _id: string; mainHeading: string };
  prevNews?: { _id: string; mainHeading: string };
  relatedNews?: NewsItemForGrid[];
}

// For search/filter queries
export interface NewsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  year?: number;
  month?: number;
  sortBy?: 'date' | 'viewCount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Model type for TypeScript
export type NewsModel = mongoose.Model<INews> & {
  // You can add static methods here
  findPublished: () => Promise<INews[]>;
  findByYear: (year: number) => Promise<INews[]>;
};