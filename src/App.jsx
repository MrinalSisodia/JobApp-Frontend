import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AllJobs from "./pages/AllJobs";
import PostJob from "./pages/PostJob";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<AllJobs />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
