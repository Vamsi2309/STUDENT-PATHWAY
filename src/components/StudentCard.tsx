import type { Student } from '../types';
import './StudentCard.css';

interface StudentCardProps {
  student: Student;
  grade: string;
}

export function StudentCard({ student, grade }: StudentCardProps) {
  const gradeData = student.grades[grade];
  const email = student.username;
  const name = email.split('@')[0].replace(/(\d+)/g, ' ').trim();
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="student-card" role="region" aria-label="Student Information">
      <div className="student-avatar" aria-hidden="true">
        {formattedName.charAt(0).toUpperCase()}
      </div>
      <div className="student-info">
        <h2 className="student-name">{formattedName}</h2>
        <p className="student-email">{email}</p>
        <p className="student-grade">{grade}</p>
        {gradeData && (
          <div className="overall-score">
            <span className="score-label">Overall Score:</span>
            <span className="score-value">{gradeData.overall_score.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
