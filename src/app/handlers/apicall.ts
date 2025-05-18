export const fetchJobsFromAPI = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/jobs');
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API Fetch Error:', err);
    return [];
  }
};
