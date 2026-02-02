import './ProgressChart.css';

interface ProgressChartProps {
  currentScore: number;
  predictedScore: number;
  title?: string;
}

const formatScore = (score: number): string => {
  return Number.isInteger(score) ? score.toString() : score.toFixed(2);
};

export function ProgressChart({ currentScore, predictedScore, title = 'Score Progress' }: ProgressChartProps) {
  const maxScore = 100;
  const gradeThresholds = [
    { grade: 'A', min: 90 },
    { grade: 'B', min: 75 },
    { grade: 'C', min: 60 },
    { grade: 'D', min: 40 },
    { grade: 'F', min: 0 },
  ];

  const getCurrentGrade = (score: number): string => {
    const threshold = gradeThresholds.find(t => score >= t.min);
    return threshold?.grade || 'F';
  };

  const getNextGradeInfo = (score: number): { grade: string; pointsNeeded: number } | null => {
    const currentIndex = gradeThresholds.findIndex(t => score >= t.min);
    if (currentIndex <= 0) return null;
    const nextThreshold = gradeThresholds[currentIndex - 1];
    return {
      grade: nextThreshold.grade,
      pointsNeeded: nextThreshold.min - score,
    };
  };

  const currentGrade = getCurrentGrade(currentScore);
  const nextGradeInfo = getNextGradeInfo(currentScore);

  return (
    <div className="progress-chart" role="region" aria-label={title}>
      <h3 className="chart-title">{title}</h3>

      <div className="score-display">
        <div className="current-score-box">
          <span className="score-label">Current</span>
          <span className="score-number">{formatScore(currentScore)}%</span>
          <span className="grade-badge">{currentGrade}</span>
        </div>
        <div className="score-arrow" aria-hidden="true">→</div>
        <div className="predicted-score-box">
          <span className="score-label">Predicted</span>
          <span className="score-number">{formatScore(predictedScore)}%</span>
          <span className="grade-badge predicted">{getCurrentGrade(predictedScore)}</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="grade-markers" aria-hidden="true">
          {gradeThresholds.slice(0, -1).map((t) => (
            <div
              key={t.grade}
              className="grade-marker"
              style={{ left: `${t.min}%` }}
            >
              <span className="marker-line"></span>
              <span className="marker-label">{t.grade}</span>
            </div>
          ))}
        </div>
        <div className="progress-track">
          <div
            className="progress-fill current"
            style={{ width: `${currentScore}%` }}
            role="progressbar"
            aria-valuenow={currentScore}
            aria-valuemin={0}
            aria-valuemax={maxScore}
            aria-label="Current score"
          />
          {predictedScore > currentScore && (
            <div
              className="progress-fill predicted"
              style={{
                left: `${currentScore}%`,
                width: `${predictedScore - currentScore}%`
              }}
              role="progressbar"
              aria-valuenow={predictedScore}
              aria-valuemin={0}
              aria-valuemax={maxScore}
              aria-label="Predicted improvement"
            />
          )}
        </div>
      </div>

      {nextGradeInfo && currentScore < 90 && (
        <div className="grade-threshold-note">
          <strong>How to go from here:</strong> You need <span className="points-needed">{formatScore(nextGradeInfo.pointsNeeded)} more points</span> to reach grade {nextGradeInfo.grade}.
        </div>
      )}
    </div>
  );
}
