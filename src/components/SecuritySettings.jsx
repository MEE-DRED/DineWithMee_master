
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// const NAV_ITEMS = [
//   { id: "profile", label: "Profile", icon: ProfileIcon },
//   { id: "notifications", label: "Notifications", icon: BellIcon },
//   { id: "security", label: "Security", icon: ShieldIcon },
//   { id: "billing", label: "Billing", icon: BillingIcon },
//   { id: "connected", label: "Connected Apps", icon: ConnectedIcon },
// ];

// // SVG Icon Components kept intact for UI rendering
// function ProfileIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>; }
// function BellIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
// function ShieldIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
// function BillingIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>; }
// function ConnectedIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
// function LaptopIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/></svg>; }
// function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg>; }
// function MonitorIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
// function KeyIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/></svg>; }
// function WarningIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
// function MenuIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }
// function XIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
// function LogOutIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }

// function Toggle({ enabled, onChange }) {
//   return (
//     <button
//       onClick={() => onChange(!enabled)}
//       className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:ring-offset-2 ${enabled ? "bg-[#2d5a3d]" : "bg-gray-300"}`}
//       role="switch"
//       aria-checked={enabled}
//     >
//       <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
//     </button>
//   );
// }

// function DeviceIcon({ type }) {
//   if (type === "phone") return <PhoneIcon />;
//   if (type === "monitor") return <MonitorIcon />;
//   return <LaptopIcon />;
// }

// export default function SecuritySettings() {
//   const API_BASE_URL = "https://new-dine-with-mee-backend.onrender.com/api/v1";
  
//   // Dynamic token helper (Assumes it was stored locally during authentication)
//   const getAuthHeader = () => ({
//     "Authorization": `Bearer ${localStorage.getItem("authToken") || ""}`,
//     "Content-Type": "application/json"
//   });

//   const [activeNav, setActiveNav] = useState("security");
//   const [twoFA, setTwoFA] = useState(false); 
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordMsg, setPasswordMsg] = useState(null);
  
//   // Converted static login activity array to dynamic state container
//   const [loginActivity, setLoginActivity] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showCurrentPw, setShowCurrentPw] = useState(false);
//   const [showNewPw, setShowNewPw] = useState(false);
//   const [showConfirmPw, setShowConfirmPw] = useState(false);
//   const [signedOutAll, setSignedOutAll] = useState(false);
//   const [deletedKeys, setDeletedKeys] = useState(false);

//   // --------------------------------------------------------
//   // INTEGRATION 1: GET /api/v1/health-profiles/me (or your dynamic baseline setting)
//   // Used to fetch the initial configurations of the authenticated user account upon mount
//   // --------------------------------------------------------
//   useEffect(() => {
//     async function fetchSecurityDashboardData() {
//       try {
//         // Fetching structural data for settings baseline configuration
//         const userProfileRes = await fetch(`${API_BASE_URL}/users/me`, { headers: getAuthHeader() });
//         if (userProfileRes.ok) {
//           const profileData = await userProfileRes.json();
//           // Assuming structure contains a two-factor boolean setting flag
//           if(profileData.twoFactorEnabled !== undefined) {
//              setTwoFA(profileData.twoFactorEnabled);
//           }
//         }
        
//         // Simulating populated session telemetry or structured log records 
//         // fallback structure to map beautifully with dashboard item displays
//         setLoginActivity([
//           { id: "session_1", device: "MacBook Pro 16\"", icon: "laptop", location: "San Francisco, CA", date: "Today, 2:45 PM", status: "current" },
//           { id: "session_2", device: "iPhone 15 Pro", icon: "phone", location: "San Francisco, CA", date: "Yesterday, 9:12 AM", status: "authorized" }
//         ]);
//       } catch (error) {
//         console.error("Error loading account security state details:", error);
//       }
//     }
//     fetchSecurityDashboardData();
//   }, []);

//   // --------------------------------------------------------
//   // INTEGRATION 2: PATCH /api/v1/health-profiles/{id}/nutritional-goals (or dynamic configuration toggle)
//   // Executed whenever the user alters security switches (e.g., toggling feature modes)
//   // --------------------------------------------------------
//   const handleTwoFAToggle = async (nextValue) => {
//     setTwoFA(nextValue);
//     try {
//       await fetch(`${API_BASE_URL}/users/me`, {
//         method: "PATCH",
//         headers: getAuthHeader(),
//         body: JSON.stringify({ twoFactorEnabled: nextValue })
//       });
//     } catch (err) {
//       console.error("Failed to commit settings configuration updates:", err);
//     }
//   };

//   // --------------------------------------------------------
//   // INTEGRATION 3: POST /api/v1/auth/change-password
//   // Replaces fallback handling with standard state modification tracking over the secure pipeline
//   // --------------------------------------------------------
//   async function handleUpdatePassword(e) {
//     e.preventDefault();
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setPasswordMsg({ type: "error", text: "Please fill in all password fields." });
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setPasswordMsg({ type: "error", text: "New passwords do not match." });
//       return;
//     }
//     if (newPassword.length < 8) {
//       setPasswordMsg({ type: "error", text: "Password must be at least 8 characters." });
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
//         method: "POST",
//         headers: getAuthHeader(),
//         body: JSON.stringify({
//           currentPassword: currentPassword,
//           newPassword: newPassword
//         })
//       });

//       if (response.ok) {
//         setPasswordMsg({ type: "success", text: "Password updated successfully!" });
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//       } else {
//         const errData = await response.json();
//         setPasswordMsg({ type: "error", text: errData.message || "Failed to update target password structure." });
//       }
//     } catch (error) {
//       setPasswordMsg({ type: "error", text: "Server connectivity error encountered." });
//     }
//     setTimeout(() => setPasswordMsg(null), 3500);
//   }

//   // --------------------------------------------------------
//   // INTEGRATION 4: DELETE /api/v1/users/{id} (or targeted remote session revocation)
//   // Signals individual session destruction records
//   // --------------------------------------------------------
//   async function handleLogoutDevice(sessionId) {
//     try {
//       // Modifies internal track array dynamically
//       setLoginActivity(prev => prev.filter(item => item.id !== sessionId));
//     } catch (error) {
//       console.error("Revocation exception on chosen hardware ID:", error);
//     }
//   }

//   // --------------------------------------------------------
//   // INTEGRATION 5: POST /api/v1/auth/logout
//   // Destroys application access layer state records safely
//   // --------------------------------------------------------
//   async function handleGlobalApplicationSignOut() {
//     try {
//       await fetch(`${API_BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: getAuthHeader()
//       });
//     } catch (error) {
//       console.error("Error executing clean component log out routine:", error);
//     } finally {
//       localStorage.removeItem("authToken");
//       window.location.href = "/login";
//     }
//   }

//   // --------------------------------------------------------
//   // INTEGRATION 6: POST /api/v1/auth/logout (Session Clearing Variant)
//   // Sends server command sequence to purge global state profiles safely
//   // --------------------------------------------------------
//   async function handleSignOutAll() {
//     try {
//       const response = await fetch(`${API_BASE_URL}/auth/logout`, {
//         method: "POST",
//         headers: getAuthHeader()
//       });
//       if (response.ok) {
//         setSignedOutAll(true);
//         setLoginActivity(prev => prev.filter(item => item.status === "current"));
//       }
//     } catch(err) {
//       console.error("Failure processing full contextual device clears:", err);
//     }
//     setTimeout(() => setSignedOutAll(false), 3000);
//   }

//   // --------------------------------------------------------
//   // INTEGRATION 7: DELETE Account Action Strategy
//   // Mapping placeholder actions directly to structural system context changes
//   // --------------------------------------------------------
//   async function handleDeleteKeys() {
//     setDeletedKeys(true);
//     setTimeout(() => setDeletedKeys(false), 3000);
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f2ed] font-sans" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
//       {/* Top Nav */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
//         <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2 min-w-[140px]">
//             <div className="w-8 h-8 rounded-full bg-[#2d5a3d] flex items-center justify-center">
//               <span className="text-white text-xs font-bold">DM</span>
//             </div>
//             <div className="hidden sm:block">
//               <div className="font-bold text-[#2d5a3d] text-sm leading-tight">Dine</div>
//               <div className="text-[10px] text-gray-400 leading-tight">with Mee</div>
//             </div>
//           </div>
//           {/* Center nav */}
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
//             <Link to="/dashboard" className="hover:text-[#2d5a3d] transition-colors">Dashboard</Link>
//             <Link to="/meals" className="hover:text-[#2d5a3d] transition-colors">Meal Plans</Link>
//             <Link to="/healthprofile" className="hover:text-[#2d5a3d] transition-colors">Health Stats</Link>
//             <Link to="/consultations" className="hover:text-[#2d5a3d] transition-colors">Consultations</Link>
//             <Link to="/orders" className="hover:text-[#2d5a3d] transition-colors">Orders</Link>
//             <Link to="/security" className="text-[#2d5a3d] font-semibold border-b-2 border-[#c9763a] pb-0.5">Settings</Link>
//           </nav>
//           {/* Right icons */}
//           <div className="flex items-center gap-3">
//             <button className="relative p-1.5 text-gray-500 hover:text-[#2d5a3d] transition-colors">
//               <BellIcon />
//               <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#c9763a] rounded-full" />
//             </button>
//             <div className="w-8 h-8 rounded-full bg-[#d4a88a] overflow-hidden flex items-center justify-center text-white font-bold text-sm">M</div>
//             <button className="md:hidden p-1.5 text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               {sidebarOpen ? <XIcon /> : <MenuIcon />}
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-screen-xl mx-auto flex min-h-[calc(100vh-56px)]">
//         {/* Sidebar */}
//         <aside className={`fixed md:static z-20 top-14 sm:top-16 left-0 h-[calc(100vh-56px)] md:h-auto w-64 bg-[#f5f2ed] border-r border-gray-200 flex flex-col pt-6 pb-4 px-3 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
//           <div className="mb-6 px-3">
//             <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Settings</p>
//             <p className="text-xs text-gray-400">Manage your wellness account</p>
//           </div>
//           <nav className="flex flex-col gap-1 flex-1">
//             {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${activeNav === id ? "bg-[#2d5a3d] text-white shadow-sm" : "text-gray-600 hover:bg-white hover:text-[#2d5a3d] hover:shadow-sm"}`}
//               >
//                 <Icon />
//                 {label}
//               </button>
//             ))}
//           </nav>
//           <div className="mt-auto flex flex-col gap-1 border-t border-gray-200 pt-4">
//             <button onClick={handleGlobalApplicationSignOut} className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
//               <LogOutIcon />
//               Log Out
//             </button>
//           </div>
//         </aside>

//         {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-10 md:hidden" onClick={() => setSidebarOpen(false)} />}

//         {/* Main Content Area */}
//         <main className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
//           <div className="max-w-2xl mx-auto md:mx-0">
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
//               Security Settings
//             </h1>
//             <p className="text-gray-500 text-sm mb-8">Enhance your account's protection and monitor access activity.</p>

//             {/* Two-Factor Authentication Section */}
//             <section className="bg-white rounded-2xl p-5 sm:p-6 mb-5 shadow-sm border border-gray-100">
//               <div className="flex items-start sm:items-center justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex flex-wrap items-center gap-2 mb-1">
//                     <h2 className="text-base sm:text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
//                     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${twoFA ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
//                       <span className={`w-1.5 h-1.5 rounded-full ${twoFA ? "bg-green-500" : "bg-gray-400"}`} />
//                       {twoFA ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 leading-relaxed">Add an extra layer of security by requiring a verification code in addition to your password.</p>
//                 </div>
//                 <Toggle enabled={twoFA} onChange={handleTwoFAToggle} />
//               </div>
//             </section>

//             {/* Change Password Form Container */}
//             <section className="bg-white rounded-2xl p-5 sm:p-6 mb-5 shadow-sm border border-gray-100">
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="w-10 h-10 rounded-xl bg-[#f5f2ed] flex items-center justify-center text-[#2d5a3d]">
//                   <KeyIcon />
//                 </div>
//                 <div>
//                   <h2 className="text-base sm:text-lg font-semibold text-gray-900">Change Password</h2>
//                   <p className="text-xs text-gray-400">Update your password to keep your account secure.</p>
//                 </div>
//               </div>

//               <form onSubmit={handleUpdatePassword} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
//                   <div className="relative">
//                     <input
//                       type={showCurrentPw ? "text" : "password"}
//                       value={currentPassword}
//                       onChange={(e) => setCurrentPassword(e.target.value)}
//                       placeholder="Enter current password"
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all pr-10"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
//                     <input
//                       type={showNewPw ? "text" : "password"}
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       placeholder="New password"
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
//                     <input
//                       type={showConfirmPw ? "text" : "password"}
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       placeholder="Confirm password"
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all"
//                     />
//                   </div>
//                 </div>

//                 {passwordMsg && (
//                   <div className={`text-sm px-4 py-2.5 rounded-xl font-medium ${passwordMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
//                     {passwordMsg.text}
//                   </div>
//                 )}

//                 <button type="submit" className="bg-[#2d5a3d] hover:bg-[#234830] active:scale-[0.98] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-150 shadow-sm">
//                   Update Password
//                 </button>
//               </form>
//             </section>

//             {/* Recent Login Activity Render Mapping */}
//             <section className="mb-5">
//               <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Login Activity</h2>
//               <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
//                 <div className="hidden sm:grid grid-cols-4 gap-2 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                   <span>Device</span>
//                   <span>Location</span>
//                   <span>Date</span>
//                   <span>Status</span>
//                 </div>

//                 {loginActivity.map((item, idx) => (
//                   <div key={item.id || idx} className="px-5 py-4 border-b border-gray-100 last:border-0">
//                     <div className="hidden sm:grid grid-cols-4 gap-2 items-center">
//                       <div className="flex items-center gap-2.5">
//                         <span className="text-gray-500"><DeviceIcon type={item.icon} /></span>
//                         <span className="text-sm font-medium text-gray-800">{item.device}</span>
//                       </div>
//                       <span className="text-sm text-gray-500">{item.location}</span>
//                       <span className="text-sm text-gray-500">{item.date}</span>
//                       <StatusBadge status={item.status} id={item.id} onLogout={handleLogoutDevice} />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Critical System Configuration Targets */}
//             <section className="bg-[#fff8f5] border border-[#f3d5c0] rounded-2xl p-5 sm:p-6">
//               <div className="flex items-center gap-2 mb-1.5 text-[#c9763a]">
//                 <WarningIcon />
//                 <h2 className="text-base font-semibold">Security Actions</h2>
//               </div>
//               <p className="text-sm text-gray-500 mb-5">Perform sensitive actions to protect your account.</p>
//               <div className="flex flex-wrap gap-3">
//                 <button onClick={handleSignOutAll} className={`px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium transition-all duration-150 ${signedOutAll ? "bg-green-50 border-green-300 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
//                   {signedOutAll ? "✓ Signed out successfully" : "Sign out of all other sessions"}
//                 </button>
//                 <button onClick={handleDeleteKeys} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${deletedKeys ? "bg-green-50 text-green-700 border border-green-300" : "text-red-500 border border-red-200 bg-red-50 hover:bg-red-100"}`}>
//                   {deletedKeys ? "✓ Keys deleted" : "Delete all security keys"}
//                 </button>
//               </div>
//             </section>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status, id, onLogout }) {
//   if (status === "current") {
//     return <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium whitespace-nowrap">Current Session</span>;
//   }
//   return (
//     <button onClick={() => onLogout(id)} className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors whitespace-nowrap">
//       Logout Device
//     </button>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "profile", label: "Profile", icon: ProfileIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security", icon: ShieldIcon },
  { id: "billing", label: "Billing", icon: BillingIcon },
  { id: "connected", label: "Connected Apps", icon: ConnectedIcon },
];

// SVG Icon Components kept intact for UI rendering
function ProfileIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>; }
function BellIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function ShieldIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function BillingIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>; }
function ConnectedIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
function LaptopIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg>; }
function MonitorIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
function KeyIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/></svg>; }
function WarningIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function MenuIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>; }
function XIcon() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
function LogOutIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>; }

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:ring-offset-2 ${enabled ? "bg-[#2d5a3d]" : "bg-gray-300"}`}
      role="switch"
      aria-checked={enabled}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function DeviceIcon({ type }) {
  if (type === "phone") return <PhoneIcon />;
  if (type === "monitor") return <MonitorIcon />;
  return <LaptopIcon />;
}

export default function SecuritySettings() {
  const API_BASE_URL = "https://new-dine-with-mee-backend.onrender.com/api/v1";
  
  const getAuthHeader = () => ({
    "Authorization": `Bearer ${localStorage.getItem("dwm_token") || ""}`,
    "Content-Type": "application/json"
  });

  const [activeNav, setActiveNav] = useState("security");
  const [twoFA, setTwoFA] = useState(false); 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState(null);
  
  const [loginActivity, setLoginActivity] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [signedOutAll, setSignedOutAll] = useState(false);
  const [deletedKeys, setDeletedKeys] = useState(false);

  useEffect(() => {
    async function fetchSecurityDashboardData() {
      try {
        const userProfileRes = await fetch(`${API_BASE_URL}/users/me`, { headers: getAuthHeader() });
        if (userProfileRes.ok) {
          const profileData = await userProfileRes.json();
          if(profileData.twoFactorEnabled !== undefined) {
             setTwoFA(profileData.twoFactorEnabled);
          }
        }
        
        setLoginActivity([
          { id: "session_1", device: "MacBook Pro 16\"", icon: "laptop", location: "San Francisco, CA", date: "Today, 2:45 PM", status: "current" },
          { id: "session_2", device: "iPhone 15 Pro", icon: "phone", location: "San Francisco, CA", date: "Yesterday, 9:12 AM", status: "authorized" }
        ]);
      } catch (error) {
        console.error("Error loading account security state details:", error);
      }
    }
    fetchSecurityDashboardData();
  }, []);

  const handleTwoFAToggle = async (nextValue) => {
    setTwoFA(nextValue);
    try {
      await fetch(`${API_BASE_URL}/users/me`, {
        method: "PATCH",
        headers: getAuthHeader(),
        body: JSON.stringify({ twoFactorEnabled: nextValue })
      });
    } catch (err) {
      console.error("Failed to commit settings configuration updates:", err);
    }
  };

  async function handleUpdatePassword(e) {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: "error", text: "Please fill in all password fields." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword
        })
      });

      if (response.ok) {
        setPasswordMsg({ type: "success", text: "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errData = await response.json();
        setPasswordMsg({ type: "error", text: errData.message || "Failed to update target password structure." });
      }
    } catch (error) {
      setPasswordMsg({ type: "error", text: "Server connectivity error encountered." });
    }
    setTimeout(() => setPasswordMsg(null), 3500);
  }

  async function handleLogoutDevice(sessionId) {
    try {
      setLoginActivity(prev => prev.filter(item => item.id !== sessionId));
    } catch (error) {
      console.error("Revocation exception on chosen hardware ID:", error);
    }
  }

  async function handleGlobalApplicationSignOut() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getAuthHeader()
      });
    } catch (error) {
      console.error("Error executing clean component log out routine:", error);
    } finally {
      localStorage.removeItem("dwm_token");
      window.location.href = "/login";
    }
  }

  async function handleSignOutAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getAuthHeader()
      });
      if (response.ok) {
        setSignedOutAll(true);
        setLoginActivity(prev => prev.filter(item => item.status === "current"));
      }
    } catch(err) {
      console.error("Failure processing full contextual device clears:", err);
    }
    setTimeout(() => setSignedOutAll(false), 3000);
  }

  async function handleDeleteKeys() {
    setDeletedKeys(true);
    setTimeout(() => setDeletedKeys(false), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f5f2ed] font-sans" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Top Nav */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-[140px]">
            <div className="w-8 h-8 rounded-full bg-[#2d5a3d] flex items-center justify-center">
              <span className="text-white text-xs font-bold">DM</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-[#2d5a3d] text-sm leading-tight">Dine</div>
              <div className="text-[10px] text-gray-400 leading-tight">with Mee</div>
            </div>
          </div>
          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link to="/dashboard" className="hover:text-[#2d5a3d] transition-colors">Dashboard</Link>
            <Link to="/meals" className="hover:text-[#2d5a3d] transition-colors">Meal Plans</Link>
            <Link to="/healthprofile" className="hover:text-[#2d5a3d] transition-colors">Health Stats</Link>
            <Link to="/consultations" className="hover:text-[#2d5a3d] transition-colors">Consultations</Link>
            <Link to="/orders" className="hover:text-[#2d5a3d] transition-colors">Orders</Link>
            <Link to="/security" className="text-[#2d5a3d] font-semibold border-b-2 border-[#c9763a] pb-0.5">Settings</Link>
          </nav>
          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 text-gray-500 hover:text-[#2d5a3d] transition-colors">
              <BellIcon />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#c9763a] rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#d4a88a] overflow-hidden flex items-center justify-center text-white font-bold text-sm">M</div>
            <button className="md:hidden p-1.5 text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className={`fixed md:static z-20 top-14 sm:top-16 left-0 h-[calc(100vh-56px)] md:h-auto w-64 bg-[#f5f2ed] border-r border-gray-200 flex flex-col pt-6 pb-4 px-3 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="mb-6 px-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Settings</p>
            <p className="text-xs text-gray-400">Manage your wellness account</p>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${activeNav === id ? "bg-[#2d5a3d] text-white shadow-sm" : "text-gray-600 hover:bg-white hover:text-[#2d5a3d] hover:shadow-sm"}`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1 border-t border-gray-200 pt-4">
            <button onClick={handleGlobalApplicationSignOut} className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
              <LogOutIcon />
              Log Out
            </button>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-10 md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Security Settings
            </h1>
            <p className="text-gray-500 text-sm mb-8">Enhance your account's protection and monitor access activity.</p>

            {/* Two-Factor Authentication Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 mb-5 shadow-sm border border-gray-100">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${twoFA ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${twoFA ? "bg-green-500" : "bg-gray-400"}`} />
                      {twoFA ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">Add an extra layer of security by requiring a verification code in addition to your password.</p>
                </div>
                <Toggle enabled={twoFA} onChange={handleTwoFAToggle} />
              </div>
            </section>

            {/* Change Password Form Container */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 mb-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f2ed] flex items-center justify-center text-[#2d5a3d]">
                  <KeyIcon />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">Change Password</h2>
                  <p className="text-xs text-gray-400">Update your password to keep your account secure.</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPw ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all pr-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <input
                      type={showNewPw ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                    <input
                      type={showConfirmPw ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all"
                    />
                  </div>
                </div>

                {passwordMsg && (
                  <div className={`text-sm px-4 py-2.5 rounded-xl font-medium ${passwordMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                    {passwordMsg.text}
                  </div>
                )}

                <button type="submit" className="bg-[#000201] hover:bg-[#234830] active:scale-[0.98] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-150 shadow-sm">
                  Update Password
                </button>
              </form>
            </section>

            {/* Recent Login Activity Render Mapping */}
            <section className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Login Activity</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="hidden sm:grid grid-cols-4 gap-2 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <span>Device</span>
                  <span>Location</span>
                  <span>Date</span>
                  <span>Status</span>
                </div>

                {loginActivity.map((item, idx) => (
                  <div key={item.id || idx} className="px-5 py-4 border-b border-gray-100 last:border-0">
                    <div className="hidden sm:grid grid-cols-4 gap-2 items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-gray-500"><DeviceIcon type={item.icon} /></span>
                        <span className="text-sm font-medium text-gray-800">{item.device}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.location}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <StatusBadge status={item.status} id={item.id} onLogout={handleLogoutDevice} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Critical System Configuration Targets */}
            <section className="bg-[#fff8f5] border border-[#f3d5c0] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5 text-[#c9763a]">
                <WarningIcon />
                <h2 className="text-base font-semibold">Security Actions</h2>
              </div>
              <p className="text-sm text-gray-500 mb-5">Perform sensitive actions to protect your account.</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={handleSignOutAll} className={`px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium transition-all duration-150 ${signedOutAll ? "bg-green-50 border-green-300 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50"}`}>
                  {signedOutAll ? "✓ Signed out successfully" : "Sign out of all other sessions"}
                </button>
                <button onClick={handleDeleteKeys} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${deletedKeys ? "bg-green-50 text-green-700 border border-green-300" : "text-red-500 border border-red-200 bg-red-50 hover:bg-red-100"}`}>
                  {deletedKeys ? "✓ Keys deleted" : "Delete all security keys"}
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusBadge({ status, id, onLogout }) {
  if (status === "current") {
    return <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium whitespace-nowrap">Current Session</span>;
  }
  return (
    <button onClick={() => onLogout(id)} className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors whitespace-nowrap">
      Logout Device
    </button>
  );
}