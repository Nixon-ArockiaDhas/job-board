"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  industryType: string;
  department: string;
  employmentType: string;
  roleCategory: string;
  jobDescription: string;
  jobHighlights: string[];
  keySkills: string[];
  educationRequirements: string;
  experienceLevel: string;
  salaryRange: string;
  shortDescription: string;
};

type JobContextType = {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context)
    throw new Error("useJobContext must be used inside JobProvider");
  return context;
};

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("jobs");
      if (stored) return JSON.parse(stored);
    }
    return [];
  });
  const setJobsAndPersist = (newJobs: Job[]) => {
    setJobs(newJobs);
    if (typeof window !== "undefined") {
      localStorage.setItem("jobs", JSON.stringify(newJobs));
    }
  };

  return (
    <JobContext.Provider value={{ jobs, setJobs: setJobsAndPersist }}>
      {children}
    </JobContext.Provider>
  );
}
