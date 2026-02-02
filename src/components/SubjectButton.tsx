import { Link } from 'react-router-dom';
import type { SubjectData } from '../types';
import './SubjectButton.css';

interface SubjectButtonProps {
  name: string;
  data: SubjectData;
  isActive?: boolean;
  studentUsername?: string;
}

const subjectIcons: Record<string, string> = {
  'English': '📖',
  'Math': '🔢',
  'Physics': '⚛️',
  'Chemistry': '🧪',
  'Biology': '🧬',
  'History': '📜',
  'Geography': '🌍',
  'Design': '🎨',
  'ESL': '🗣️',
};

export function SubjectButton({ name, data, isActive, studentUsername }: SubjectButtonProps) {
  const icon = subjectIcons[name] || '📚';
  const score = data.current_score;

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    if (score > 0) return 'score-low';
    return 'score-zero';
  };

  const linkUrl = studentUsername
    ? `/subject/${encodeURIComponent(name)}?student=${encodeURIComponent(studentUsername)}`
    : `/subject/${encodeURIComponent(name)}`;

  return (
    <Link
      to={linkUrl}
      className={`subject-button ${isActive ? 'active' : ''}`}
      aria-label={`${name} - Current score: ${score}%`}
    >
      <span className="subject-icon" aria-hidden="true">{icon}</span>
      <span className="subject-name">{name}</span>
      <span className={`subject-score ${getScoreColor(score)}`}>
        {score > 0 ? `${score}%` : 'N/A'}
      </span>
    </Link>
  );
}
