import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PlatformComparisonDisplay from './PlatformComparisonDisplay';

const ComparisonResultPage = ({ onReset }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract candidates from router state
  const { candidate1, candidate2 } = location.state || {};

  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Call the backend comparison algorithm once candidates are available.
  useEffect(() => {
    // If candidates are missing, redirect back to the comparison page.
    if (!candidate1 || !candidate2) {
      navigate('/dashboard/compare');
      return;
    }

    const compareCandidates = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/comparecandidate/compare/two`,
          { candidate1, candidate2 }
        );
        console.log(response.data);

        setComparisonData(response.data);
      } catch (err) {
        console.error('Error during candidate comparison:', err);
        setError('An error occurred while comparing candidates. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    compareCandidates();
  }, [candidate1, candidate2, navigate]);

  // Render a metric row (for platform-wise comparison)
  const renderMetricRow = (label, value1, value2, winner) => (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className={`w-1/3 text-right ${winner === 0 ? 'font-bold text-green-600' : 'text-gray-700'}`}>
        {value1.toLocaleString()}
      </div>
      <div className="w-1/3 text-center font-medium text-gray-600">{label}</div>
      <div className={`w-1/3 text-left ${winner === 1 ? 'font-bold text-green-600' : 'text-gray-700'}`}>
        {value2.toLocaleString()}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Comparing candidates, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link to="/dashboard/compare">
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Start New Comparison
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10">
      <h1 className="text-3xl font-extrabold text-center text-gray-800">Candidate Comparison Results</h1>

      {/* Overall Comparison Section */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Overall Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[candidate1, candidate2].map((candidate) => (
            <div key={candidate.username} className="flex flex-col items-center border p-6 rounded-lg hover:shadow-xl transition-shadow">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img
                  src={candidate.profilePicture || '/default-avatar.png'}
                  alt={candidate.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{candidate.username}</h3>
              <div className="mt-4 bg-indigo-50 w-full text-center py-3 rounded-lg">
                <p className="text-3xl font-bold text-indigo-600">{candidate.overallScore}</p>
                <p className="text-gray-600">Overall Score</p>
              </div>
            </div>
          ))}
        </div>
        {comparisonData.aggregatedWins && (
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              Overall Winner: {comparisonData.aggregatedWins.candidate1 > comparisonData.aggregatedWins.candidate2
                ? candidate1.username : candidate2.username}
            </h3>
          </div>
        )}
      </section>

      <div>
        <PlatformComparisonDisplay
          platform="leetcode"
          data={comparisonData.platformComparisons.leetcode}
          candidate1={candidate1}
          candidate2={candidate2}
        />
      </div>
      <div>
        <PlatformComparisonDisplay
          platform="codeforces"
          data={comparisonData.platformComparisons.codeforces}
          candidate1={candidate1}
          candidate2={candidate2}
        />
      </div>
      <div>
        <PlatformComparisonDisplay
          platform="codechef"
          data={comparisonData.platformComparisons.codechef}
          candidate1={candidate1}
          candidate2={candidate2}
        />
      </div>
      <div>
        <PlatformComparisonDisplay
          platform="gfg"
          data={comparisonData.platformComparisons.gfg}
          candidate1={candidate1}
          candidate2={candidate2}
        />
      </div>
      <div>
        <PlatformComparisonDisplay
          platform="github"
          data={comparisonData.platformComparisons.github}
          candidate1={candidate1}
          candidate2={candidate2}
        />
      </div>
      {/* Start New Comparison */}
      <div className="flex justify-center mt-8">
        <Link to="/dashboard/compare">
          <button className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg">
            Start New Comparison
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComparisonResultPage;
