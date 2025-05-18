export const fetchJobsFromAPI = async () => {
  try {
    const res = await fetch('https://job-board-eosin.vercel.app/api/jobs');
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API Fetch Error:', err);
    return [];
  }
};
