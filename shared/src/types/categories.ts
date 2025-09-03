export interface ServiceCategory {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  description: string;
  parentCategory?: string;
  subCategories?: string[];
  sortOrder: number;
}