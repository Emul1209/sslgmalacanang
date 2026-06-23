import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto text-center py-12 px-4">
        {/* Hero Header */}
        <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200/60 uppercase tracking-wider">
            ⚡ SSLG Active Student Support
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
            Malacañang National High School <br />
            <span className="text-red-800 bg-linear-to-r from-red-800 to-rose-600 bg-clip-text text-transparent">
                Student Complaint Portal
            </span>
            </h1>
            <p className="max-w-xl mx-auto text-base text-slate-500 font-medium">
            A secure, end-to-end platform for learners to report school issues, safety concerns, or academic grievances directly to the SSLG administration.
            </p>
        </div>

        {/* Action Selection Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            
            {/* Card 1: File Report */}
            <Link 
            to="/submit-complaint" 
            className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
            >
            <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-800 flex items-center justify-center text-xl font-bold group-hover:bg-red-800 group-hover:text-white transition-colors duration-300">
                ✍️
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-red-800 transition-colors">
                File a Student Report
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Submit an issue safely. Options available to keep your identity completely anonymous.
                </p>
            </div>
            <span className="text-xs font-bold text-red-800 mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Get Started →
            </span>
            </Link>


            <Link 
            to="/transparency" 
            className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
            >
            <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-blue-700 flex items-center justify-center text-xl font-bold group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                🪟
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-blue-800 transition-colors">
                SSLG Transparency Board
                </h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Transparency board where you can see the issues states.
                </p>
            </div>
            <span className="text-xs font-bold text-slate-700 mt-6 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Access Board →
            </span>
            </Link>

        </div>
        </div>
    );
    }