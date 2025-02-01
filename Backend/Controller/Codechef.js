import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config();

export const getfuturecontest=async(requestAnimationFrame,res)=>{
    try{
        const response=await axios.get(`${process.env.codechef_api}`)
        console.log(response)

        if(response.data.status ==='success'){
            const futureContest = response.data.future_contests;

            if(futureContest && futureContest.length >0){

                const formattedContest=futureContest.map((contest)=>({
                    contest_code: contest.contest_code,
                    contest_name: contest.contest_name,
                    contest_start_date: contest.contest_start_date,
                    contest_end_date: contest.contest_end_date,
                    contest_start_date_iso: contest.contest_start_date_iso,
                    contest_end_date_iso: contest.contest_end_date_iso,
                    contest_duration: contest.contest_duration,
                    distinct_users: contest.distinct_users,
                }));
                res.status(200).json({
                    success:true,
                    message:'Future contest fetched successfully',
                    contests:formattedContest
                });
             } else{
                    res.status(404).json({
                        success: false,
                        message: 'No future contests found.',
                    }); 
                }

            }
            else {
                // API did not return success
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch contest data from the API.',
                });
        }
    }
    catch (error) {
        console.error(error);
        // Handle any errors that occur during the process
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching contests.',
        });
    }
}