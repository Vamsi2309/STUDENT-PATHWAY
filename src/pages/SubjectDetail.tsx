import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AssessmentTile } from '../components/AssessmentTile';
import { ProgressChart } from '../components/ProgressChart';
import { InfoBox } from '../components/InfoBox';
import { SubjectButton } from '../components/SubjectButton';
import { useStudentData } from '../hooks/useStudentData';
import type { Student, SubjectData } from '../types';
import './SubjectDetail.css';

export function SubjectDetail() {
  const { name } = useParams<{ name: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { students, loading, error } = useStudentData();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const selectedGrade = 'Grade 8';

  const subjectName = name ? decodeURIComponent(name) : '';

  useEffect(() => {
    if (students.length > 0) {
      const studentUsername = searchParams.get('student');
      if (studentUsername) {
        const student = students.find(s => s.username === studentUsername);
        setSelectedStudent(student || students[0]);
      } else {
        setSelectedStudent(students[0]);
      }
    }
  }, [students, searchParams]);

  if (loading) {
    return (
      <div className="loading" role="status" aria-label="Loading">
        <div className="spinner" aria-hidden="true"></div>
        <p>Loading subject data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" role="alert">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <Link to="/" className="back-link">Return to Dashboard</Link>
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <div className="error" role="alert">
        <h2>No Student Data</h2>
        <p>No student data is available.</p>
        <Link to="/" className="back-link">Return to Dashboard</Link>
      </div>
    );
  }

  const gradeData = selectedStudent.grades[selectedGrade];
  const subjects = gradeData?.subjects || {};
  const subjectData: SubjectData | undefined = subjects[subjectName];

  if (!subjectData) {
    return (
      <div className="error" role="alert">
        <h2>Subject Not Found</h2>
        <p>The subject "{subjectName}" was not found for this student.</p>
        <Link to="/" className="back-link">Return to Dashboard</Link>
      </div>
    );
  }

  const strongTopics = subjectData.strong_eol || [];
  // Filter out topics from weak that also appear in strong (data inconsistency)
  const weakTopics = (subjectData.weak_eol || []).filter(
    topic => !strongTopics.includes(topic)
  );

  return (
    <div className="subject-detail">
      <header className="detail-header">
        <div className="header-left">
          <Link
            to={`/?student=${encodeURIComponent(selectedStudent.username)}`}
            className="back-button"
            aria-label="Back to Dashboard"
          >
            ← Back
          </Link>
          <h1>{subjectName}</h1>
        </div>
        <div className="student-selector">
          <label htmlFor="student-select" className="visually-hidden">Select Student</label>
          <select
            id="student-select"
            value={selectedStudent.username}
            onChange={(e) => {
              const student = students.find(s => s.username === e.target.value);
              if (student) {
                setSelectedStudent(student);
                setSearchParams({ student: student.username });
              }
            }}
          >
            {students.map((student) => (
              <option key={student._id.$oid} value={student.username}>
                {student.username.split('@')[0]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="detail-content">
        <div className="detail-main">
          <section className="assessment-section" aria-labelledby="assessments-title">
            <h2 id="assessments-title" className="section-title">Assessment Overview</h2>
            <div className="assessment-grid">
              <AssessmentTile
                type="EOL"
                count={subjectData.count_eol}
                percentage={subjectData.percentage_eol}
              />
              <AssessmentTile
                type="FA"
                count={subjectData.count_fa}
                percentage={subjectData.percentage_fa}
              />
              <AssessmentTile
                type="SA"
                count={subjectData.count_sa}
                percentage={subjectData.percentage_sa}
              />
            </div>
          </section>

          <section className="progress-section" aria-labelledby="progress-title">
            <h2 id="progress-title" className="section-title">Score Progress</h2>
            <ProgressChart
              currentScore={subjectData.current_score}
              predictedScore={subjectData.predicted_score}
              title={`${subjectName} Performance`}
            />
          </section>

          {(weakTopics.length > 0 || strongTopics.length > 0) && (
            <section className="topics-section" aria-labelledby="topics-title">
              <h2 id="topics-title" className="section-title">Topic Analysis</h2>
              <div className="topics-grid">
                {weakTopics.length > 0 && (
                  <div className="topic-box weak">
                    <h3>Areas to Improve</h3>
                    <ul>
                      {weakTopics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {strongTopics.length > 0 && (
                  <div className="topic-box strong">
                    <h3>Strong Areas</h3>
                    <ul>
                      {strongTopics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="info-section" aria-labelledby="subject-analysis">
            <h2 id="subject-analysis" className="section-title">{subjectName} Analysis</h2>
            <div className="info-grid">
              <InfoBox
                title={`Descriptive (${subjectName})`}
                content={subjectData.descriptive_eol}
                variant="descriptive"
              />
              <InfoBox
                title={`Prescriptive (${subjectName})`}
                content={subjectData.prescriptive_eol}
                variant="prescriptive"
              />
            </div>
          </section>
        </div>

        <aside className="detail-sidebar" aria-label="Other Subjects">
          <h2 className="sidebar-title">Other Subjects</h2>
          <nav className="subject-list" aria-label="Subject navigation">
            {Object.entries(subjects).map(([subjName, data]) => (
              <SubjectButton
                key={subjName}
                name={subjName}
                data={data}
                isActive={subjName === subjectName}
                studentUsername={selectedStudent.username}
              />
            ))}
          </nav>
        </aside>
      </main>
    </div>
  );
}
