import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    qualifications: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      salary: Number(formData.salary),
      qualifications: formData.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q),
    };

    try {

      await api.post("/jobs", payload);

      toast.success("Job posted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        description: "",
        qualifications: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error(
        error.response?.data?.message || "Failed to post job. Try again.",
        { position: "top-right", autoClose: 2500 }
      );
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4 fw-bold">Post a Job</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Company</label>
          <input
            type="text"
            name="company"
            className="form-control"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Salary</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Job Type</label>
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option>Full-time (On-site)</option>
            <option>Part-time (On-site)</option>
            <option>Full-time (Remote)</option>
            <option>Part-time (Remote)</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="description"
            rows="3"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Qualifications</label>
          <textarea
            name="qualifications"
            rows="2"
            className="form-control"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Separate multiple qualifications with commas"
            required
          ></textarea>
        </div>

        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-primary fw-semibold">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
