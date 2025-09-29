export interface Post {
  _id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TextBox {
  _id?: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  age: number;
  location: string;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}