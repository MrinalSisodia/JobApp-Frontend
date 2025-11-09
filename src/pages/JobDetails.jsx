import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job:", err);
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
  return (
    <div className="text-center mt-5">
      <p className="fw-semibold fs-5">Loading job details...</p>
    </div>
  );
}

  if (!job) return <p className="text-center mt-5 text-muted">Job not found.</p>;

  return (
    <div className="container my-5">
      <div className="card shadow border-0">
        <div className="card-body">
          <h2 className="card-title text-primary fw-bold mb-3">{job.title}</h2>
          <p className="card-text mb-1">
            <strong>Company:</strong> {job.company}
          </p>
          <p className="card-text mb-1">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="card-text mb-1">
            <strong>Type:</strong> {job.type}
          </p>
          <p className="card-text mb-1">
            <strong>Salary:</strong> ₹{job.salary?.toLocaleString()}
          </p>

          <hr />

          <p className="card-text mb-3">
            <strong>Description:</strong>
            <br />
            {job.description}
          </p>

          <p className="card-text">
            <strong>Qualifications:</strong>
            <ul className="mt-2">
              {Array.isArray(job.qualifications)
                ? job.qualifications.map((q, i) => <li key={i}>{q}</li>)
                : <li>{job.qualifications}</li>}
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
