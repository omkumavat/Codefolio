import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, X, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CandidateSelectionModal = ({ onClose }) => {
  const [searchInput1, setSearchInput1] = useState('');
  const [searchInput2, setSearchInput2] = useState('');
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [selectedCandidate1, setSelectedCandidate1] = useState(null);
  const [selectedCandidate2, setSelectedCandidate2] = useState(null);
  const navigate = useNavigate();

  const fetchCandidates = async (query, setResults) => {
    if (query.length > 0) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dashboard/comparecandidate/search/candidates?search=${encodeURIComponent(query)}`
        );
        setResults(response.data.users);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    fetchCandidates(searchInput1, setSearchResults1);
  }, [searchInput1]);

  useEffect(() => {
    fetchCandidates(searchInput2, setSearchResults2);
  }, [searchInput2]);

  const handleCompare = () => {
    const route = `/dashboard/compare/result/${selectedCandidate1.username}/${selectedCandidate2.username}`;
    navigate(route, { state: { candidate1: selectedCandidate1, candidate2: selectedCandidate2 } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Compare Two Coders</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-3 items-center">
          {/* Candidate 1 Input */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <Search className="ml-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchInput1}
                onChange={(e) => setSearchInput1(e.target.value)}
                placeholder="Search first coder..."
                className="w-[200px] pl-2 pr-3 py-2 focus:outline-none"
                disabled={selectedCandidate1}
              />
              {selectedCandidate1 && (
                <button
                  onClick={() => {
                    setSelectedCandidate1(null);
                    setSearchInput1('');
                  }}
                  className="mr-3"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
            {searchInput1 && searchResults1.length === 0 && !selectedCandidate1 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                <p className="text-gray-500 text-center">No coder found</p>
              </div>
            )}
            {searchResults1 && searchResults1.length > 0 && !selectedCandidate1 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults1.map((candidate) => (
                  <button
                    key={candidate.username}
                    onClick={() => {
                      setSelectedCandidate1(candidate);
                      setSearchInput1(candidate.username);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                    disabled={selectedCandidate2?.username === candidate.username}
                  >
                    <img
                      src={candidate.profilePicture || '/default-avatar.png'}
                      alt={candidate.username}
                      className="h-6 w-6 rounded-full mr-3 object-cover"
                    />
                    <span>{candidate.username}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VS Icon */}
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img
                src={'/images/versus.png'}
                alt="VS"
                className="h-12 w-12 rounded-full object-contain"
              />
            </div>
          </div>

          {/* Candidate 2 Input */}
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <Search className="ml-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchInput2}
                onChange={(e) => setSearchInput2(e.target.value)}
                placeholder="Search second coder..."
                className="w-[200px] pl-2 pr-3 py-2 focus:outline-none"
                disabled={selectedCandidate2}
              />
              {selectedCandidate2 && (
                <button
                  onClick={() => {
                    setSelectedCandidate2(null);
                    setSearchInput2('');
                  }}
                  className="mr-3"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              )}
            </div>
            {searchInput2 && searchResults2.length === 0 && !selectedCandidate2 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-2">
                <p className="text-gray-500 text-center">No coder found</p>
              </div>
            )}
            {searchResults2 && searchResults2.length > 0 && !selectedCandidate2 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults2.map((candidate) => (
                  <button
                    key={candidate.username}
                    onClick={() => {
                      setSelectedCandidate2(candidate);
                      setSearchInput2(candidate.username);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                    disabled={selectedCandidate1?.username === candidate.username}
                  >
                    <img
                      src={candidate.profilePicture || '/default-avatar.png'}
                      alt={candidate.username}
                      className="h-6 w-6 rounded-full mr-3 object-cover"
                    />
                    <span>{candidate.username}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Compare Button */}
        <div className="flex justify-end gap-4 mt-8">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button
            onClick={handleCompare}
            disabled={!selectedCandidate1 || !selectedCandidate2}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            <Activity className="h-5 w-5" /> Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSelectionModal;
