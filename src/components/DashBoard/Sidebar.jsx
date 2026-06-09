/* eslint-disable indent */
import { Link, useLocation } from "react-router";
import {
    LayoutDashboard,
    PlusCircle,
    BookOpen,
    Bookmark,
    Users,
    CreditCard,
    UserCircle,
    Briefcase,
    GraduationCap,
    BarChart3,
    ShieldCheck,
    ListChecks,
    Wallet,
} from "lucide-react";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";
import useStudent from "../../hooks/useStudent";

const NavItem = ({ to, icon: Icon, label, exact = false }) => {
    const location = useLocation();
    const isActive = exact
        ? location.pathname === to
        : location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={`
                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-150
                ${
                    isActive
                        ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }
            `}
        >
            <Icon size={17} className="shrink-0" />
            <span>{label}</span>
        </Link>
    );
};

const SectionLabel = ({ label }) => (
    <p className="px-4 pt-5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600 select-none">
        {label}
    </p>
);

const Sidebar = () => {
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
    const [isStudent] = useStudent();

    return (
        <nav className="p-4 space-y-0.5">
            {isStudent && (
                <>
                    <SectionLabel label="Student" />
                    <NavItem
                        to="/dashboard/student"
                        icon={LayoutDashboard}
                        label="Dashboard"
                        exact
                    />
                    <NavItem
                        to="/dashboard/student/post-tuition"
                        icon={PlusCircle}
                        label="Post Tuition"
                    />
                    <NavItem
                        to="/dashboard/student/my-tuitions"
                        icon={BookOpen}
                        label="My Tuitions"
                    />
                    <NavItem
                        to="/dashboard/student/applied-tutors"
                        icon={Users}
                        label="Applied Tutors"
                    />
                    <NavItem
                        to="/dashboard/student/saved"
                        icon={Bookmark}
                        label="Saved Items"
                    />
                    <NavItem
                        to="/dashboard/student/payments"
                        icon={CreditCard}
                        label="Payments"
                    />
                    <SectionLabel label="Account" />
                    <NavItem
                        to="/dashboard/student/profile"
                        icon={UserCircle}
                        label="Profile Settings"
                    />
                </>
            )}

            {isTutor && (
                <>
                    <SectionLabel label="Tutor" />
                    <NavItem
                        to="/dashboard/tutor"
                        icon={LayoutDashboard}
                        label="Dashboard"
                        exact
                    />
                    <NavItem
                        to="/dashboard/tutor/applications"
                        icon={Briefcase}
                        label="My Applications"
                    />
                    <NavItem
                        to="/dashboard/tutor/ongoing"
                        icon={GraduationCap}
                        label="Ongoing Sessions"
                    />
                    <NavItem
                        to="/dashboard/tutor/revenue"
                        icon={Wallet}
                        label="Revenue"
                    />
                    <SectionLabel label="Account" />
                    <NavItem
                        to="/dashboard/tutor/profile"
                        icon={UserCircle}
                        label="Profile Settings"
                    />
                </>
            )}

            {isAdmin && (
                <>
                    <SectionLabel label="Admin" />
                    <NavItem
                        to="/dashboard/admin"
                        icon={ShieldCheck}
                        label="Dashboard"
                        exact
                    />
                    <NavItem
                        to="/dashboard/admin/users"
                        icon={Users}
                        label="User Management"
                    />
                    <NavItem
                        to="/dashboard/admin/tuitions"
                        icon={ListChecks}
                        label="Tuition Management"
                    />
                    <NavItem
                        to="/dashboard/admin/analytics"
                        icon={BarChart3}
                        label="Analytics"
                    />
                    <SectionLabel label="Account" />
                    <NavItem
                        to="/dashboard/admin/profile"
                        icon={UserCircle}
                        label="Profile Settings"
                    />
                </>
            )}
        </nav>
    );
};

export default Sidebar;
