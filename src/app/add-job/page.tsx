"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJobContext } from "../context/jobContext";
import { Navbar } from "../components/navbar";
import styles from "./addjob.module.css";
import Link from "next/link";

export default function AddJobPage() {
  const { jobs, setJobs } = useJobContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    industryType: "",
    department: "",
    employmentType: "",
    roleCategory: "",
    jobDescription: "",
    jobHighlights: "",
    keySkills: "",
    educationRequirements: "",
    experienceLevel: "",
    salaryRange: "",
    shortDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmptyField = Object.values(formData).some(
      (val) => val.trim() === ""
    );

    if (isEmptyField) {
      window.alert("Please fill in all fields before submitting.");
      return;
    }
    const newJob = {
      id: Date.now().toString(),
      ...formData,
      jobHighlights: formData.jobHighlights
        .split(",")
        .map((item) => item.trim()),
      keySkills: formData.keySkills.split(",").map((item) => item.trim()),
    };

    setJobs([newJob, ...jobs]);
    localStorage.setItem("jobs", JSON.stringify([newJob, ...jobs]));
    window.alert("A new job has been added successfully!");
    console.log("Form submitted:", formData);

    router.push("/");
  };

  return (
    <div className={styles.formContainer}>
      <Navbar otherPage={true} />
      <div className={styles.pageHeader}>
        <div
          className={`flex justify-between align-center${styles.pageHeaderContent}`}
        >
          <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
          <div>
            <nav className="text-sm text-gray-600 mb-4">
              <ol className="list-reset flex">
                <li>
                  <Link href="/" className="text-blue-600 hover:underline">
                    Jobs
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-500">Add Job</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="container-fluid p-5 mx-auto rounded rounded-lg border border-2 border-gray-200">
          <div className="col-lg-12">
            <h4 className={`${styles.formheading} mb-1`}>Job Form</h4>
            <p className={`${styles.formsubtext}`}>
              Fill the below form to add a new job
            </p>
          </div>
          <div className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  "jobTitle",
                  "companyName",
                  "location",
                  "industryType",
                  "department",
                  "employmentType",
                  "roleCategory",
                  "educationRequirements",
                  "experienceLevel",
                  "salaryRange",
                  "shortDescription",
                ].map((field) => (
                  <div key={field}>
                    <label className="block capitalize mb-1">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      name={field}
                      autoComplete="off"
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1">
                    Job Highlights (comma separated)
                  </label>
                  <input
                    type="text"
                    name="jobHighlights"
                    value={formData.jobHighlights}
                    autoComplete="off"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    Key Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="keySkills"
                    value={formData.keySkills}
                    autoComplete="off"
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Job Description</label>
                  <textarea
                    name="jobDescription"
                    autoComplete="off"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows={1}
                    required
                  />
                </div>
              </div>
              <div
                className={`flex justify-center gap-5 py-6 space-x-4 ${styles.buttonDiv}`}
              >
                <button className={styles.laterButton}>Save for Later</button>
                <button type="submit" className={styles.submitButton}>
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
