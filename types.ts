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

// PM Academy Types
export interface Profile {
  id: string;
  full_name: string;
  company_name?: string;
  avatar_url?: string;
  role: 'student' | 'admin' | 'instructor';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  duration_minutes: number;
  published: boolean;
  modules?: Module[];
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  sort_order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content_type: 'video' | 'article' | 'slides' | 'scorm';
  content_url: string;
  duration_minutes: number;
  sort_order: number;
  completed?: boolean; // For UI state
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
  completed_at?: string;
  course?: Course;
}

export interface Quiz {
  id: string;
  module_id: string;
  title: string;
  passing_score: number;
  questions?: Question[];
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  points: number;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  issue_date: string;
  certificate_code: string;
  pdf_url: string;
  user?: Profile;
  course?: Course;
}
