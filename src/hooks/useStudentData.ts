import { useState, useEffect } from 'react';
import type { Student } from '../types';

interface UseStudentDataResult {
  students: Student[];
  loading: boolean;
  error: string | null;
}

export function useStudentData(): UseStudentDataResult {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/grade8a.json');
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data: Student[] = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { students, loading, error };
}
