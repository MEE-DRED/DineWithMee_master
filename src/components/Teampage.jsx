import { Logo } from "./Branding";

/* ═══════════════════════════════════════════════════════════
   TEAM BIOS PAGE
   Rebuilt from the DineWithMee "Team Bios" Canva doc. The
   source PDF export only carried through the page title
   ("Team Bios") and the contact line below — the member
   photos/names/bios never rendered in that export (they came
   through as blank placeholder blocks). Everything in
   PLACEHOLDER_TEAM is a stand-in with the same shape real data
   will have — swap in actual names, roles, and bios there.
═══════════════════════════════════════════════════════════ */

// Confirmed from the source doc's footer. The email was
// truncated mid-render in the export ("dynwithmee@gmail...") —
// double check the exact spelling before shipping.
const CONTACT = {
  phone: "+250-795-193-979",
  email: "dynwithmee@gmail.com",
};

// Placeholder roster — replace with real team members.
const PLACEHOLDER_TEAM = [
  {
    initials: "A.O.",
    name: "Add Name Here",
    role: "Founder & CEO",
    bio: "A short line on background, expertise, and what they lead at DineWithMee goes here.",
  },
  {
    initials: "C.N.",
    name: "Add Name Here",
    role: "Clinical Nutritionist",
    bio: "Oversees evidence-based nutrition guidance and clinical care pathways for members.",
  },
  {
    initials: "C.D.",
    name: "Add Name Here",
    role: "Culinary Director",
    bio: "Translates Nigerian and Rwandan culinary heritage into practical, healthy meal plans.",
  },
  {
    initials: "P.T.",
    name: "Add Name Here",
    role: "Product & Technology Lead",
    bio: "Builds the digital tools that make preventive nutrition accessible and scalable.",
  },
  {
    initials: "C.H.",
    name: "Add Name Here",
    role: "Community Health Coordinator",
    bio: "Connects the platform with communities, clinics, and partners on the ground.",
  },
  {
    initials: "O.P.",
    name: "Add Name Here",
    role: "Operations & Partnerships",
    bio: "Runs day-to-day operations and grows partnerships across health providers.",
  },
];

const AVATAR_PALETTE = ["#1a3d2e", "#c1440e", "#e8c87d", "#2f6b45", "#8a2e0a", "#123024"];

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a3d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function TeamMemberCard({ member, index }) {
  const color = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
      style={{ animation: "cardIn 0.5s ease both", animationDelay: `${index * 0.08}s` }}
    >
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md border-4 border-white ring-1 ring-gray-100 mb-4"
        style={{ backgroundColor: color, fontFamily: "Georgia, serif" }}
        aria-hidden="true"
      >
        {member.initials}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {member.name}
      </h3>
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1a3d2e] mt-1 mb-3">
        {member.role}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
        {member.bio}
      </p>
    </div>
  );
}

export default function TeamPage({ onBack }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f5f0e8", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes heroIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>

      {/* ─── Header ─── */}
      <header className="w-full border-b border-gray-200 bg-[#f5f0e8]/95 px-6 sm:px-10 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur">
        <button onClick={onBack} className="flex items-center gap-2.5">
          <Logo size={38} />
          <div className="leading-none text-left">
            <p className="text-sm font-extrabold text-[#1a3d2e]">DineWithMee</p>
          </div>
        </button>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[#1a3d2e] hover:text-[#123024] transition-colors"
        >
          <BackArrow />
          <span className="hidden sm:inline">Back to Home</span>
        </button>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <div className="text-center px-4 pt-14 pb-8 sm:pt-20 sm:pb-10" style={{ animation: "heroIn 0.55s ease both" }}>
          <span className="text-xs font-bold tracking-widest text-[#1a3d2e] uppercase bg-[#e8c87d]/40 px-3.5 py-1.5 rounded-full inline-block mb-4">
            The People Behind DineWithMee
          </span>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3"
            style={{ color: "#1a3d2e", fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Team Bios
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            The clinicians, chefs, and builders combining medical science with Nigerian and Rwandan culinary heritage.
          </p>

          {/* Contact row — from the source doc footer */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <PhoneIcon /> {CONTACT.phone}
            </span>
            <span className="flex items-center gap-2">
              <MailIcon /> {CONTACT.email}
            </span>
          </div>
        </div>

        {/* ─── Team Grid ─── */}
        <section className="px-4 sm:px-8 lg:px-16 xl:px-20 pb-16 w-full max-w-6xl mx-auto">
          <div className="bg-white/60 border border-dashed border-[#1a3d2e]/30 rounded-2xl px-5 py-3 mb-8 text-center">
            <p className="text-xs sm:text-sm text-[#1a3d2e]/80 font-semibold">
              Full team bios coming soon — placeholder profiles shown below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PLACEHOLDER_TEAM.map((member, i) => (
              <TeamMemberCard key={member.role} member={member} index={i} />
            ))}
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-200 bg-[#f5f0e8] px-6 sm:px-10 py-5" style={{ animation: "fadeIn 0.6s ease both" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2">
            <Logo size={30} />
            <div className="leading-none text-left">
              <p className="text-xs font-extrabold text-[#1a3d2e]">DineWithMee</p>
            </div>
          </button>
          <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-500">
            {["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Contact Support"].map(link => (
              <button key={link} className="hover:text-gray-800 transition-colors">{link}</button>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
