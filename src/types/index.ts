export interface TestResult {
  qid: string;
  q: string;
  a: string;
  b: string;
  c: string;
  d: string;
  student_answer: string;
  response: string;
  ans: string;
  iswrong?: string;
  explanation?: string;
}

export interface Test {
  _id: { $oid: string };
  test_id: string;
  username: string;
  grade: string;
  obtained_marks: number;
  total_marks: number;
  result: TestResult[];
  school: string;
  section: string;
  status: string;
  status_login: string;
  subject: string;
  teacher: string;
  topic: string;
  time: { $date: string };
  time_left: string | number;
  __copied_from: string;
}

export interface SubjectData {
  tests: {
    base: Test[];
    eol: Test[];
    genai: Test[];
  };
  count_eol: number;
  average_eol: number;
  percentage_eol: number;
  weak_eol: string[];
  strong_eol: string[];
  descriptive_eol: string;
  prescriptive_eol: string;
  count_fa: number;
  percentage_fa: number;
  count_sa: number;
  percentage_sa: number;
  current_score: number;
  predicted_score: number;
}

export interface GradeData {
  subjects: Record<string, SubjectData>;
  overall_score: number;
  descriptive_overall: string;
  prescriptive_overall: string;
}

export interface Student {
  _id: { $oid: string };
  username: string;
  grades: Record<string, GradeData>;
  updated_at: { $date: string };
}
