"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./components.module.css";
import { MapPin, Clock2 } from "lucide-react";
import { Job } from "../types/job";

type Props = {
  jobs: Job[];
};

export function Cards({ jobs }: Props) {
  const [visibleCount, setVisibleCount] = useState(10);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreJobs = () => {
    setVisibleCount((prev) => prev + 10);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < jobs.length) {
          loadMoreJobs();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [visibleCount, jobs.length]);

  const visibleJobs = jobs.slice(0, visibleCount);
  return (
    <div className={`container-fluid space-y-6 mb-3" ${styles.cardContainer}`}>
      <h4 className={styles.cardHeading}>Available Jobs</h4>
      {visibleJobs.map((job, index) => (
        <div
          key={index}
          className="col-12 mx-auto p-5 border border-gray-200 rounded-lg bg-white shadow-sm"
        >
          <div className={styles.header}>
            <img
              src={`https://placehold.co/64x64?text=${encodeURIComponent(
                job.companyName
              )}`}
              alt={`${job.companyName} logo`}
            />
            <div className={`col-12 md-6 ${styles.headerText}`}>
              <h3 className={styles.jobTitle}>
                <a href={`/job/${job.id}`}>{job.jobTitle}</a>
              </h3>
              <div className={styles.jobDetail}>
                <p className={`flex items-center ${styles.jobCompany}`}>
                  {job.companyName}
                </p>
                <p className={`flex items-center ${styles.jobCompany}`}>
                  <Clock2 className={`mr-2 ${styles.icon}`} />
                  {job.location}
                </p>
                <p className={`flex items-center ${styles.jobCompany}`}>
                  <MapPin className={`mr-2 ${styles.icon}`} />
                  {job.employmentType}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <p className={styles.shortDescription}>{job.shortDescription}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={observerRef} className="h-10" />
    </div>
  );
}
