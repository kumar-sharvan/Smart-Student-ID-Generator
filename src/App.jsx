import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentCardPreview from "./components/StudentCardPreview";
import Footer from "./components/Footer";

function App() {
  const [studentData, setStudentData] = useState(null);
  return (
    <div>
      <StudentForm onSubmit={setStudentData} />
      {studentData && <StudentCardPreview data={studentData} />}
      <Footer />
    </div>
  );
}

export default App;
