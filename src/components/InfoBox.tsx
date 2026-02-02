import './InfoBox.css';

interface InfoBoxProps {
  title: string;
  content: string;
  variant?: 'descriptive' | 'prescriptive';
}

export function InfoBox({ title, content, variant = 'descriptive' }: InfoBoxProps) {
  if (!content) {
    return (
      <div className={`info-box ${variant}`} role="region" aria-label={title}>
        <h3 className="info-box-title">{title}</h3>
        <p className="info-box-content empty">No data available</p>
      </div>
    );
  }

  return (
    <div className={`info-box ${variant}`} role="region" aria-label={title}>
      <h3 className="info-box-title">{title}</h3>
      <p className="info-box-content">{content}</p>
    </div>
  );
}
