import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Navigation Bar */}
        <nav className="bg-red-800 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Logo / Title Link */}
            <Link to="/" className="font-bold text-lg tracking-tight hover:opacity-90">
                🏫 Malacañang NHS SSLG Portal
            </Link>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
                {/* 🚀 THIS IS THE FIX: Using <Link to="..."> makes it un-breakable */}
                <Link 
                to="/submit-complaint" 
                className="bg-white text-red-800 px-4 py-2 rounded-lg text-sm font-bold shadow-xs hover:bg-slate-100 transition-all cursor-pointer"
                >
                Submit a Complaint
                </Link>

            </div>

            </div>
        </nav>

        {/* Main Core Content Slot */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-6">
            <Outlet /> 
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
            © 2026 Malacañang National High School SSLG Command Panel
        </footer>
        </div>
    );
    }