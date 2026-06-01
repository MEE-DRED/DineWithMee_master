import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "profile", label: "Profile", icon: ProfileIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security", icon: ShieldIcon },
  { id: "billing", label: "Billing", icon: BillingIcon },
  { id: "connected", label: "Connected Apps", icon: ConnectedIcon },
];

const LOGIN_ACTIVITY = [
  { device: "MacBook Pro 16\"", icon: "laptop", location: "San Francisco, CA", date: "Today, 2:45 PM", status: "current" },
  { device: "iPhone 15 Pro", icon: "phone", location: "San Francisco, CA", date: "Yesterday, 9:12 AM", status: "authorized" },
  { device: "Chrome on Windows", icon: "monitor", location: "New York, NY", date: "Oct 24, 2023", status: "logout" },
];

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function BillingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  );
}
function ConnectedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  );
}
function LaptopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/>
    </svg>
  );
}
function MonitorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  );
}
function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/>
    </svg>
  );
}
function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:ring-offset-2 ${enabled ? "bg-[#2d5a3d]" : "bg-gray-300"}`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

function DeviceIcon({ type }) {
  if (type === "phone") return <PhoneIcon />;
  if (type === "monitor") return <MonitorIcon />;
  return <LaptopIcon />;
}

export default function SecuritySettings() {
  const [activeNav, setActiveNav] = useState("security");
  const [twoFA, setTwoFA] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("............");
  const [newPassword, setNewPassword] = useState("............");
  const [confirmPassword, setConfirmPassword] = useState("............");
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [loggedOut, setLoggedOut] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [signedOutAll, setSignedOutAll] = useState(false);
  const [deletedKeys, setDeletedKeys] = useState(false);

  function handleUpdatePassword(e) {
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
    setPasswordMsg({ type: "success", text: "Password updated successfully!" });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMsg(null), 3500);
  }

  function handleLogoutDevice(idx) {
    setLoggedOut((prev) => ({ ...prev, [idx]: true }));
  }

  function handleSignOutAll() {
    setSignedOutAll(true);
    setTimeout(() => setSignedOutAll(false), 3000);
  }

  function handleDeleteKeys() {
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
          {/* Center nav (desktop) */}
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
            <button className="p-1.5 text-gray-500 hover:text-[#2d5a3d] transition-colors hidden sm:block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#d4a88a] overflow-hidden flex items-center justify-center text-white font-bold text-sm">M</div>
            {/* Mobile menu button */}
            <button className="md:hidden p-1.5 text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:static z-20 top-14 sm:top-16 left-0 h-[calc(100vh-56px)] md:h-auto
            w-64 bg-[#f5f2ed] border-r border-gray-200
            flex flex-col pt-6 pb-4 px-3
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <div className="mb-6 px-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Settings</p>
            <p className="text-xs text-gray-400">Manage your wellness account</p>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                  ${activeNav === id
                    ? "bg-[#2d5a3d] text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-[#2d5a3d] hover:shadow-sm"
                  }`}
              >
                <Icon />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1 border-t border-gray-200 pt-4">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-[#2d5a3d] rounded-lg hover:bg-white transition-all">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
              Help Center
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
              <LogOutIcon />
              Log Out
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Security Settings
            </h1>
            <p className="text-gray-500 text-sm mb-8">Enhance your account's protection and monitor access activity.</p>

            {/* Two-Factor Authentication */}
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
                <Toggle enabled={twoFA} onChange={setTwoFA} />
              </div>
            </section>

            {/* Change Password */}
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
                      onFocus={() => { if (currentPassword === "............") setCurrentPassword(""); }}
                      placeholder="Enter current password"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all pr-10"
                    />
                    <button type="button" tabIndex={-1} onClick={() => setShowCurrentPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showCurrentPw ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPw ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => { if (newPassword === "............") setNewPassword(""); }}
                        placeholder="New password"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all pr-10"
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowNewPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showNewPw ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPw ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => { if (confirmPassword === "............") setConfirmPassword(""); }}
                        placeholder="Confirm password"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#faf9f7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]/30 focus:border-[#2d5a3d] transition-all pr-10"
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowConfirmPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPw ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                      </button>
                    </div>
                  </div>
                </div>

                {passwordMsg && (
                  <div className={`text-sm px-4 py-2.5 rounded-xl font-medium ${passwordMsg.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
                    {passwordMsg.text}
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-[#2d5a3d] hover:bg-[#234830] active:scale-[0.98] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-150 shadow-sm"
                >
                  Update Password
                </button>
              </form>
            </section>

            {/* Recent Login Activity */}
            <section className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Login Activity</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-4 gap-2 px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <span>Device</span>
                  <span>Location</span>
                  <span>Date</span>
                  <span>Status</span>
                </div>

                {LOGIN_ACTIVITY.map((item, idx) => (
                  <div
                    key={idx}
                    className={`px-5 py-4 ${idx < LOGIN_ACTIVITY.length - 1 ? "border-b border-gray-100" : ""} 
                    ${loggedOut[idx] ? "opacity-40" : ""} transition-opacity`}
                  >
                    {/* Mobile layout */}
                    <div className="sm:hidden flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-gray-500"><DeviceIcon type={item.icon} /></span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.device}</p>
                          <p className="text-xs text-gray-400">{item.location} · {item.date}</p>
                        </div>
                      </div>
                      <StatusBadge status={item.status} idx={idx} loggedOut={loggedOut} onLogout={handleLogoutDevice} />
                    </div>
                    {/* Desktop layout */}
                    <div className="hidden sm:grid grid-cols-4 gap-2 items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-gray-500"><DeviceIcon type={item.icon} /></span>
                        <span className="text-sm font-medium text-gray-800">{item.device}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.location}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <StatusBadge status={item.status} idx={idx} loggedOut={loggedOut} onLogout={handleLogoutDevice} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Security Actions */}
            <section className="bg-[#fff8f5] border border-[#f3d5c0] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5 text-[#c9763a]">
                <WarningIcon />
                <h2 className="text-base font-semibold">Security Actions</h2>
              </div>
              <p className="text-sm text-gray-500 mb-5">Perform sensitive actions to protect your account. These actions might require re-authentication.</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSignOutAll}
                  className={`px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium transition-all duration-150
                    ${signedOutAll ? "bg-green-50 border-green-300 text-green-700" : "bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]"}`}
                >
                  {signedOutAll ? "✓ Signed out successfully" : "Sign out of all other sessions"}
                </button>
                <button
                  onClick={handleDeleteKeys}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.98]
                    ${deletedKeys ? "bg-green-50 text-green-700 border border-green-300" : "text-red-500 border border-red-200 bg-red-50 hover:bg-red-100"}`}
                >
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

function StatusBadge({ status, idx, loggedOut, onLogout }) {
  if (loggedOut[idx]) {
    return <span className="text-xs font-medium text-gray-400">Logged out</span>;
  }
  if (status === "current") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium whitespace-nowrap">
        Current Session
      </span>
    );
  }
  if (status === "authorized") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium">
        Authorized
      </span>
    );
  }
  return (
    <button
      onClick={() => onLogout(idx)}
      className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors whitespace-nowrap"
    >
      Logout Device
    </button>
  );
}
