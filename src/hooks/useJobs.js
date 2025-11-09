import { useEffect, useState, useCallback } from "react";
import { api } from "../api";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      let response;

      if (searchTerm.trim()) {
        response = await api.get(`/jobs/search/${encodeURIComponent(searchTerm)}`);
      } else {
        response = await api.get("/jobs");
      }

      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);


  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, loading, setSearchTerm, searchTerm, fetchJobs, setJobs };
};
