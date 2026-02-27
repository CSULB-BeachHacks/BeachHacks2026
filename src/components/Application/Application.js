import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "./Application.css";

const Application = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        age: "",
        discordUsername: "",
        school: "",
        year: "",
        levelOfStudy: "",
        countryOfResidence: "",
        dietaryRestrictions: [],
        allergiesSpecify: "",
        gender: "",
        pronouns: "",
        pronounsOther: "",
        raceEthnicity: "",
        raceEthnicityOther: "",
        whyParticipate: "",
        resume: null,
        mlhCodeOfConduct: false,
        mlhShareInfo: false,
        mlhEmails: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleDietaryChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            dietaryRestrictions: checked
                ? [...prev.dietaryRestrictions, value]
                : prev.dietaryRestrictions.filter((v) => v !== value),
            // Clear allergies specify when Allergies is unchecked
            ...(value === "Allergies" && !checked ? { allergiesSpecify: "" } : {}),
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
            },
        );
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Upload failed");
        return json.url;
    }

    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const bannerRef = useRef(null);

    // Check if user has an existing application
    useEffect(() => {
        async function checkExistingApplication() {
            if (!currentUser) {
                setLoading(false);
                return;
            }

            // Block admin user from accessing application form
            try {
                const userRef = doc(db, "users", currentUser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists() && userSnap.data().isAdmin) {
                    setLoading(false);
                    navigate("/admin/dashboard");
                    return;
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
            }

            try {
                const applicationRef = doc(db, "applications", currentUser.uid);
                const applicationSnap = await getDoc(applicationRef);

                if (applicationSnap.exists()) {
                    const data = applicationSnap.data();

                    // If application is submitted (has submittedAt), redirect to dashboard
                    // Otherwise, allow editing (application started but not submitted)
                    if (data.submittedAt) {
                        navigate("/dashboard");
                        return;
                    }

                    // Application exists but not submitted - pre-fill form for editing
                    setFormData({
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        email: data.email || currentUser?.email || "",
                        phoneNumber: data.phoneNumber || "",
                        age: data.age || "",
                        discordUsername: data.discordUsername || "",
                        school: data.school || "",
                        year: data.year || "",
                        levelOfStudy: data.levelOfStudy || "",
                        countryOfResidence: data.countryOfResidence || "",
                        dietaryRestrictions: data.dietaryRestrictions || [],
                        allergiesSpecify: data.allergiesSpecify || "",
                        gender: data.gender || "",
                        pronouns: data.pronouns || "",
                        pronounsOther: data.pronounsOther || "",
                        raceEthnicity: data.raceEthnicity || "",
                        raceEthnicityOther: data.raceEthnicityOther || "",
                        whyParticipate: data.whyParticipate || "",
                        resume: null,
                        mlhCodeOfConduct: data.mlhCodeOfConduct || false,
                        mlhShareInfo: data.mlhShareInfo || false,
                        mlhEmails: data.mlhEmails || false,
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Error checking existing application:", error);
                setLoading(false);
            }
        }

        checkExistingApplication();
    }, [currentUser, navigate]);

    useEffect(() => {
        if (submitMsg && bannerRef.current) {
            bannerRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [submitMsg]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);

        if (!currentUser) {
            setSubmitMsg("Please sign in to submit your application.");
            return;
        }

        // Check all required fields and collect missing ones
        const missingFields = [];

        if (!formData.firstName || !formData.firstName.trim()) missingFields.push("First Name");
        if (!formData.lastName || !formData.lastName.trim()) missingFields.push("Last Name");
        if ((!formData.email || !formData.email.trim()) && !(currentUser && currentUser.email)) missingFields.push("Email");
        if (!formData.phoneNumber || !formData.phoneNumber.trim()) missingFields.push("Phone Number");
        if (!formData.age || !formData.age.trim()) missingFields.push("Age");
        if (!formData.discordUsername || !formData.discordUsername.trim()) missingFields.push("Discord Username");
        if (!formData.school || !formData.school.trim()) missingFields.push("School");
        if (!formData.levelOfStudy || !formData.levelOfStudy.trim()) missingFields.push("Level of Study");
        if (!formData.countryOfResidence || !formData.countryOfResidence.trim()) missingFields.push("Country of Residence");
        if (!formData.whyParticipate || !formData.whyParticipate.trim()) missingFields.push("Why Participate");
        if (!formData.resume) missingFields.push("Resume");
        if (!formData.mlhCodeOfConduct) missingFields.push("MLH Code of Conduct agreement");
        if (!formData.mlhShareInfo) missingFields.push("MLH application sharing authorization");

        // If any fields are missing, show a comprehensive message
        if (missingFields.length > 0) {
            const fieldsList = missingFields.join(", ");
            setSubmitMsg(
                `Please complete all required fields before submitting. Missing: ${fieldsList}.`,
            );
            return;
        }

        try {
            setSubmitting(true);
            setSubmitMsg("");

            let resumeUrl = "";
            if (formData.resume) {
                resumeUrl = await uploadToDriveWebApp(
                    formData.resume,
                    currentUser.uid,
                );
            }

            const applicationRef = doc(db, "applications", currentUser.uid);
            await setDoc(
                applicationRef,
                {
                    userId: currentUser.uid,
                    email: (formData.email && formData.email.trim()) || (currentUser && currentUser.email) || "",
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    phoneNumber: formData.phoneNumber.trim(),
                    age: formData.age.trim(),
                    discordUsername: formData.discordUsername.trim(),
                    school: formData.school.trim(),
                    year: (formData.year || "").trim(),
                    levelOfStudy: (formData.levelOfStudy || "").trim(),
                    countryOfResidence: (formData.countryOfResidence || "").trim(),
                    dietaryRestrictions: Array.isArray(formData.dietaryRestrictions) ? formData.dietaryRestrictions : [],
                    allergiesSpecify: (formData.allergiesSpecify || "").trim(),
                    gender: formData.gender || "",
                    pronouns: formData.pronouns || "",
                    pronounsOther: (formData.pronounsOther || "").trim(),
                    raceEthnicity: formData.raceEthnicity || "",
                    raceEthnicityOther: (formData.raceEthnicityOther || "").trim(),
                    whyParticipate: formData.whyParticipate.trim(),
                    resumeUrl,
                    mlhCodeOfConduct: formData.mlhCodeOfConduct,
                    mlhShareInfo: formData.mlhShareInfo,
                    mlhEmails: formData.mlhEmails,
                    status: "pending",
                    submittedAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                },
                { merge: true },
            );

            setSubmitMsg(
                "Thank you for submitting! Your application has been received.",
            );

            // Redirect to dashboard after successful submission
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
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
                            Please sign in to view and submit the BeachHacks
                            application.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (loading) {
        return (
            <section className="application" id="application">
                <div className="application-container">
                    <div className="auth-gate" role="alert">
                        <h2 className="auth-gate-title">Loading...</h2>
                        <p className="auth-gate-text">
                            Checking your application status...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="application" id="application">
            <img
                draggable="false"
                src="/crab_waving.png"
                alt="Crab"
                className="crab-application"
            />
            <img
                draggable="false"
                src="/small_cyan_star.svg"
                alt="Cyan Star"
                className="cyan-star-application"
            />
            <img
                draggable="false"
                src="/purple_small_star.svg"
                alt="Star"
                className="star-application"
            />
            <img
                draggable="false"
                src="/right-rock.png"
                alt="Rock"
                className="right-rock-application"
            />
            <img
                draggable="false"
                src="/purple_sea_plant.svg"
                alt="Sea Plant"
                className="sea-plant-application"
            />
            <img
                draggable="false"
                src="/dark_blue_kelp_rigtht.png"
                alt="Kelp"
                className="kelp-right-application"
            />
            <div className="application-container">
                <h1 className="application-title">
                    BeachHacks 9.0
                    <br /> Application Form
                </h1>

                <div
                    style={{
                        backgroundColor: "#fff3cd",
                        color: "#856404",
                        padding: "1rem",
                        borderRadius: "8px",
                        marginBottom: "2rem",
                        border: "1px solid #ffeeba",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                    role="alert"
                >
                    NOTE: This event is NOT overnight. Non-CSULB students should
                    plan accordingly.
                </div>

                {submitMsg && (
                    <div
                        className={`submit-banner ${submitMsg.toLowerCase().includes("fail") ||
                                submitMsg.toLowerCase().includes("missing") ||
                                submitMsg.toLowerCase().includes("complete")
                                ? "error"
                                : "success"
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
                                    draggable="false"
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
                                    draggable="false"
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

                    {/* Email */}
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <div className="input-wrap">
                            <img
                                draggable="false"
                                src="/input_field.png"
                                alt=""
                                aria-hidden="true"
                                className="input-image"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email || (currentUser && currentUser.email) || ""}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone & Age */}
                    <div className="form-group">
                        <div className="form-row">
                            <div className="form-field-group">
                                <label className="form-label">Phone Number</label>
                                <div className="input-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-field-group">
                                <label className="form-label">Age</label>
                                <div className="input-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Age"
                                        min="13"
                                        max="120"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Discord Username Section */}
                    <div className="form-group">
                        <label className="form-label">Discord Username</label>
                        <div className="input-wrap">
                            <img
                                draggable="false"
                                src="/input_field.png"
                                alt=""
                                aria-hidden="true"
                                className="input-image"
                            />
                            <input
                                type="text"
                                name="discordUsername"
                                placeholder="Username"
                                value={formData.discordUsername}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    {/* School, Country, Year, Level of Study */}
                    <div className="form-group">
                        <div className="form-row">
                            <div className="form-field-group">
                                <label className="form-label">School</label>
                                <div className="input-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <input
                                        type="text"
                                        name="school"
                                        placeholder="School Name"
                                        value={formData.school}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-field-group">
                                <label className="form-label">Country of Residence</label>
                                <div className="input-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <input
                                        type="text"
                                        name="countryOfResidence"
                                        placeholder="Country"
                                        value={formData.countryOfResidence}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-row form-row-sm">
                            <div className="form-field-group">
                                <label className="form-label">Year in School</label>
                                <div className="input-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <input
                                        type="text"
                                        name="year"
                                        placeholder="e.g. Sophomore, Junior"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div className="form-field-group">
                                <label className="form-label">Level of Study</label>
                                <div className="input-wrap select-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <select
                                        name="levelOfStudy"
                                        value={formData.levelOfStudy}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">e.g. Undergraduate</option>
                                        <option value="High School">High School</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dietary Restrictions - For in-Person events */}
                    <div className="form-group">
                        <label className="form-label">
                            Dietary Restrictions (For in-Person events)
                        </label>
                        <p className="form-hint">Select all that apply. See our Event Logistics section for more about dietary planning.</p>
                        <div className="checkbox-group-wrap">
                            <div className="checkbox-group">
                                {["Vegetarian", "Vegan", "Celiac Disease", "Allergies", "Kosher", "Halal"].map((opt) => (
                                    <label key={opt} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            value={opt}
                                            checked={formData.dietaryRestrictions.includes(opt)}
                                            onChange={handleDietaryChange}
                                        />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {formData.dietaryRestrictions.includes("Allergies") && (
                            <div style={{ marginTop: "0.75rem" }}>
                                <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                                    Specify which allergy/allergies
                                </label>
                                <div className="input-wrap">
                                    <img
                                        draggable="false"
                                        src="/input_field.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="input-image"
                                    />
                                    <input
                                        type="text"
                                        name="allergiesSpecify"
                                        placeholder="e.g. Nuts, shellfish"
                                        value={formData.allergiesSpecify}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="form-group">
                        <label className="form-label">Gender</label>
                        <div className="input-wrap select-wrap">
                            <img
                                draggable="false"
                                src="/input_field.png"
                                alt=""
                                aria-hidden="true"
                                className="input-image"
                            />
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="">e.g. Prefer Not to Answer</option>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer to self-describe">Prefer to self-describe</option>
                                <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                            </select>
                        </div>
                    </div>

                    {/* Pronouns - Optional */}
                    <div className="form-group">
                        <label className="form-label">Pronouns <span className="optional-label">(optional)</span></label>
                        <div className="input-wrap select-wrap">
                            <img
                                draggable="false"
                                src="/input_field.png"
                                alt=""
                                aria-hidden="true"
                                className="input-image"
                            />
                            <select
                                name="pronouns"
                                value={formData.pronouns}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="">e.g. They/Them</option>
                                <option value="She/Her">She/Her</option>
                                <option value="He/Him">He/Him</option>
                                <option value="They/Them">They/Them</option>
                                <option value="She/They">She/They</option>
                                <option value="He/They">He/They</option>
                                <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {formData.pronouns === "Other" && (
                            <div className="input-wrap" style={{ marginTop: "0.75rem" }}>
                                <img
                                    draggable="false"
                                    src="/input_field.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="input-image"
                                />
                                <input
                                    type="text"
                                    name="pronounsOther"
                                    placeholder="Please specify"
                                    value={formData.pronounsOther}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>
                        )}
                    </div>

                    {/* Race / Ethnicity */}
                    <div className="form-group">
                        <label className="form-label">Race / Ethnicity</label>
                        <div className="input-wrap select-wrap">
                            <img
                                draggable="false"
                                src="/input_field.png"
                                alt=""
                                aria-hidden="true"
                                className="input-image"
                            />
                            <select
                                name="raceEthnicity"
                                value={formData.raceEthnicity}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                <option value="">e.g. Prefer Not to Answer</option>
                                <option value="Asian Indian">Asian Indian</option>
                                <option value="Black or African">Black or African</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Filipino">Filipino</option>
                                <option value="Guamanian or Chamorro">Guamanian or Chamorro</option>
                                <option value="Hispanic / Latino / Spanish Origin">Hispanic / Latino / Spanish Origin</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Korean">Korean</option>
                                <option value="Middle Eastern">Middle Eastern</option>
                                <option value="Native American or Alaskan Native">Native American or Alaskan Native</option>
                                <option value="Native Hawaiian">Native Hawaiian</option>
                                <option value="Samoan">Samoan</option>
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="White">White</option>
                                <option value="Other Asian (Thai, Cambodian, etc)">Other Asian (Thai, Cambodian, etc)</option>
                                <option value="Other Pacific Islander">Other Pacific Islander</option>
                                <option value="Other">Other (Please Specify)</option>
                                <option value="Prefer Not to Answer">Prefer Not to Answer</option>
                            </select>
                        </div>
                        {formData.raceEthnicity === "Other" && (
                            <div className="input-wrap" style={{ marginTop: "0.75rem" }}>
                                <img
                                    draggable="false"
                                    src="/input_field.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="input-image"
                                />
                                <input
                                    type="text"
                                    name="raceEthnicityOther"
                                    placeholder="Please specify"
                                    value={formData.raceEthnicityOther}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>
                        )}
                    </div>

                    {/* Why Participate Section */}
                    <div className="form-group">
                        <label className="form-label">
                            Why do you want to participate in BeachHacks 9.0?
                        </label>
                        <div className="textarea-wrap">
                            <img
                                draggable="false"
                                src="/participate_inputField.png"
                                alt=""
                                aria-hidden="true"
                                className="textarea-image"
                            />
                            <textarea
                                name="whyParticipate"
                                placeholder="Type here"
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
                        <label className="form-label">Resume (PDF/Docx)</label>
                        <div className="file-upload-area">
                            <input
                                type="file"
                                name="resume"
                                id="resume-upload"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            <label
                                htmlFor="resume-upload"
                                className="file-upload-label"
                            >
                                <div className="file-upload-content">
                                    <span className="file-placeholder">
                                        Drop Your Resume Here
                                    </span>
                                    {formData.resume && (
                                        <>
                                            <span className="file-uploaded-badge">Document uploaded</span>
                                            <span className="file-name">{formData.resume.name}</span>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* MLH Partnership Section */}
                    <div className="form-group mlh-section">
                        <p className="form-disclaimer">
                            Much of the demographic and contact information above is collected for our partnership with MLH events. We are currently in the process of partnering with MLH. The following 3 checkboxes are for this partnership. If we do not end up partnering with MLH, your information will not be shared.
                            <br />
                            <span className="mlh-note">
                                <span className="mlh-required-pill">*</span> The first two boxes are mandatory. Please click and read the linked MLH policies before checking these boxes. The third (MLH emails) is optional.
                            </span>
                        </p>
                        <div className="mlh-checkboxes">
                            <div className="mlh-checkbox-row">
                                <input
                                    type="checkbox"
                                    id="mlh-code-of-conduct"
                                    name="mlhCodeOfConduct"
                                    checked={formData.mlhCodeOfConduct}
                                    onChange={handleCheckboxChange}
                                    required
                                />
                                <label htmlFor="mlh-code-of-conduct" className="mlh-checkbox-text">
                                    <span className="mlh-required-pill">*</span>{" "}
                                    I have read and agree to the{" "}
                                    <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noopener noreferrer">MLH Code of Conduct</a>.
                                </label>
                            </div>
                            <div className="mlh-checkbox-row">
                                <input
                                    type="checkbox"
                                    id="mlh-share-info"
                                    name="mlhShareInfo"
                                    checked={formData.mlhShareInfo}
                                    onChange={handleCheckboxChange}
                                    required
                                />
                                <label htmlFor="mlh-share-info" className="mlh-checkbox-text">
                                    <span className="mlh-required-pill">*</span>{" "}
                                    I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the{" "}
                                    <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer">MLH Privacy Policy</a>. I further agree to the terms of both the{" "}
                                    <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer">MLH Contest Terms and Conditions</a> and the{" "}
                                    <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer">MLH Privacy Policy</a>.
                                </label>
                            </div>
                            <div className="mlh-checkbox-row">
                                <input
                                    type="checkbox"
                                    id="mlh-emails"
                                    name="mlhEmails"
                                    checked={formData.mlhEmails}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="mlh-emails" className="mlh-checkbox-text">
                                    I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements. (Optional)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button – disabled until the first 2 MLH checkboxes are checked */}
                    {(() => {
                        const allMlhChecked =
                            formData.mlhCodeOfConduct && formData.mlhShareInfo;
                        return (
                            <button
                                type="submit"
                                className={`submit-button ${submitting ? "submitting" : ""}`}
                                disabled={submitting || !allMlhChecked}
                                title={!allMlhChecked ? "You must check the first two MLH agreement boxes above to submit." : undefined}
                            >
                                {submitting ? (
                                    <span>
                                        Submitting
                                        <span className="loading-dots">
                                            <span>.</span>
                                            <span>.</span>
                                            <span>.</span>
                                        </span>
                                    </span>
                                ) : (
                                    "Submit Application"
                                )}
                            </button>
                        );
                    })()}
                </form>
            </div>
        </section>
    );
};

export default Application;
