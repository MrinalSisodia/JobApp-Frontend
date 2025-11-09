import { useEffect, useRef } from "react";
import { useJobs } from "../hooks/useJobs";
import { api } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AllJobs = () => {
  const { jobs, loading, searchTerm, setSearchTerm, fetchJobs, setJobs } = useJobs();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [jobs]);

  const handleDelete = async (id) => {
    const previousJobs = [...jobs];
    const deletedJob = jobs.find((job) => job._id === id);

    setJobs(jobs.filter((job) => job._id !== id));

    try {
      await api.delete(`/jobs/${id}`);
      toast.success(
        <div>
          Job deleted.
          <button
            onClick={() => {
              setJobs(previousJobs);
              toast.dismiss();
              toast.info("Undo successful — job restored!");
            }}
            className="btn btn-link p-0 ms-2"
            style={{ textDecoration: "underline", color: "#0d6efd" }}
          >
            Undo
          </button>
        </div>,
        { autoClose: 3000 }
      );
    } catch (err) {
      console.error("Error deleting job:", err);
      setJobs(previousJobs);
      toast.error("Failed to delete job. Try again.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading jobs...</p>;

  return (
    <div className="container my-5">
      {/* 🔍 Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by job title..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="text-center mb-4 fw-bold">All Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-muted">No jobs found.</p>
      ) : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4 mb-4" key={job._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column g-2">
                  <h5 className="card-title text-primary fw-bold">{job.title}</h5>
                  <p className="card-text mb-1">
                    <strong>Company name:</strong> {job.company}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Job Type:</strong> {job.type}
                  </p>

                  <div className="d-flex justify-content-start gap-2 mt-auto">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-primary btn-sm text-decoration-none"
                    >
                      See Details
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
