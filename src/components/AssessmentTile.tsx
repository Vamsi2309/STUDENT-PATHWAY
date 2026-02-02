import './AssessmentTile.css';

interface AssessmentTileProps {
  type: 'EOL' | 'FA' | 'SA';
  count: number;
  percentage: number;
}

const typeLabels: Record<string, string> = {
  'EOL': 'End of Lesson',
  'FA': 'Formative Assessment',
  'SA': 'Summative Assessment',
};

const typeColors: Record<string, string> = {
  'EOL': '#8b5cf6',
  'FA': '#f59e0b',
  'SA': '#ef4444',
};

export function AssessmentTile({ type, count, percentage }: AssessmentTileProps) {
  const hasData = count > 0 || percentage > 0;

  return (
    <div
      className="assessment-tile"
      role="region"
      aria-label={`${typeLabels[type]} assessment data`}
      style={{ '--tile-color': typeColors[type] } as React.CSSProperties}
    >
      <div className="tile-header">
        <span className="tile-type">{type}</span>
        <span className="tile-label">{typeLabels[type]}</span>
      </div>
      <div className="tile-body">
        {hasData ? (
          <>
            <div className="tile-stat">
              <span className="stat-value">{count}</span>
              <span className="stat-label">Tasks</span>
            </div>
            <div className="tile-stat">
              <span className="stat-value">{percentage}%</span>
              <span className="stat-label">Score</span>
            </div>
          </>
        ) : (
          <div className="tile-empty">
            <span>No assessments yet</span>
          </div>
        )}
      </div>
      <div className="tile-progress">
        <div
          className="tile-progress-bar"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
