"use client";

import { Navbar } from "@/app/components/navbar";
import styles from "./page.module.css";
import { Search, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useJobContext } from "../context/jobContext";
import { fetchJobsFromAPI } from "../handlers/apicall";
import { Cards } from "@/app/components/cards";

export default function Job() {
  const { jobs, setJobs } = useJobContext();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [employmentFilters, setEmploymentFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (jobs.length === 0) {
      const loadJobs = async () => {
        const data = await fetchJobsFromAPI();
        setJobs(data);
      };
      loadJobs();
    }
  }, [setJobs, jobs.length]);

  const handleCheckbox = (filterType: string, value: string) => {
    if (filterType === "location") {
      setLocationFilters((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filterType === "employment") {
      setEmploymentFilters((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchedSearchTerm =
      job.jobTitle
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      job.companyName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      job.location.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());

    const matchedLocation =
      locationFilters.length === 0 || locationFilters.includes(job.location);
    const matchedEmployment =
      employmentFilters.length === 0 ||
      employmentFilters.includes(job.employmentType);

    return matchedSearchTerm && matchedEmployment && matchedLocation;
  });

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className={`container-fluid ${styles.bgContainer}`}>
      <div className={styles.mainContainer}>
        <Navbar otherPage={false} />
        <div className={styles.mainContent}>
          <h1 className={styles.heading}>Find Your Dream Job</h1>
          <p className={styles.subText}>
            Seeking new career opportunities? Explore our latest job openings
            and apply <br /> for positions that align with your goals today
          </p>
          <div
            className={`bg-white w-full max-w-[680px] mx-auto p-4 rounded rounded-lg ${styles.searchContainer}`}
          >
            <form className="flex items-center gap-2">
              <div className="relative w-full">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${styles.icon}`}
                />
                <input
                  type="text"
                  placeholder="Search Job Title"
                  className={`w-full pl-10 pr-4 py-2 placeholder-gray-400 text-black rounded ${styles.input}`}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className={`px-4 py-2 text-white rounded transition ${styles.button}`}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-12 gap-4 ${styles.filteredJobs}`}>
        <div className="col-span-12 lg:hidden p-4 pb-0">
          <button
            onClick={toggleFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
            aria-label="Toggle filters"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
        <div
          className={`col-span-12 lg:col-span-2 p-4 ${
            isFilterOpen ? "block" : "hidden"
          } lg:block bg-white lg:bg-transparent shadow-md lg:shadow-none absolute lg:static top-16 left-0 w-full lg:w-auto z-10 transition-all duration-300 ease-in-out`}
        >
          <div className={styles.filters}>
            <h4 className={`mb-3 ${styles.cardHeading}`}>Filters</h4>
            <div className="mb-3">
              <h2 className="font-semibold mb-2">Location</h2>
              {["Chennai", "Bangalore", "Hyderabad", "Remote"].map((loc) => (
                <label key={loc} className="block text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={locationFilters.includes(loc)}
                    onChange={() => handleCheckbox("location", loc)}
                  />
                  {loc}
                </label>
              ))}
            </div>
            <div>
              <h2 className="font-semibold mb-2">Employment Type</h2>
              {["Full-Time", "Part-Time", "Contract", "Internship"].map(
                (type) => (
                  <label key={type} className="block text-sm">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={employmentFilters.includes(type)}
                      onChange={() => handleCheckbox("employment", type)}
                    />
                    {type}
                  </label>
                )
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-10 p-4">
          {filteredJobs.length > 0 ? (
            <Cards jobs={filteredJobs} />
          ) : (
            <div className="text-center text-gray-500 mt-8 text-lg">
              No jobs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
