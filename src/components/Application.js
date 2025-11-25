import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./Application.css";

const Application = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    discordUsername: "",
    school: "",
    year: "",
    whyParticipate: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) setFormData((p) => ({ ...p, resume: file }));
  };

  async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(",")[1]);
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  async function uploadToDriveWebApp(file, userId) {
    const base64 = await fileToBase64(file);
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxH9pDL40StcVG89WUEu_q9zzUV1gfbu1PMyoeepITgS0b26yYGZncKv_GSxx3tbSHp/exec",
      {
        method: "POST",
        // Use a CORS-simple request to avoid preflight (OPTIONS)
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          base64,
          mimeType: file.type || "application/pdf",
          filename: file.name || `resume-${userId}.pdf`,
          userId,
        }),
      }
    );
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "Upload failed");
    return json.url;
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const bannerRef = useRef(null);

  useEffect(() => {
    if (submitMsg && bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setSubmitting(true);
      setSubmitMsg("");

      let resumeUrl = "";
      if (formData.resume) {
        resumeUrl = await uploadToDriveWebApp(formData.resume, currentUser.uid);
      }

      const applicationRef = doc(db, "applications", currentUser.uid);
      await setDoc(
        applicationRef,
        {
          userId: currentUser.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          discordUsername: formData.discordUsername,
          school: formData.school,
          year: formData.year,
          whyParticipate: formData.whyParticipate,
          resumeUrl,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setSubmitMsg(
        "Thank you for submitting! Your application has been received."
      );
    } catch (err) {
      console.error(err);
      setSubmitMsg("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <section className="application" id="application">
        <div className="application-container">
          <div className="auth-gate" role="alert">
            <h2 className="auth-gate-title">Sign in required</h2>
            <p className="auth-gate-text">
              Please sign in to view and submit the BeachHacks application.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="application" id="application">
      <img src="/crab_waving.png" alt="Crab" className="crab-application" />
      <img
        src="/small_cyan_star.svg"
        alt="Cyan Star"
        className="cyan-star-application"
      />
      <img
        src="/purple_small_star.svg"
        alt="Star"
        className="star-application"
      />
      <img
        src="/right-rock.png"
        alt="Rock"
        className="right-rock-application"
      />
      <img
        src="/purple_sea_plant.svg"
        alt="Sea Plant"
        className="sea-plant-application"
      />
      <img
        src="/dark_blue_kelp_rigtht.png"
        alt="Kelp"
        className="kelp-right-application"
      />
      <div className="application-container">
        <h1 className="application-title">
          BeachHacks 9.0
          <br /> Application Form
        </h1>

        {submitMsg && (
          <div
            className={`submit-banner ${
              submitMsg.toLowerCase().includes("fail") ? "error" : "success"
            }`}
            role="status"
            aria-live="polite"
            ref={bannerRef}
          >
            {submitMsg}
          </div>
        )}

        <form className="application-form" onSubmit={handleSubmit}>
          {/* Name Section */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <div className="form-row">
              <div className="input-wrap">
                <img
                  src="/input_field.png"
                  alt=""
                  aria-hidden="true"
                  className="input-image"
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="input-wrap">
                <img
                  src="/input_field.png"
                  alt=""
                  aria-hidden="true"
                  className="input-image"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Discord Username Section */}
          <div className="form-group">
            <label className="form-label">Discord Username</label>
            <div className="input-wrap">
              <img
                src="/input_field.png"
                alt=""
                aria-hidden="true"
                className="input-image"
              />
              <input
                type="text"
                name="discordUsername"
                placeholder="handle123"
                value={formData.discordUsername}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* School and Year Section */}
          <div className="form-group">
            <div className="form-row">
              <div className="form-field-group">
                <label className="form-label">School</label>
                <div className="input-wrap">
                  <img
                    src="/input_field.png"
                    alt=""
                    aria-hidden="true"
                    className="input-image"
                  />
                  <input
                    type="text"
                    name="school"
                    placeholder="school name"
                    value={formData.school}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-field-group">
                <label className="form-label">Year</label>
                <div className="input-wrap">
                  <img
                    src="/input_field.png"
                    alt=""
                    aria-hidden="true"
                    className="input-image"
                  />
                  <input
                    type="text"
                    name="year"
                    placeholder="sophomore"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Why Participate Section */}
          <div className="form-group">
            <label className="form-label">
              Why do you want to participate in BeachHacks 9.0?
            </label>
            <div className="textarea-wrap">
              <img
                src="/participate_inputField.png"
                alt=""
                aria-hidden="true"
                className="textarea-image"
              />
              <textarea
                name="whyParticipate"
                placeholder="type here"
                value={formData.whyParticipate}
                onChange={handleInputChange}
                className="form-textarea"
                rows="6"
                required
              />
            </div>
          </div>

          {/* Resume Upload Section (uploads to your Drive via Apps Script) */}
          <div className="form-group">
            <label className="form-label">Resume (PDF/Doc)</label>
            <div className="file-upload-area">
              <input
                type="file"
                name="resume"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="resume-upload" className="file-upload-label">
                <div className="file-upload-content">
                  <span className="file-placeholder">
                    Drop your resume here
                  </span>
                  {formData.resume && (
                    <span className="file-name">{formData.resume.name}</span>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
