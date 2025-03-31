export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: number;
  imageId: number;
  isFavorite: boolean;
  theme: string;
  tier: string;
  title: string;
  author: Author;
}

export interface Author {
  avatar: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  onlineStatus: string;
}
