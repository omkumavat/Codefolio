import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SubmissionDay {
  date: string;
  count: number;
}

interface SubmissionCalendarProps {
  handle: string;
  isDarkMode: boolean;
  onTotalCountChange: (count: number) => void;
}

const SubmissionCalendar: React.FC<SubmissionCalendarProps> = ({ handle, isDarkMode, onTotalCountChange }) => {
  const [data, setData] = useState<SubmissionDay[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
        const result = await response.json();
        if (result.status === "OK") {
          const submissions = result.result;
          const submissionCounts: Record<string, number> = {};

          submissions.forEach((submission: any) => {
            const date = new Date(submission.creationTimeSeconds * 1000)
              .toISOString()
              .split("T")[0];
            submissionCounts[date] = (submissionCounts[date] || 0) + 1;
          });

          const formattedData = Object.keys(submissionCounts).map(date => ({
            date,
            count: submissionCounts[date],
          }));

          setData(formattedData);

          // Calculate total count and update the parent
          const totalCount = formattedData.reduce((sum, day) => sum + day.count, 0);
          onTotalCountChange(totalCount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [handle, selectedYear]);

  const getIntensityColor = (count: number) => {
    if (count === 0) return isDarkMode ? "bg-gray-800" : "bg-gray-200";
    if (count <= 2) return "bg-green-200";
    if (count <= 5) return "bg-green-300";
    if (count <= 9) return "bg-green-400";
    return "bg-green-600";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const generateFullYearData = () => {
    const fullYearData: Record<number, SubmissionDay[]> = {};

    for (let month = 0; month < 12; month++) {
      fullYearData[month] = [];
      const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${selectedYear}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const existingDay = data.find(d => d.date === dateString);
        fullYearData[month].push({ date: dateString, count: existingDay ? existingDay.count : 0 });
      }
    }
    return fullYearData;
  };

  const groupedData = generateFullYearData();

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="flex justify-between mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {months.map((month, monthIndex) => (
          <div key={monthIndex} className="flex flex-col items-center">
            <div className="text-sm font-semibold text-gray-500">{month}</div>
            <div className="grid grid-cols-7 gap-1 mt-2">
              {groupedData[monthIndex].map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.001 }}
                  className="group relative"
                >
                  <div className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count)} transition-colors duration-200`} />
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-7 py-1 rounded text-xs whitespace-nowrap ${
                      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                    } shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10`}
                  >
                    {day.count} submissions on {day.date}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionCalendar;
