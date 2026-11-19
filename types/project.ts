export type ServiceCategory =
  | "electrical"
  | "carpentry"
  | "painting"
  | "ceiling";

export interface BeforeAfterMedia {
  url: string;
  mediaType: "IMAGE" | "VIDEO";
  caption?: string;
  altText?: string;
  label?: string;
}

export interface BeforeAfterPair {
  id: string;
  roomName: string;
  description?: string;
  mediaType: "IMAGE" | "VIDEO";
  before: BeforeAfterMedia;
  after: BeforeAfterMedia;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  location?: string;
  completedAt?: string;
  coverImage: string;
  images: string[];
  videos?: string[];
  featured: boolean;
  scopeHighlights?: string[];
  beforeAfterPairs?: BeforeAfterPair[];
}


