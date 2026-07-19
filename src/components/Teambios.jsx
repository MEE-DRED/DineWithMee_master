// import { useState } from "react";

// // ─── Team photography ──────────────────────────────────────────────────────────
// // Place the team-photos/ folder next to this file (or adjust the paths below).
// // src/components/Teambios.jsx

// import mildredImg from "../assets/images/mildred-ewenrim-ebomah.jpg";
// import chinonyelumImg from "../assets/images/chinonyelum-nwufoh.jpg";
// import victoriaImg from "../assets/images/obichukwu-victoria.jpg";
// import gideonImg from "../assets/images/gideon-ogbonna.jpg";
// import amarachiImg from "../assets/images/amarachi-emmanuel.jpg";
// import mugishaImg from "../assets/images/mugisha-narcisse.jpg";
// import fakoredeImg from "../assets/images/fakorede-olawale.jpg";
// import danielImg from "../assets/images/daniel-igbinnosa.jpg";

// // ─── Team roster — grouped exactly as in the official Team Bios document ──────
// const TEAM_GROUPS = [
//   {
//     group: "Leadership",
//     members: [
//       {
//         name: "Mildred Ewenrim Ebomah",
//         role: "Founder/CEO",
//         img: mildredImg,
//         bio: [
//           "Mildred Ewenrim Ebomah is the Founder of DineWithMee, a platform focused on improving health outcomes through African nutrition, preventive health, and practical digital solutions. With a background in medical radiography and experience within clinical and healthcare environments, she brings both healthcare understanding and strategic direction into the platform's development.",
//           "She leads the overall vision of DineWithMee, connecting health expertise, technology, operations, and user experience into one clear, mission-driven product.",
//           "Her work focuses on ensuring the platform is not only innovative but also practical, culturally relevant, and accessible to everyday users. She is deeply involved in shaping product growth, team coordination, and the long-term direction of the company as it expands across health and nutrition spaces.",
//         ],
//       },
//       {
//         name: "Chinonyelum Nwufoh",
//         role: "Co-Founder / Product Manager",
//         img: chinonyelumImg,
//         bio: [
//           "Chinonyelum Nwufoh is the Co-Founder and Product Manager at DineWithMee, where she leads product strategy and development, transforming ideas into scalable, user-focused digital solutions. With over 10 years of experience spanning computer engineering, mathematics, data analytics, research, and financial accounting, she brings a multidisciplinary approach to product management, innovation, and business growth.",
//           "She specializes in aligning user needs, business goals, and technical execution through structured product planning, feature prioritization, stakeholder engagement, and cross-functional collaboration. Her background in data science and analytics enables her to drive data-informed decisions and continuous product improvement. Chinonyelum is passionate about building impactful technology solutions that combine functionality, usability, innovation, operational efficiency, and long-term strategic growth globally.",
//         ],
//       },
//     ],
//   },
//   {
//     group: "Health Team",
//     members: [
//       {
//         name: "Dtn. Obichukwu Victoria",
//         role: "Nutrition & Dietetics Lead",
//         img: victoriaImg,
//         bio: [
//           "Obichukwu Victoria is a licensed Nutrition and Dietetics professional with over 10 years of experience across hospital and academic settings. At DineWithMee, she supports the nutrition and health side of the product, helping ensure meal recommendations and health guidance are clinically sound and practical.",
//           "She has worked closely with patients in different care settings, translating dietary needs into realistic food plans. Her experience in both clinical and educational environments allows her to balance science with real-life application. She plays a key role in shaping the platform's nutrition direction and ensuring it aligns with evidence-based dietary practice and user wellbeing.",
//         ],
//       },
//       {
//         name: "Pharm. Gideon Ogbonna",
//         role: "Pharmacist & Communication Strategist",
//         img: gideonImg,
//         bio: [
//           "Pharm. Gideon Ogbonna is a licensed pharmacist with over 7 years of experience in pharmaceutical practice. He has worked across ANC, pediatric, and general outpatient care, supporting safe and effective medication use. At DineWithMee, he works with clients who are on medication to ensure nutrition and prescriptions align safely, especially where food-drug interactions are involved.",
//           "Beyond clinical practice, he also serves as the communication strategist for the team, with over 5 years of experience in communication work. He helps shape how DineWithMee communicates health information clearly, ensuring it is simple, accurate, and easy for users to understand.",
//         ],
//       },
//     ],
//   },
//   {
//     group: "Operations & Logistics",
//     members: [
//       {
//         name: "Amarachi Emmanuel",
//         role: "Operations & Logistics",
//         img: amarachiImg,
//         bio: [
//           "Amarachi Emmanuel is a certified business administrator and part of the Operations and Logistics team at DineWithMee. She oversees key areas that keep the business running smoothly, including logistics, sourcing of authentic ingredients, procurement, inventory management, and coordination with chef partners.",
//           "She plays a central role in making sure the right ingredients are sourced and delivered on time while maintaining quality and consistency across supply chains. Her work connects the kitchen, suppliers, and operations flow, ensuring everything behind the scenes supports a reliable customer experience. She is focused on building a structured, efficient system to support the growth and expansion of DineWithMee across multiple locations.",
//         ],
//       },
//     ],
//   },
//   {
//     group: "Tech",
//     members: [
//       {
//         name: "Mugisha Narcisse",
//         role: "Front-End Developer & UI/UX Designer",
//         img: mugishaImg,
//         bio: [
//           "Mugisha Narcisse is a Front-End Developer and UI/UX Designer at DineWithMee, focused on building clean, intuitive, and responsive user experiences. He works on turning product ideas into simple and engaging interfaces that work smoothly across all devices.",
//           "He combines development and design skills to make sure the platform is both functional and visually clear. With experience in modern design tools and front-end frameworks, he pays close attention to usability, consistency, and user flow. His goal is to make sure users can easily navigate the platform and interact with health-focused features without confusion or friction.",
//         ],
//       },
//       {
//         name: "Fakorede Olawale",
//         role: "Full-Stack Developer",
//         img: fakoredeImg,
//         bio: [
//           "Fakorede Olawale is a Full-Stack Developer and Technical Lead at DineWithMee, working across both web development and system design. He builds and supports scalable applications while also contributing to how the platform integrates different technical components.",
//           "He is also involved in guiding technical learning and breaking down complex systems into practical, workable solutions for the team. His strength lies in connecting software logic with real-world applications, especially in building systems that are efficient, reliable, and easy to extend as the product grows.",
//         ],
//       },
//       {
//         name: "Daniel Igbinnosa",
//         role: "Software Developer (Intern)",
//         img: danielImg,
//         bio: [
//           "Daniel Igbinnosa is a Software Developer Intern at DineWithMee with a growing focus on building practical tech solutions and improving his skills in software development and data analysis.",
//           "He contributes to development tasks while learning and strengthening his ability to solve real-world problems through code. He is interested in building useful, user-focused digital products and enjoys working in environments where he can grow technically while contributing to meaningful work. Outside of tech, he brings creativity from his interest in design, sports, and music into how he thinks and builds.",
//         ],
//       },
//     ],
//   },
// ];

// // ─── Individual team member card ───────────────────────────────────────────────
// function TeamMemberCard({ member }) {
//   const [expanded, setExpanded] = useState(false);
//   const [firstPara, ...restParas] = member.bio;

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
//       <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
//         <img
//           src={member.img}
//           alt={member.name}
//           loading="lazy"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="p-5 flex flex-col flex-1">
//         <h3
//           className="text-base sm:text-lg font-black text-gray-900 leading-tight"
//           style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//         >
//           {member.name}
//         </h3>
//         <p className="text-xs sm:text-sm font-bold text-[#1a3d2e] mt-1 mb-3">
//           {member.role}
//         </p>

//         <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
//           {firstPara}
//         </p>

//         {expanded && restParas.length > 0 && (
//           <div className="space-y-3 mt-3" style={{ animation: "teamFadeIn 0.3s ease both" }}>
//             {restParas.map((para, i) => (
//               <p key={i} className="text-xs sm:text-sm text-gray-600 leading-relaxed">
//                 {para}
//               </p>
//             ))}
//           </div>
//         )}

//         {restParas.length > 0 && (
//           <button
//             onClick={() => setExpanded(v => !v)}
//             className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a3d2e] hover:gap-2.5 transition-all mt-4 self-start"
//           >
//             {expanded ? "Read less" : "Read more"}
//             <svg
//               width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//               strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
//               style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
//             >
//               <path d="M6 9l6 6 6-6" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Full Team Bios section ────────────────────────────────────────────────────
// // Drop this in as a page section (e.g. <section id="team">…</section> in your
// // landing page) or render it standalone as its own page.
// export default function TeamBios() {
//   return (
//     <div className="w-full">
//       <style>{`
//         @keyframes teamFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 px-4">
//         <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
//           Team Bios
//         </span>
//         <h2
//           className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900"
//           style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//         >
//           The people behind DineWithMee
//         </h2>
//       </div>

//       <div className="space-y-12">
//         {TEAM_GROUPS.map(group => (
//           <div key={group.group}>
//             <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-1">
//               {group.group}
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//               {group.members.map(member => (
//                 <TeamMemberCard key={member.name} member={member} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";

// ─── Team photography ──────────────────────────────────────────────────────────
// Place the team-photos/ folder next to this file (or adjust the paths below).
// src/components/Teambios.jsx

import mildredImg from "../assets/images/mildred-ewenrim-ebomah.jpg";
import chinonyelumImg from "../assets/images/chinonyelum-nwufoh.jpg";
import victoriaImg from "../assets/images/obichukwu-victoria.jpg";
import gideonImg from "../assets/images/gideon-ogbonna.jpg";
import amarachiImg from "../assets/images/amarachi-emmanuel.jpg";
import mugishaImg from "../assets/images/mugisha-narcisse.jpg";
import fakoredeImg from "../assets/images/fakorede-olawale.jpg";
import danielImg from "../assets/images/daniel-igbinnosa.jpg";

// ─── Team roster — grouped exactly as in the official Team Bios document ──────
const TEAM_GROUPS = [
  {
    group: "Leadership",
    members: [
      {
        name: "Mildred Ewenrim Ebomah",
        role: "Founder/CEO",
        img: mildredImg,
        bio: [
          "Mildred Ewenrim Ebomah is the Founder of DineWithMee, a platform focused on improving health outcomes through African nutrition, preventive health, and practical digital solutions. With a background in medical radiography and experience within clinical and healthcare environments, she brings both healthcare understanding and strategic direction into the platform's development.",
          "She leads the overall vision of DineWithMee, connecting health expertise, technology, operations, and user experience into one clear, mission-driven product.",
          "Her work focuses on ensuring the platform is not only innovative but also practical, culturally relevant, and accessible to everyday users. She is deeply involved in shaping product growth, team coordination, and the long-term direction of the company as it expands across health and nutrition spaces.",
        ],
      },
      {
        name: "Chinonyelum Nwufoh",
        role: "Co-Founder / Product Manager",
        img: chinonyelumImg,
        bio: [
          "Chinonyelum Nwufoh is the Co-Founder and Product Manager at DineWithMee, where she leads product strategy and development, transforming ideas into scalable, user-focused digital solutions. With over 10 years of experience spanning computer engineering, mathematics, data analytics, research, and financial accounting, she brings a multidisciplinary approach to product management, innovation, and business growth.",
          "She specializes in aligning user needs, business goals, and technical execution through structured product planning, feature prioritization, stakeholder engagement, and cross-functional collaboration. Her background in data science and analytics enables her to drive data-informed decisions and continuous product improvement. Chinonyelum is passionate about building impactful technology solutions that combine functionality, usability, innovation, operational efficiency, and long-term strategic growth globally.",
        ],
      },
    ],
  },
  {
    group: "Health Team",
    members: [
      {
        name: "Dtn. Obichukwu Victoria",
        role: "Nutrition & Dietetics Lead",
        img: victoriaImg,
        bio: [
          "Obichukwu Victoria is a licensed Nutrition and Dietetics professional with over 10 years of experience across hospital and academic settings. At DineWithMee, she supports the nutrition and health side of the product, helping ensure meal recommendations and health guidance are clinically sound and practical.",
          "She has worked closely with patients in different care settings, translating dietary needs into realistic food plans. Her experience in both clinical and educational environments allows her to balance science with real-life application. She plays a key role in shaping the platform's nutrition direction and ensuring it aligns with evidence-based dietary practice and user wellbeing.",
        ],
      },
      {
        name: "Pharm. Gideon Ogbonna",
        role: "Pharmacist & Communication Strategist",
        img: gideonImg,
        bio: [
          "Pharm. Gideon Ogbonna is a licensed pharmacist with over 7 years of experience in pharmaceutical practice. He has worked across ANC, pediatric, and general outpatient care, supporting safe and effective medication use. At DineWithMee, he works with clients who are on medication to ensure nutrition and prescriptions align safely, especially where food-drug interactions are involved.",
          "Beyond clinical practice, he also serves as the communication strategist for the team, with over 5 years of experience in communication work. He helps shape how DineWithMee communicates health information clearly, ensuring it is simple, accurate, and easy for users to understand.",
        ],
      },
    ],
  },
  {
    group: "Operations & Logistics",
    members: [
      {
        name: "Amarachi Emmanuel",
        role: "Operations & Logistics",
        img: amarachiImg,
        bio: [
          "Amarachi Emmanuel is a certified business administrator and part of the Operations and Logistics team at DineWithMee. She oversees key areas that keep the business running smoothly, including logistics, sourcing of authentic ingredients, procurement, inventory management, and coordination with chef partners.",
          "She plays a central role in making sure the right ingredients are sourced and delivered on time while maintaining quality and consistency across supply chains. Her work connects the kitchen, suppliers, and operations flow, ensuring everything behind the scenes supports a reliable customer experience. She is focused on building a structured, efficient system to support the growth and expansion of DineWithMee across multiple locations.",
        ],
      },
    ],
  },
  {
    group: "Tech",
    members: [
      {
        name: "Mugisha Narcisse",
        role: "Front-End Developer & UI/UX Designer",
        img: mugishaImg,
        bio: [
          "Mugisha Narcisse is a Front-End Developer and UI/UX Designer at DineWithMee, focused on building clean, intuitive, and responsive user experiences. He works on turning product ideas into simple and engaging interfaces that work smoothly across all devices.",
          "He combines development and design skills to make sure the platform is both functional and visually clear. With experience in modern design tools and front-end frameworks, he pays close attention to usability, consistency, and user flow. His goal is to make sure users can easily navigate the platform and interact with health-focused features without confusion or friction.",
        ],
      },
      {
        name: "Fakorede Olawale",
        role: "Full-Stack Developer",
        img: fakoredeImg,
        bio: [
          "Fakorede Olawale is a Full-Stack Developer and Technical Lead at DineWithMee, working across both web development and system design. He builds and supports scalable applications while also contributing to how the platform integrates different technical components.",
          "He is also involved in guiding technical learning and breaking down complex systems into practical, workable solutions for the team. His strength lies in connecting software logic with real-world applications, especially in building systems that are efficient, reliable, and easy to extend as the product grows.",
        ],
      },
      {
        name: "Daniel Igbinnosa",
        role: "Software Developer (Intern)",
        img: danielImg,
        bio: [
          "Daniel Igbinnosa is a Software Developer Intern at DineWithMee with a growing focus on building practical tech solutions and improving his skills in software development and data analysis.",
          "He contributes to development tasks while learning and strengthening his ability to solve real-world problems through code. He is interested in building useful, user-focused digital products and enjoys working in environments where he can grow technically while contributing to meaningful work. Outside of tech, he brings creativity from his interest in design, sports, and music into how he thinks and builds.",
        ],
      },
    ],
  },
];

// ─── Individual team member card ───────────────────────────────────────────────
function TeamMemberCard({ member }) {
  const [expanded, setExpanded] = useState(false);
  const [firstPara, ...restParas] = member.bio;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100">
        <img
          src={member.img}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-base sm:text-lg font-black text-gray-900 leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-[#1a3d2e] mt-1 mb-3">
          {member.role}
        </p>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {firstPara}
        </p>

        {expanded && restParas.length > 0 && (
          <div className="space-y-3 mt-3" style={{ animation: "teamFadeIn 0.3s ease both" }}>
            {restParas.map((para, i) => (
              <p key={i} className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}

        {restParas.length > 0 && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a3d2e] hover:gap-2.5 transition-all mt-4 self-start"
          >
            {expanded ? "Read less" : "Read more"}
            <svg
              width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Full Team Bios section ────────────────────────────────────────────────────
// Drop this in as a page section (e.g. <section id="team">…</section> in your
// landing page) or render it standalone as its own page.
export default function TeamBios() {
  return (
    <div className="w-full">
      <style>{`
        @keyframes teamFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 px-4">
        <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block">
          Team Bios
        </span>
        <h2
          className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          The people behind DineWithMee
        </h2>
      </div>

      <div className="space-y-12">
        {TEAM_GROUPS.map(group => (
          <div key={group.group}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-1">
              {group.group}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.members.map(member => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}