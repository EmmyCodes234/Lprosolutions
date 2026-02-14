import { supabase } from '../lib/supabase';

export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    duration_minutes: number;
    category: string;
    level: string;
    published: boolean;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    sort_order: number;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    content_type: 'video' | 'article' | 'slides' | 'scorm';
    content_url: string;
    duration_minutes: number;
    sort_order: number;
    completed?: boolean;
}

export interface Enrollment {
    id: string;
    course_id: string;
    progress: number;
    status: 'active' | 'completed' | 'dropped';
    last_accessed_at: string;
}

export const AcademyService = {

    // Fetch all published courses
    async getCourses() {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Course[];
    },

    // Fetch a single course with modules and lessons
    async getCourseDetails(courseId: string) {
        const { data, error } = await supabase
            .from('courses')
            .select(`
        *,
        modules (
          id,
          title,
          description,
          sort_order,
          lessons (
            id,
            title,
            content_type,
            duration_minutes,
            sort_order
          )
        )
      `)
            .eq('id', courseId)
            .single();

        if (error) throw error;

        // Sort modules and lessons
        if (data && data.modules) {
            data.modules.sort((a: any, b: any) => a.sort_order - b.sort_order);
            data.modules.forEach((module: any) => {
                if (module.lessons) {
                    module.lessons.sort((a: any, b: any) => a.sort_order - b.sort_order);
                }
            });
        }

        return data;
    },

    // Enroll a user in a course
    async enrollInCourse(userId: string, courseId: string) {
        const { data, error } = await supabase
            .from('enrollments')
            .insert([{ user_id: userId, course_id: courseId, status: 'active', progress: 0 }])
            .select()
            .single();

        if (error) {
            // Check if already enrolled
            if (error.code === '23505') { // Unique violation
                return AcademyService.getEnrollment(userId, courseId);
            }
            throw error;
        }
        return data;
    },

    // Get user's enrollment for a specific course
    async getEnrollment(userId: string, courseId: string) {
        const { data, error } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .maybeSingle();

        if (error) throw error;
        return data;
    },

    // Get all user enrollments
    async getUserEnrollments(userId: string) {
        const { data, error } = await supabase
            .from('enrollments')
            .select(`
            *,
            course:courses (
                title,
                thumbnail_url,
                category,
                level
            )
        `)
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    },

    // Mark a lesson as complete
    async completeLesson(userId: string, lessonId: string) {
        const { error } = await supabase
            .from('lesson_completions')
            .upsert({ user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() });

        if (error) throw error;
    },

    // Get user's certificates
    async getUserCertificates(userId: string) {
        const { data, error } = await supabase
            .from('certificates')
            .select(`
                *,
                course:courses(title)
            `)
            .eq('user_id', userId)
            .order('issued_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    // Verify Certificate
    async verifyCertificate(certificateCode: string) {
        const { data, error } = await supabase
            .from('certificates')
            .select(`
            *,
            user:profiles(full_name),
            course:courses(title)
        `)
            .eq('certificate_code', certificateCode)
            .single();

        if (error) throw error;
        return data;
    },

    // Admin Stats
    async getAdminStats() {
        const { count: enrollmentsCount } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });
        const { count: activeCoursesCount } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('published', true);
        const { count: certificatesCount } = await supabase.from('certificates').select('*', { count: 'exact', head: true });

        // Revenue is mocked for now as we don't have a payments table yet

        return {
            enrollments: enrollmentsCount || 0,
            activeCourses: activeCoursesCount || 0,
            certificates: certificatesCount || 0
        };
    }
};
