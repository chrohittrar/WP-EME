import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function GetInfo() {
  const [formData, setFormData] = useState({
    StdntID: "",
    fullname: "",
    Address: "",
    Email: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (formData.StdntID) {
      fetch('http://localhost:9000/getinfo/${formData.StdntID}')
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {  
            throw new Error(data.error);
          }
          setFormData({
            StdntID: data.studId || "",
            fullname: data.fullName || "",
            Address: data.Address || "",
            Email: data.email || "",
            mobile: data.mobile || "",
          });
          setError("");  
        })
        .catch((error) => {
          setError(error.message); 
          setFormData({
            StdntID: formData.StdntID,
            fullname: "",
            Address: "",
            Email: "",
            mobile: "",
          });
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Student Form</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Enter Student ID:</label>
              <input
                type="number"
                name="StdntID"
                value={formData.StdntID}
                className="form-control"
                onChange={(e) => setFormData({ ...formData, StdntID: e.target.value })}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Full Name:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                className="form-control"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                name="Address"
                value={formData.Address}
                className="form-control"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                className="form-control"
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number:</label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                className="form-control"
                disabled
              />
            </div>
          </form>
          {error && (  
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}