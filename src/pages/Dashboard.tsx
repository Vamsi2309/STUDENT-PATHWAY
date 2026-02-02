import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StudentCard } from "../components/StudentCard";
import { SubjectButton } from "../components/SubjectButton";
import { InfoBox } from "../components/InfoBox";
import { useStudentData } from "../hooks/useStudentData";
import type { Student } from "../types";
import "./Dashboard.css";

export function Dashboard() {
  const { students, loading, error } = useStudentData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const selectedGrade = "Grade 8";

  useEffect(() => {
    if (students.length > 0) {
      const studentUsername = searchParams.get("student");
      if (studentUsername) {
        const student = students.find((s) => s.username === studentUsername);
        setSelectedStudent(student || students[0]);
      } else if (!selectedStudent) {
        setSelectedStudent(students[0]);
      }
    }
  }, [students, searchParams]);

  if (loading) {
    return (
      <div className="loading" role="status" aria-label="Loading">
        <div className="spinner" aria-hidden="true"></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error" role="alert">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <div className="error" role="alert">
        <h2>No Students Found</h2>
        <p>No student data is available.</p>
      </div>
    );
  }

  const gradeData = selectedStudent.grades[selectedGrade];
  const subjects = gradeData?.subjects || {};

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Personalised Learning Pathway</h1>
        <div className="student-selector">
          <label htmlFor="student-select" className="visually-hidden">
            Select Student
          </label>
          <select
            id="student-select"
            value={selectedStudent.username}
            onChange={(e) => {
              const student = students.find(
                (s) => s.username === e.target.value,
              );
              if (student) {
                setSelectedStudent(student);
                setSearchParams({ student: student.username });
              }
            }}
          >
            {students.map((student) => (
              <option key={student._id.$oid} value={student.username}>
                {student.username.split("@")[0]}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-main">
          <StudentCard student={selectedStudent} grade={selectedGrade} />

          <section className="info-section" aria-labelledby="overall-analysis">
            <h2 id="overall-analysis" className="section-title">
              Overall Analysis
            </h2>
            <div className="info-grid">
              <InfoBox
                title="Descriptive (Overall)"
                content={gradeData?.descriptive_overall || ""}
                variant="descriptive"
              />
              <InfoBox
                title="Prescriptive (Overall)"
                content={gradeData?.prescriptive_overall || ""}
                variant="prescriptive"
              />
            </div>
          </section>
        </div>

        <aside className="dashboard-sidebar" aria-label="Subject Navigation">
          <h2 className="sidebar-title">Subjects</h2>
          <nav className="subject-list" aria-label="Subject list">
            {Object.entries(subjects).map(([name, data]) => (
              <SubjectButton
                key={name}
                name={name}
                data={data}
                studentUsername={selectedStudent.username}
              />
            ))}
          </nav>
        </aside>
      </main>
    </div>
  );
}
