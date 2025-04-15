import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentCardPreview from "./components/StudentCardPreview";

function App() {
  const [studentData, setStudentData] = useState(null);
  return (
    <div>
      <StudentForm onSubmit={setStudentData} />
      {studentData && <StudentCardPreview data={studentData} />}
    </div>
  );
}

export default App;
