import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Trophy, Star, GitBranch, Code2, Activity, Users, BarChart2 } from 'lucide-react';

const CompareCandidate = () => {
  const [compareMode, setCompareMode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const platforms = [
    { name: 'LeetCode', icon: Code2, color: 'bg-yellow-500' },
    { name: 'GitHub', icon: GitBranch, color: 'bg-gray-800' },
    { name: 'CodeChef', icon: Trophy, color: 'bg-blue-500' },
    { name: 'CodeForces', icon: Star, color: 'bg-red-500' }
  ];

  // Mock search function
  useEffect(() => {
    if (searchInput.length > 2) {
      // Simulate API call
      const results = ['john_doe', 'jane_smith', 'dev_master'].filter(name =>
        name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  // Mock data for demonstration
  const getMockStats = (username) => ({
    leetcode: {
      solved: Math.floor(Math.random() * 1000) + 200,
      contestRating: Math.floor(Math.random() * 2000) + 1000,
      ranking: Math.floor(Math.random() * 10000) + 1,
      submissions: Math.floor(Math.random() * 2000) + 500
    },
    github: {
      repositories: Math.floor(Math.random() * 50) + 10,
      contributions: Math.floor(Math.random() * 3000) + 500,
      followers: Math.floor(Math.random() * 1000) + 100,
      stars: Math.floor(Math.random() * 500) + 50
    },
    codechef: {
      rating: Math.floor(Math.random() * 2000) + 1500,
      solved: Math.floor(Math.random() * 500) + 100,
      ranking: Math.floor(Math.random() * 5000) + 1
    },
    codeforces: {
      rating: Math.floor(Math.random() * 2000) + 1000,
      rank: ['Newbie', 'Pupil', 'Specialist', 'Expert', 'Candidate Master'][Math.floor(Math.random() * 5)],
      contests: Math.floor(Math.random() * 50) + 10
    }
  });

  const addCandidate = (username) => {
    if (compareMode === 'dual' && candidates.length >= 2) return;
    if (!candidates.find(c => c.username === username)) {
      const newCandidate = {
        username,
        overallScore: Math.floor(Math.random() * 100) + 1,
        stats: getMockStats(username)
      };
      setCandidates([...candidates, newCandidate]);
      setSearchInput('');
      setSearchResults([]);
    }
  };

  const removeCandidate = (username) => {
    setCandidates(candidates.filter(c => c.username !== username));
  };

  const handleCompare = () => {
    setShowModal(false);
    setShowComparison(true);
  };

  const renderComparisonMetric = (label, value1, value2) => {
    const winner = value1 > value2 ? 0 : 1;
    return (
      <div className="flex items-center justify-between mb-4 bg-white rounded-lg p-4 shadow-sm">
        <div className={`w-2/5 text-right ${winner === 0 ? 'font-bold text-green-600' : ''}`}>
          {value1.toLocaleString()}
        </div>
        <div className="w-1/5 text-center text-gray-600 text-sm">{label}</div>
        <div className={`w-2/5 ${winner === 1 ? 'font-bold text-green-600' : ''}`}>
          {value2.toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {!showComparison ? (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Compare Candidates</h1>
            
            {!compareMode && (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setCompareMode('dual');
                    setShowModal(true);
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  Compare Two Candidates
                </button>
                <button
                  onClick={() => {
                    setCompareMode('multiple');
                    setShowModal(true);
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <BarChart2 className="h-5 w-5" />
                  Compare Multiple Candidates
                </button>
              </div>
            )}
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {compareMode === 'dual' ? 'Compare Two Candidates' : 'Compare Multiple Candidates'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {compareMode === 'dual' && (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search first candidate..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search second candidate..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            disabled={candidates.length < 1}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {compareMode === 'multiple' && (
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search candidates..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Selected Candidates */}
                  <div className="flex flex-wrap gap-2">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.username}
                        className="bg-indigo-100 px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <span className="text-indigo-800">{candidate.username}</span>
                        <button
                          onClick={() => removeCandidate(candidate.username)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      {searchResults.map((username) => (
                        <button
                          key={username}
                          onClick={() => addCandidate(username)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0"
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{username}</p>
                            <p className="text-sm text-gray-500">Full Stack Developer</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCompare}
                      disabled={candidates.length < 2}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Activity className="h-5 w-5" />
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-8">
          {/* Overall Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overall Comparison</h2>
            <div className="grid grid-cols-2 gap-8">
              {candidates.map((candidate, index) => (
                <div key={candidate.username} className="text-center">
                  <div className="mb-4">
                    <div className="h-20 w-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-indigo-600">
                        {candidate.username[0].toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{candidate.username}</h3>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-indigo-600">{candidate.overallScore}</p>
                    <p className="text-gray-600">Overall Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform-wise Comparison */}
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`${platform.color} p-2 rounded-lg`}>
                  <platform.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{platform.name} Comparison</h2>
              </div>

              {platform.name === 'LeetCode' && candidates.length === 2 && (
                <>
                  {renderComparisonMetric('Problems Solved', 
                    candidates[0].stats.leetcode.solved,
                    candidates[1].stats.leetcode.solved
                  )}
                  {renderComparisonMetric('Contest Rating',
                    candidates[0].stats.leetcode.contestRating,
                    candidates[1].stats.leetcode.contestRating
                  )}
                  {renderComparisonMetric('Global Ranking',
                    candidates[0].stats.leetcode.ranking,
                    candidates[1].stats.leetcode.ranking
                  )}
                </>
              )}

              {platform.name === 'GitHub' && candidates.length === 2 && (
                <>
                  {renderComparisonMetric('Repositories',
                    candidates[0].stats.github.repositories,
                    candidates[1].stats.github.repositories
                  )}
                  {renderComparisonMetric('Contributions',
                    candidates[0].stats.github.contributions,
                    candidates[1].stats.github.contributions
                  )}
                  {renderComparisonMetric('Stars Received',
                    candidates[0].stats.github.stars,
                    candidates[1].stats.github.stars
                  )}
                </>
              )}

              {/* Add similar sections for CodeChef and CodeForces */}
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setShowComparison(false);
                setCandidates([]);
                setCompareMode(null);
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Start New Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareCandidate;
