import { useState } from "react";

const StudentForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [selectedClassDivision, setSelectedClassDivision] = useState("");
  const [image, setImage] = useState(null);
  const [imgPreview, setImagePreview] = useState(null);
  const [rackNumber, setRackNumber] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [busRoute, setBusRoute] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const allergyOptions = [
    "Peanuts",
    "Dairy",
    "Gluten",
    "Eggs",
    "Shellfish",
    "Soy",
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAllergies((prev) => [...prev, value]);
    } else {
      setSelectedAllergies((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentPayload = {
      name,
      rollno,
      classDivision: selectedClassDivision,
      image: imgPreview,
      rackNumber,
      allergies: selectedAllergies,
      busRoute,
      dob,
      bloodGroup,
    };

    onSubmit(studentPayload);
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0 text-center fw-bold fs-1">Student Registration Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter student name"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Roll No</label>
                <input
                  type="number"
                  className="form-control"
                  value={rollno}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                  placeholder="Enter roll number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Class & Division</label>
                <select
                  className="form-select"
                  value={selectedClassDivision}
                  onChange={(e) => setSelectedClassDivision(e.target.value)}
                  required
                >
                  <option value="">Select Class</option>
                  {["1-A", "1-B", "1-C"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Rack No</label>
                <input
                  type="text"
                  className="form-control"
                  value={rackNumber}
                  onChange={(e) => setRackNumber(e.target.value)}
                  required
                  placeholder="Enter rack number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                {imgPreview && (
                  <div className="mt-2">
                    <img
                      src={imgPreview}
                      alt="preview"
                      className="img-thumbnail"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Bus Route</label>
                <select
                  className="form-select"
                  value={busRoute}
                  onChange={(e) => setBusRoute(e.target.value)}
                  required
                >
                  <option value="">Select Route</option>
                  {["Route 1", "Route 2"].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Date of birth */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">D.O.B</label>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Blood Group</label>
                <input
                  type="text"
                  className="form-control"
                  value={bloodGroup.toUpperCase()}
                  onChange={(e) => setBloodGroup(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Allergies</label>
              <div className="d-flex flex-wrap gap-3">
                {allergyOptions.map((allergy) => (
                  <div className="form-check" key={allergy}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`allergy-${allergy}`}
                      value={allergy}
                      checked={selectedAllergies.includes(allergy)}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`allergy-${allergy}`}
                    >
                      {allergy}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary btn-lg" type="submit">
                Generate ID Card
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
