import React, { useState, useEffect } from "react";
import axios from "axios";

const ContestCard = ({ contest }: { contest: any }) => {
  return (
    <div className="bg-black text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 relative border border-gray-700">
      <p className="text-center mb-4">
        <span className="font-bold">{contest.contest_name || contest.name}</span>
      </p>
      <p className="text-center mb-2">
        <span className="font-bold">Start Time: </span>
        {new Date(
          contest.contest_start_date || contest.startTime
        ).toLocaleString()}
      </p>
      <p className="text-center mb-4">
        <span className="font-bold">Duration: </span>
        {contest.contest_duration
          ? `${contest.contest_duration} hours`
          : `${Math.floor(contest.duration / 3600)} hours ${
              (contest.duration % 3600) / 60
            } minutes`}
      </p>
      <div className="text-center">
        <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all">
          Enter Contest
        </button>
      </div>
      <div className="absolute inset-0 rounded-xl blur-lg opacity-50 bg-gradient-to-r from-purple-500 to-blue-500 z-[-1]"></div>
    </div>
  );
};

const ContestSection = () => {
  const [codeforcesData, setCodeforcesData] = useState<any[]>([]);
  const [codechefData, setCodechefData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Fetch Codeforces contests
        const codeforcesResponse = await axios.get(
          "http://localhost:4000/server/codeforces/contestfetch"
        );
        if (codeforcesResponse.data.success) {
          setCodeforcesData(codeforcesResponse.data.contest);
        }

        // Fetch CodeChef contests
        const codechefResponse = await axios.get(
          "http://localhost:4000/server/codechef/contestfetch"
        );
        if (codechefResponse.data.success) {
          setCodechefData(codechefResponse.data.contests);
        }
      } catch (error) {
        console.error("Failed to fetch contests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading contests...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 py-10">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Upcoming Contests
      </h2>

      {/* Codeforces Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          Codeforces Contests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {codeforcesData.map((contest, index) => (
            <ContestCard key={`cf-${index}`} contest={contest} />
          ))}
        </div>
      </div>

      {/* CodeChef Section */}
      <div>
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          CodeChef Contests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {codechefData.map((contest, index) => (
            <ContestCard key={`cc-${index}`} contest={contest} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestSection;
