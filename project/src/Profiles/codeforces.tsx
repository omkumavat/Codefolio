import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Plus, Trophy, Globe, Flag, Star, Award, PlusCircle, RefreshCwIcon, DeleteIcon, Brain, Target, Badge } from 'lucide-react';
import CodeforcesGraph from '../components/CodeforcesGraph';
import { useTheme } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../Context/AuthProvider';
import CodeforcesModal from '../components/CodeforcesModal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../components/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ActivityCalendar from '../components/ActivityCalender';
const Codeforces = () => {
    const { username } = useParams();
    const { currentUser, updateProfile } = useAuth();
    const { isDarkMode } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasAccount, setHasAccount] = useState(false);
    const [loading, setloading] = useState(false);
    const [ShowRefresh, setShowRefresh] = useState(false);
    const [ShowDelete, setShowDelete] = useState(false);
    const [hasFetchedUser, setHasFetchedUser] = useState(false);

    // Codeforces specific states
    const [cfUsername, setCfUsername] = useState("");
    const [rating, setRating] = useState(0);
    const [maxRating, setMaxRating] = useState(0);
    const [rank, setRank] = useState("");
    const [maxRank, setMaxRank] = useState("");
    const [globalRank, setGlobalRank] = useState(0);
    const [countryRank, setCountryRank] = useState(0);
    const [countryName, setCountryName] = useState("");
    const [problemsSolved, setProblemsSolved] = useState(0);
    const [contestHistory, setContestHistory] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [submissionCalendar2025, setSubmissionCalendar2025] = useState([]);
    const [submissionCalendar2024, setSubmissionCalendar2024] = useState([]);
    const [submissionCalendar2023, setSubmissionCalendar2023] = useState([]);
    const [submissionCalendar2022, setSubmissionCalendar2022] = useState([]);


    const selectedData =
        selectedYear === 2025
            ? submissionCalendar2025
            : selectedYear === 2024
                ? submissionCalendar2024
                : selectedYear === 2023
                    ? submissionCalendar2023
                    : selectedYear === 2022
                        ? submissionCalendar2022
                        : submissionCalendar2025;

    const setToast = (message, type = 'success') => {
        if (type === 'error') {
            toast.error(message);
        } else {
            toast.success(message);
        }
    };

    const fetchCodeforcesData = async () => {
        try {
            setloading(true);
            let response = null;
    
            if (currentUser) {
                if (currentUser?.username === username) {
                    if (currentUser?.CodeForces) {
                        setShowRefresh(true);
                        setShowDelete(true);
                        // This is self account and logged in
                        response = await axios.get(`http://localhost:4000/server/codeforces/fetch/${username}`);
                    } else {
                        // Account not added
                        console.log(hasAccount);
                        setHasAccount(false);
                        return;
                    }
                } else {
                    // Not self account and logged in
                    response = await axios.get(`http://localhost:4000/server/codeforces/fetch/${username}`);
                    setShowRefresh(false);
                    setShowDelete(false);
                }
            } else {
                // Not self account and not logged in
                response = await axios.get(`http://localhost:4000/server/codeforces/fetch/${username}`);
                setShowRefresh(false);
                setShowDelete(false);
            }
    
            if (!response || !response.data) {
                setloading(false);
                return;
            }
    
            const data = response.data.data;
            console.log("Codeforces Data:", data);
    
            setCfUsername(data?.username || "N/A");
            setMaxRating(data?.maxRating || 0);
             setRating(data?.currentRating || 0);
            setRank(data?.rank || "Unranked");
            setOrganization(data?.organization || "N/A");
            
            setContestParticipation(data.contests || []);
            console.log("API Response:", data);

            // Parse submission calendars
            const parseSubmissions = (submissions) => {
                return (submissions || []).map((datao) => ({
                    // Extract the date part only from the full date string
                    date: new Date(datao.creationTimeSeconds * 1000).toISOString().split('T')[0], // Convert from Unix timestamp
                    verdict: datao.verdict,
                    problem: datao.problem.name,
                    rating: datao.problem.rating || "N/A",
                    rank:datao.problem.rank,
                }));
            };
    
            const parseContests = (contests: any) => {
                return (contests || []).map((contest: { contestName: any; rank: any; ratingChange: any; oldRating: any; newRating: any; }) => ({
                    contestName: contest.contestName,
                    rank: contest.rank,
                    ratingChange: contest.ratingChange,
                    oldRating: contest.oldRating,
                    newRating: contest.newRating,
                }));
            };
    
            // setSubmissionCalendar2025(parseSubmissions(data.ActivityCalendar2025));
            // setSubmissionCalendar2024(parseSubmissions(data.ActivityCalendar2024));
            // setSubmissionCalendar2023(parseSubmissions(data.ActivityCalendar2023));
            // setSubmissionCalendar2022(parseSubmissions(data.ActivityCalendar2022));
            // setContestParticipation(parseContests(data.contests) || []);
    
            setHasAccount(true);
        } catch (error) {
            console.error("Error fetching Codeforces data:", error);
        } finally {
            setloading(false);
        }
    };
    
      

    const deleteCodeforcesAccount = async () => {
        try {
            if (currentUser && currentUser.CodeForces) {
                const cfId = currentUser.CodeForces;
                await axios.delete(`http://localhost:4000/server/codeforces/delete-codeforces/${cfId}`);
                setToast("Codeforces account removed successfully");
                fetchUpdatedUser();
            }
        } catch (error) {
            console.error("Error deleting Codeforces data:", error);
            setToast("Failed to remove Codeforces account", 'error');
        }
    };

    const fetchUpdatedUser = async () => {
        setloading(true);
        try {
            if (!currentUser?._id) return;

            const response = await axios.get(`http://localhost:4000/server/user/get-user/${currentUser._id}`);
            if (response.status === 200 && response.data?.data) {
                await updateProfile(response.data.data);
            }
        } catch (error) {
            console.error("Unable to fetch user", error);
            setToast("Failed to update user data", 'error');
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedUser && currentUser) {
            setHasFetchedUser(true);
            fetchUpdatedUser();
        }
        fetchCodeforcesData();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1 -translate-y-1/2">
                <Loader />
                <p className='relative right-1/2'>Please wait, loading data...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className={`min-h-screen mt-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <ToastContainer position="top-right" autoClose={3000} />
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`relative py-20 px-5 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-500 to-indigo-600'}`}
                >
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80"
                            alt="Coding Background"
                            className={`w-full h-full object-cover ${isDarkMode ? 'opacity-10' : 'opacity-20'}`}
                        />
                    </div>
                    <div className="container mx-auto relative z-10 mt-10">
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="rounded-full bg-white p-4 mb-6"
                            >
                                <Code2 className="h-12 w-12 text-indigo-600" />
                            </motion.div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-6xl font-bold text-white text-center mb-6"
                            >
                                Codeforces Profile
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-white text-center max-w-3xl mb-8"
                            >
                                Track your competitive programming journey
                            </motion.p>
                            {!hasAccount && (
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex items-center space-x-2 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
                                >
                                    <PlusCircle className="h-5 w-5" />
                                    <span>Add Codeforces Account</span>
                                </motion.button>

                            )}
                        </div>
                    </div>
                </motion.section>
                {/* change */}
                {!hasAccount ? (
                    <>
                        <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className="container mx-auto px-4">
                                <h2 className={`text-3xl text-center font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    Codeforces Handle: {cfUsername}
                                </h2>

                                {ShowRefresh && (
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        onClick={fetchCodeforcesData}
                                        className="flex justify-center items-center space-x-2 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors mx-auto w-fit"
                                    >
                                        <RefreshCwIcon className="h-5 w-5" />
                                        <span>Refresh</span>
                                    </motion.button>
                                )}
                            </div>
                        </section>

                        <div className="container mx-auto px-4 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                                {[
                                    { icon: <Trophy />, label: 'Current Rating', value: rating, subtext: rank },
                                    { icon: <Award />, label: 'Max Rating', value: maxRating, subtext: maxRank },
                                    { icon: <Badge />, label: 'Rank', value: rank ? rank : 'Unranked', subtext: 'Codeforces Title' },
                                    { icon: <Flag />, label: 'Country', value: countryName || 'N/A', subtext: countryRank ? `Rank #${countryRank}` : 'N/A' },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-indigo-500">{stat.icon}</div>
                                            <div>
                                                <div className="text-sm text-gray-500">{stat.label}</div>
                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                <div className="text-sm text-gray-500">{stat.subtext}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Problem Stats */}
                            <div className={`p-6 rounded-xl mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                                <h2 className="text-2xl font-bold mb-6">Problem Solving Stats</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-3xl font-bold text-indigo-500">{problemsSolved}</div>
                                        <div className="text-sm text-gray-500">Total Solved</div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Rating Graph */}
                            <div className="flex justify-center items-center min-h-screen">
                                <div className={`p-2 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg w-full max-w-4xl`}>

                                    <CodeforcesGraph isDarkMode={isDarkMode} handle="balajisaw07" />
                                </div>
                            </div>

                            {ShowDelete && (
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    onClick={deleteCodeforcesAccount}
                                    className="flex justify-center items-center space-x-2 mt-10 px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors mx-auto w-fit"
                                >
                                    <DeleteIcon className="h-5 w-5" />
                                    <span>Remove Codeforces Account</span>
                                </motion.button>
                            )}
                        </div>
                    </>
                ) :
                    (
                        <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className="container mx-auto px-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        {
                                            icon: <Brain className="h-12 w-12 text-indigo-500" />,
                                            title: "Competitive Programming",
                                            description: "Participate in regular contests and improve your problem-solving skills"
                                        },
                                        {
                                            icon: <Trophy className="h-12 w-12 text-indigo-500" />,
                                            title: "Global Rankings",
                                            description: "Compete with programmers worldwide and climb the global leaderboard"
                                        },
                                        {
                                            icon: <Target className="h-12 w-12 text-indigo-500" />,
                                            title: "Advanced Problems",
                                            description: "Challenge yourself with complex algorithmic problems"
                                        }
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                                        >
                                            <div className="mb-4">{feature.icon}</div>
                                            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {feature.title}
                                            </h3>
                                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                {isModalOpen && (
                    <CodeforcesModal isModalOpen={isModalOpen} setToast={setToast} setIsModalOpen={setIsModalOpen} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default Codeforces;

function setOrganization(organization: any) {
    throw new Error('Function not implemented.');
}
function setContestParticipation(arg0: any) {
    throw new Error('Function not implemented.');
}

function setCurrentRating(currentRating: any) {
    throw new Error('Function not implemented.');
}

