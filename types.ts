import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  rating: number;
}
