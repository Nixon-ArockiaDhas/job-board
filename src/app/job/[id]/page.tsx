"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useJobContext } from "../../context/jobContext";
import { Navbar } from "../../components/navbar";
import styles from "../page.module.css";
import { MapPin, Clock2 } from "lucide-react";
import Link from "next/link";

export default function JobDetailsPage() {
  const { id } = useParams();
  const { jobs } = useJobContext();
  const [job, setJob] = useState(() => jobs.find((job) => job.id === id));

  useEffect(() => {
    if (!job) {
      const storedJobs = localStorage.getItem("jobs");
      if (storedJobs) {
        try {
          const jobsArr = JSON.parse(storedJobs);
          const found = jobsArr.find((j: any) => j.id === id);
          if (found) setJob(found);
        } catch (e) {}
      }
    }
  }, [id, job]);

  if (!job) {
    return (
      <div className={styles.detailContainer}>
        <Navbar otherPage={false} />
        <div className={styles.paddingContainer}>
          <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Job not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      <Navbar otherPage={false} />
      <div className={styles.paddingContainer}>
        <div className={`flex justify-between align-center`}>
          <h1 className="text-2xl font-bold mb-4">Job Details</h1>
          <div>
            <nav className="text-sm text-gray-600 mb-4">
              <ol className="list-reset flex">
                <li>
                  <Link href="/job" className="text-blue-600 hover:underline">
                    Jobs
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-500">job Details</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="col-12 mx-auto p-5 border border-gray-200 mb-6 rounded-lg bg-white shadow-sm">
          <div className={styles.header}>
            <img
              src={`https://placehold.co/64x64?text=${encodeURIComponent(
                job.companyName
              )}`}
              alt={`${job.companyName} logo`}
            />
            <div className={`col-12 md-6 ${styles.headerText}`}>
              <h3 className={styles.jobDetailTitle}> {job.jobTitle} </h3>
              <div className={styles.jobDetail}>
                <p className={`flex items-center ${styles.jobDetailCompany}`}>
                  {job.companyName}
                </p>
                <p className={`flex items-center ${styles.jobDetailCompany}`}>
                  <Clock2 className={`mr-2 ${styles.icon}`} />
                  {job.location}
                </p>
                <p className={`flex items-center ${styles.jobDetailCompany}`}>
                  <MapPin className={`mr-2 ${styles.icon}`} />
                  {job.employmentType}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className={styles.shortDetailDescription}>
                {job.shortDescription}
              </p>
            </div>
          </div>
          <div className="flex gap-5 py-3 pt-5 ">
            <button className={styles.detailsLaterButton}>
              Save for Later
            </button>
            <button type="submit" className={styles.detailsSubmitButton}>
              Apply Now
            </button>
          </div>
        </div>
        <div className="col-12 mx-auto p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className={styles.jobDetailTitle}> About the Job </h3>
          <p className={styles.shortDetailDescription}>{job.jobDescription}</p>
          <h3 className={`mt-7 ${styles.jobDetailTitle}`}> Key Skills</h3>
          <p className={styles.shortDetailDescription}>{job.keySkills}</p>
          <p className={styles.shortDetailDescription}>
            <strong>Department:</strong> {job.department}
          </p>
          <p className={styles.shortDetailDescription}>
            <strong>Role Category:</strong> {job.roleCategory}
          </p>
          <p className={styles.shortDetailDescription}>
            <strong>Employment Type:</strong> {job.employmentType}
          </p>
          <p className={styles.shortDetailDescription}>
            <strong>Salary Range:</strong> {job.salaryRange}
          </p>
          <p className={styles.shortDetailDescription}>
            <strong>Key Skills:</strong> {job.keySkills}
          </p>
          <p className={styles.shortDetailDescription}>
            <strong>Highlights:</strong> {job.jobHighlights}
          </p>
        </div>
      </div>
    </div>
  );
}
