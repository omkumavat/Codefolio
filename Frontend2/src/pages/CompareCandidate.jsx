import React, { useState } from 'react';
import {
  Users,
  BarChart2
} from 'lucide-react';
import CandidateSelectionModal from '../components/CompareCandidates/CandidateSelectionModal';

const CompareCandidate = () => {
  const [compareMode, setCompareMode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // // Mock stats generator
  // const getMockStats = (username) => ({
  //   leetcode: {
  //     solved: Math.floor(Math.random() * 1000) + 200,
  //     contestRating: Math.floor(Math.random() * 2000) + 1000,
  //     ranking: Math.floor(Math.random() * 10000) + 1,
  //     submissions: Math.floor(Math.random() * 2000) + 500
  //   },
  //   github: {
  //     repositories: Math.floor(Math.random() * 50) + 10,
  //     contributions: Math.floor(Math.random() * 3000) + 500,
  //     followers: Math.floor(Math.random() * 1000) + 100,
  //     stars: Math.floor(Math.random() * 500) + 50
  //   },
  //   codechef: {
  //     rating: Math.floor(Math.random() * 2000) + 1500,
  //     solved: Math.floor(Math.random() * 500) + 100,
  //     ranking: Math.floor(Math.random() * 5000) + 1
  //   },
  //   codeforces: {
  //     rating: Math.floor(Math.random() * 2000) + 1000,
  //     rank: ['Newbie', 'Pupil', 'Specialist', 'Expert', 'Candidate Master'][
  //       Math.floor(Math.random() * 5)
  //     ],
  //     contests: Math.floor(Math.random() * 50) + 10
  //   }
  // });

  return (
    <div className="max-w-7xl mx-auto p-4">
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Compare Coders</h1>
            {/* Only two buttons shown in the main page */}
            {!compareMode && (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setCompareMode('dual');
                    setShowModal(true);
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  Compare Two Coders
                </button>
                <button
                  onClick={() => {
                    // Uncomment and implement if needed for multiple candidate comparison
                    // setCompareMode('multiple');
                    // setShowModal(true);
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <BarChart2 className="h-5 w-5" />
                  Compare Multiple Coders
                </button>
              </div>
            )}
          </div>

          {showModal && (
            <CandidateSelectionModal
              onClose={() => setShowModal(false)}
            />
          )}
        </>
    </div>
  );
};

export default CompareCandidate;

// {platforms.map((platform) => (
//   <div key={platform.name} className="bg-white rounded-xl shadow-lg p-6">
//     <div className="flex items-center gap-3 mb-6">
//       <div className={`${platform.color} p-2 rounded-lg`}>
//         <platform.icon className="h-6 w-6 text-white" />
//       </div>
//       <h2 className="text-2xl font-bold text-gray-800">{platform.name} Comparison</h2>
//     </div>

//     {platform.name === 'LeetCode' && candidates.length === 2 && (
//       <>
//         {renderComparisonMetric(
//           'Problems Solved',
//           candidates[0].stats.leetcode.solved,
//           candidates[1].stats.leetcode.solved
//         )}
//         {renderComparisonMetric(
//           'Contest Rating',
//           candidates[0].stats.leetcode.contestRating,
//           candidates[1].stats.leetcode.contestRating
//         )}
//         {renderComparisonMetric(
//           'Global Ranking',
//           candidates[0].stats.leetcode.ranking,
//           candidates[1].stats.leetcode.ranking
//         )}
//       </>
//     )}

//   </div>
// ))}