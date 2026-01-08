export type PublicationCategory =
  | 'AmacaGel Platform'
  | 'Biologics Cell'
  | 'Small Molecules'
  | 'Polymers'
  | 'Hydrogels'
  | 'Drug Delivery';

export interface PublicationType {
  _id?: string;              // optional for frontend
  title: string;
  authors: string[];
  journal?: string;
  publicationDate: string;   // ISO string for frontend
  category: PublicationCategory;
  abstract?: string;
  pdfUrl?: string;
  fileName?: string;
  fileSize?: number;
  viewCount?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
