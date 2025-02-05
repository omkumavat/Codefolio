import axios from 'axios';
import { JSDOM } from 'jsdom';

export const fetchGFG = async (req, res) => {
  const { username } = req.body;  // Get the username from the request body

  try {
    // Fetch HTML of the GeeksForGeeks user profile page
    const { data } = await axios.get(`https://www.geeksforgeeks.org/user/${username}`);

    const dom = new JSDOM(data);
    const document = dom.window.document;

    const userHandle = document.querySelector('.profilePicSection_head_userHandle__oOfFy')?.textContent;
    const stars = document.querySelectorAll('.profilePicSection_head_stars__JrrGz i').length;
    const education = document.querySelector('.educationDetails_head_left--text__tgi9I')?.textContent;
    const rank = document.querySelector('.educationDetails_head_left_userRankContainer--text__wt81s b')?.textContent.trim();
    const skills = document.querySelector('.educationDetails_head_right--text__lLOHI')?.textContent.trim();
    const contestAttended = document.querySelector('.contestDetailsCard_head_detail--text__NG_ae')?.textContent.trim();
//     const contestDetails = Array.from(document.querySelectorAll('.contest_head_UXeV_ .contestDetailsCard_head_detail--text__NG_ae'))
//   .map(element => element.textContent.trim());
// const contestDetails = Array.from(document.querySelectorAll('.contestDetailsCard_head__0MvGa .contestDetailsCard_head_detail__8P4Vo'))
//   .map(element => {
//     // Extracting the title text (e.g., "Contest Rating", "Level")
//     const title = element.querySelector('p.contestDetailsCard_head_detail--title__ngWg9').textContent.trim();

//     // Extracting the value (e.g., "1588", "2")
//     const value = element.querySelector('span.contestDetailsCard_head_detail--text__NG_ae').textContent.trim();

//     // Only return if both title and value are available
//     if (title && value) {
//       return { title, value };
//     }
//   })
//   .filter(item => item !== undefined);
const contestDetails = Array.from(document.querySelectorAll('p.contestDetailsCard_head_detail--title__ngWg9')).map(el => el.textContent.trim());


console.log(contestDetails);


    const contestrating = Array.from(document.querySelectorAll('.scoreCard_head_left--score__oSi_x')).map(el => el.textContent.trim());
    const streak = document.querySelector('.circularProgressBar_head_mid_streakCnt__MFOF1')?.textContent.trim();
    const percentageInfo = document.querySelector('.contestDetailsCard_head_card__2xPdL p')?.textContent.trim();

    const problemNames = Array.from(document.querySelectorAll('.problemList_head__FfRAd ul li')).map(li => {
      const anchor = li.querySelector('a');
      return anchor ? anchor.textContent.trim() : null;
    }).filter(name => name !== null);

    const difficultyLevels = Array.from(document.querySelectorAll('.problemNavbar_head__cKSRi .problemNavbar_head_nav__a4K6P'))
      .map(navItem => {
        const textElement = navItem.querySelector('.problemNavbar_head_nav--text__UaGCx');
        const textContent = textElement ? textElement.textContent.trim() : null;
        const matches = textContent ? textContent.match(/([A-Za-z]+)\s\((\d+)\)/) : null;
        return matches ? { difficulty: matches[1], solved: parseInt(matches[2], 10) } : null;
      })
      .filter(item => item !== null);

    // Send all the extracted data as the response
    return res.status(200).json({
      success: true,
      data: { 
        username: userHandle,
        stars: stars,
        education: education,
        rank: rank,
        skills: skills,
        contestRating: contestrating,
        streak: streak,
        contestAttended: contestAttended,
        // globalRank: globalRank,
        percentageInfo: percentageInfo,
        problemNames: problemNames,
        difficultyLevels: difficultyLevels,
        contestt:contestDetails
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data",
    });
  }
};
