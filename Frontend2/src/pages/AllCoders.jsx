import React, { useState, useEffect, useRef } from "react";
import {
    Search,
    Trophy,
    RefreshCw,
    ChevronUp,
    ChevronDown,
    Download,
    School,
    ListChecks,
} from "lucide-react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Link } from "react-router-dom";
import { useTheme } from "../App";

const mockUsers = [
    {
        username: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        college: "MIT",
        branch: "Computer Science",
        totalActiveDays: 30,
        GeeksforGeeks: 150,
        LeetCode: 200,
        CodeChef: 100,
        CodeForces: 120,
        Github: 50,
    },
    {
        username: "jane_smith",
        name: "Jane Smith",
        email: "jane@example.com",
        college: "Stanford",
        branch: "Electrical Engineering",
        totalActiveDays: 45,
        GeeksforGeeks: 180,
        LeetCode: 250,
        CodeChef: 130,
        CodeForces: 140,
        Github: 60,
    },
    {
        username: "alex_wong",
        name: "Alex Wong",
        email: "alex@example.com",
        college: "Harvard",
        branch: "Computer Science",
        totalActiveDays: 60,
        GeeksforGeeks: 220,
        LeetCode: 300,
        CodeChef: 150,
        CodeForces: 180,
        Github: 80,
    },
    {
        username: "sara_lee",
        name: "Sara Lee",
        email: "sara@example.com",
        college: "MIT",
        branch: "Electrical Engineering",
        totalActiveDays: 25,
        GeeksforGeeks: 120,
        LeetCode: 180,
        CodeChef: 90,
        CodeForces: 100,
        Github: 40,
    },
    {
        username: "mike_chen",
        name: "Mike Chen",
        email: "mike@example.com",
        college: "Stanford",
        branch: "Computer Science",
        totalActiveDays: 40,
        GeeksforGeeks: 160,
        LeetCode: 220,
        CodeChef: 110,
        CodeForces: 130,
        Github: 55,
    },
];

const AllCoders = () => {
    const {isDarkMode}=useTheme();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [platform, setPlatform] = useState("LeetCode");
    const [selectedCollege, setSelectedCollege] = useState("All");
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState("solved");
    const [sortDirection, setSortDirection] = useState("desc");
    const [userRange, setUserRange] = useState({ start: 1, end: 1 });
    const itemsPerPage = 20;
    const tableRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, [platform]);

    const transformUserData = (apiUsers) => {
        return apiUsers
            .filter((user) => user.username && user.name)
            .map((user) => ({
                username: user.username,
                name: user.name,
                solved: user[platform] || 0,
                platform,
                college: user.college || "Not Provided",
                branch: user.branch || "Not Provided",
                totalActiveDays: user.totalActiveDays || 0,
            }));
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            setError(null);
            const response = await fetch("http://localhost:4000/server/dashboard/allcoders/get-all");
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
                setUsers(transformUserData(result.data));
                console.log(transformUserData(result.data));
                
            } else {
                throw new Error("Invalid data format received from server.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setUsers(transformUserData(mockUsers));
            setError("Unable to connect to the server. Showing sample data.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const getSortedUsers = (users) => {
        return [...users].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (aValue === undefined) return 1;
            if (bValue === undefined) return -1;
            return sortDirection === "asc"
                ? aValue > bValue
                    ? 1
                    : -1
                : aValue < bValue
                    ? 1
                    : -1;
        });
    };

    const getUniqueColleges = () => {
        const colleges = users.map((user) => user.college);
        return ["All", ...new Set(colleges)];
    };

    const getUniqueBranches = () => {
        const branches = users.map((user) => user.branch);
        return ["All", ...new Set(branches)];
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCollege =
            selectedCollege === "All" || user.college === selectedCollege;
        const matchesBranch =
            selectedBranch === "All" || user.branch === selectedBranch;
        return matchesSearch && matchesCollege && matchesBranch;
    });

    const sortedUsers = getSortedUsers(filteredUsers);
    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRangeChange = (e) => {
        const value = e.target.value.trim();

        if (value === "") {
            setUserRange({ start: 1, end: 1 });
            return;
        }

        const match = value.match(/^(\d+)-(\d+)$/);
        if (match) {
            const start = parseInt(match[1]);
            const end = parseInt(match[2]);

            if (start >= 1 && end >= start && end <= sortedUsers.length) {
                setUserRange({ start, end });
            }
        }
    };

    const rangeFilteredUsers = sortedUsers.slice(
        userRange.start - 1,
        userRange.end
    );

    const SortIcon = ({ field }) => {
        if (sortField !== field) return null;
        return sortDirection === "asc" ? (
            <ChevronUp className="w-4 h-4 inline-block ml-1" />
        ) : (
            <ChevronDown className="w-4 h-4 inline-block ml-1" />
        );
    };

    return (
        <div className="min-h-screen text-gray-700 p-6 pt-14 flex flex-col gap-6">
            {error && (
                <div className="bg-yellow-700/80 text-yellow-200 p-4 rounded-lg mb-4 flex justify-between items-center animate-fadeIn">
                    <p>{error}</p>
                    <button
                        onClick={fetchData}
                        disabled={isLoading}
                        className={`bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center transition-transform hover:scale-105`}
                    >
                        <RefreshCw
                            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                        />
                        {isLoading ? "Retrying..." : "Retry"}
                    </button>
                </div>
            )}

            <div className="w-full p-4 rounded-2xl border border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <ListChecks className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                        className="w-full h-12  text-gray-700 rounded-lg pl-10 pr-10 border border-gray-600 focus:border-blue-500 appearance-none"
                        onChange={(e) => setPlatform(e.target.value)}
                        value={platform}
                    >
                        <option value="LeetCode">LeetCode</option>
                        {/* <option value="CodeChef">CodeChef</option> */}
                        <option value="CodeForces">CodeForces</option>
                        <option value="GeeksforGeeks">GeeksforGeeks</option>
                        <option value="Github">Github</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                        className="w-full h-12  text-gray-700 rounded-lg pl-10 pr-10 border border-gray-600 focus:border-blue-500 appearance-none"
                        onChange={(e) => setSelectedCollege(e.target.value)}
                        value={selectedCollege}
                    >
                        {getUniqueColleges().map((college) => (
                            <option key={college} value={college}>
                                {college}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                        className="w-full h-12  text-gray-700 rounded-lg pl-10 pr-10 border border-gray-600 focus:border-blue-500 appearance-none"
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        value={selectedBranch}
                    >
                        {getUniqueBranches().map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
            </div>

            <div className="bg-gray-800/60 p-4 rounded-2xl border border-gray-700 relative flex gap-4">
                <div className="w-full">
                    <Search className="absolute pr-12 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 text-black rounded-lg pl-10 pr-12 border border-gray-600 focus:border-blue-500"
                    />
                </div>

                <input
                    type="text"
                    placeholder="1-5"
                    onChange={handleRangeChange}
                    className="h-12  text-black rounded-lg pl-3 pr-3 border border-gray-600 focus:border-blue-500 w-32"
                />
            </div>

            <div className="overflow-x-auto  p-4 rounded-2xl border border-gray-700">
                <table ref={tableRef} className="min-w-full table-auto">
                    <thead>
                        <tr className="text-left text-gray-700">
                            <th className="p-2">No.</th>
                            <th onClick={() => handleSort("username")} className="cursor-pointer p-2">
                                Username <SortIcon field="username" />
                            </th>
                            <th onClick={() => handleSort("name")} className="cursor-pointer p-2">
                                Name <SortIcon field="name" />
                            </th>
                            <th onClick={() => handleSort("college")} className="cursor-pointer p-2">
                                College <SortIcon field="college" />
                            </th>
                            <th onClick={() => handleSort("branch")} className="cursor-pointer p-2">
                                Branch <SortIcon field="branch" />
                            </th>
                            <th onClick={() => handleSort("solved")} className="cursor-pointer p-2">
                                {platform==="Github" ? "Contributions" : "Solved"} <SortIcon field="solved" />
                            </th>
                            <th onClick={() => handleSort("totalActiveDays")} className="cursor-pointer p-2">
                                Total Active Days <SortIcon field="totalActiveDays" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(userRange.start !== 1 || userRange.end !== 1
                            ? rangeFilteredUsers
                            : paginatedUsers
                        ).map((user, index) => (
                            <tr
                                key={user.username}
                                className={`hover:bg-gray-100`}
                            >
                                <td className="p-2">
                                    {userRange.start !== 1 || userRange.end !== 1
                                        ? userRange.start + index
                                        : (currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td className="p-2">
                                    <Link
                                        to={`https://codefolio-platform.vercel.app/user/${user.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline cursor-pointer transition-all duration-200"
                                    >
                                        {user.username}
                                    </Link>
                                </td>
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.college}</td>
                                <td className="p-2">{user.branch}</td>
                                <td className="p-2">{user.solved}</td>
                                <td className="p-2">{user.totalActiveDays}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between rounded-md items-center mt-4">
                <button
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                    disabled={
                        currentPage === 1 ||
                        (userRange.start !== 1 || userRange.end !== 1)
                    }
                    className="bg-blue-600 rounded-l-md hover:bg-blue-500 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg"
                >
                    Previous
                </button>
                <span className=" px-4 py-2 rounded-lg">
                    {userRange.start !== 1 || userRange.end !== 1
                        ? `Showing ${userRange.start}-${userRange.end} of ${sortedUsers.length}`
                        : `Page ${currentPage} of ${Math.ceil(
                            sortedUsers.length / itemsPerPage
                        )}`}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                        currentPage * itemsPerPage >= sortedUsers.length ||
                        userRange.start !== 1 ||
                        userRange.end !== 1
                    }
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg"
                >
                    Next
                </button>
            </div>

            <div className="flex justify-center items-center my-6">
                <DownloadTableExcel
                    filename={`coding-stats-${platform.toLowerCase()}`}
                    sheet={platform}
                    currentTableRef={tableRef.current}
                >
                    <button className="relative w-64 overflow-hidden border-2 border-black bg-black text-white font-extrabold uppercase px-8 py-4 rounded-full transition duration-200 group">
                        <span className="relative z-10 flex items-center justify-center gap-2 mix-blend-difference">
                            <Download className="w-5 h-5" />
                            Export
                        </span>
                        <span className="absolute inset-0 -translate-y-full bg-[linear-gradient(90deg,white_25%,transparent_0,transparent_50%,white_0,white_75%,transparent_0)] transition-transform duration-200 group-hover:translate-y-0"></span>
                        <span className="absolute inset-0 translate-y-full bg-[linear-gradient(90deg,transparent_0,transparent_25%,white_0,white_50%,transparent_0,transparent_75%,white_0)] transition-transform duration-200 group-hover:translate-y-0 z-[-1]"></span>
                    </button>
                </DownloadTableExcel>
            </div>
        </div>
    );
}

export default AllCoders;
