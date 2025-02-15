import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingGraph from './RatingGraph';
import RatingGraph2 from './RatingGraph2';

const CodeforcesGraph: React.FC<{ handle: string; isDarkMode: boolean }> = ({ handle, isDarkMode }) => {
  const [contestData, setContestData] = useState<{ date: string; rating: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        setLoading(true);
        const apiResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
        
        if (apiResponse.data.status === 'OK') {
          const formattedData = apiResponse.data.result.map((contest: any) => ({
            date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
            rating: contest.newRating,
          }));
          setContestData(formattedData);
        } else {
          setError('Failed to fetch contest data');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch contest data');
      } finally {
        setLoading(false);
      }
    };

    fetchContestData();
  }, [handle]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!contestData.length) {
    return <div className="text-center text-gray-500">No contest data available</div>;
  }

  return (
    <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h2 className="text-2xl font-bold mb-6">Contest Rating History for {handle}</h2>
      <RatingGraph2 data={contestData} isDarkMode={isDarkMode} />

    </div>
  );
};

export default CodeforcesGraph;
