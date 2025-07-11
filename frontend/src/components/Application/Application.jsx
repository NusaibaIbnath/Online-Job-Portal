// import axios from "axios";
// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";
// const Application = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [resume, setResume] = useState(null);

//   const { isAuthorized, user } = useContext(Context);

//   const navigateTo = useNavigate();

//   // Function to handle file input changes
//   const handleFileChange = (event) => {
//     const resume = event.target.files[0];
//     setResume(resume);
//   };

//   const { id } = useParams();
//   const handleApplication = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("address", address);
//     formData.append("coverLetter", coverLetter);
//     formData.append("resume", resume);
//     formData.append("jobId", id);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5001/api/v1/application/post",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setName("");
//       setEmail("");
//       setCoverLetter("");
//       setPhone("");
//       setAddress("");
//       setResume("");
//       toast.success(data.message);
//       navigateTo("/job/getall");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if (!isAuthorized || (user && user.role === "Employer")) {
//     navigateTo("/");
//   }

//   return (
//     <section className="application">
//       <div className="container">
//         <h3>Application Form</h3>
//         <form onSubmit={handleApplication}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Your Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Your Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//           <textarea
//             placeholder="CoverLetter..."
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//           />
//           <div>
//             <label
//               style={{ textAlign: "start", display: "block", fontSize: "20px" }}
//             >
//               Select Resume
//             </label>
//             <input
//               type="file"
//               accept=".pdf, .jpg, .png"
//               onChange={handleFileChange}
//               style={{ width: "100%" }}
//             />
//           </div>
//           <button type="submit">Send Application</button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Application;


import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Redirect unauthorized users or employers
  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setResume(selectedFile);
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear form on success
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const errMsg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errMsg);
    }
  };

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="Cover Letter"
            value={coverLetter}
            required
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "16px" }}
            >
              Select Resume (.pdf, .jpg, .png)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              required
              style={{ width: "100%", marginTop: "8px" }}
            />
          </div>
          <button type="submit" style={{ marginTop: "16px" }}>
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
