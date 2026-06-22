import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot, updateDoc, doc, query } from 'firebase/firestore';

export default function AdminDashboard() {
  // Security States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [loginError, setLoginError] = useState('');

    // Database States
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Secure admin password
    const ADMIN_PASSWORD = "MalacanangSSLGAdmin2026"; 

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        setLoginError('');
        } else {
        setLoginError('Invalid Administrator Password. Access Denied.');
        }
    };

    // Live Firebase Syncing
    useEffect(() => {
        if (!isAuthenticated) return;

        const q = query(collection(db, 'complaints'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const dataArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setComplaints(dataArray);
        setLoading(false);
        }, (error) => {
        console.error("Error fetching live complaints: ", error);
        setErrorMessage(error.message);
        setLoading(false);
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    // 🔄 RESTORED: Status Update Cycle Engine
    const handleUpdateStatus = async (id, currentStatus) => {
        const nextStatusMap = {
        'Pending': 'In Progress',
        'In Progress': 'Resolved',
        'Resolved': 'Pending'
        };
        
        const nextStatus = nextStatusMap[currentStatus] || 'Pending';
        const docRef = doc(db, 'complaints', id);
        
        try {
        await updateDoc(docRef, { status: nextStatus });
        } catch (err) {
        console.error("Failed to update status record in Firestore: ", err);
        }
    };

    if (!isAuthenticated) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
            <div className="text-center space-y-2">
                <span className="text-3xl">🛡️</span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">SSLG Command Central</h2>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Restricted Administration Access</p>
            </div>

            {loginError && (
                <div className="mt-6 p-3 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs font-bold text-center">
                {loginError}
                </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Enter Admin Access Key
                </label>
                <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••••••"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm text-center tracking-widest font-mono focus:outline-hidden focus:ring-2 focus:ring-red-800 focus:bg-white transition-all"
                />
                </div>
                <button
                type="submit"
                className="w-full py-3 bg-red-800 hover:bg-red-900 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer"
                >
                Verify Credentials
                </button>
            </form>
            </div>
        </div>
        );
    }

    if (loading) {
        return <div className="text-center p-12 text-slate-500 font-medium">Loading Malacañang SSLG Records Panel...</div>;
    }

    if (errorMessage) {
        return (
        <div className="max-w-2xl mx-auto my-12 p-6 bg-red-50 text-red-800 border border-red-200 rounded-xl">
            <h3 className="font-bold text-lg">Firebase Connection Error</h3>
            <p className="text-sm mt-1">{errorMessage}</p>
        </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <a href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-xs hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 mb-6">
            ← Back to Home
            </a>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-5 mb-6 gap-4">
            <div>
            <h1 className="text-3xl font-extrabold text-red-800 tracking-tight">SSLG Command Central</h1>
            <p className="text-sm text-slate-500 mt-1">Reviewing active student submissions for Malacañang National High School</p>
            </div>
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xs">
            Total Case Records: {complaints.length}
            </div>
        </div>

        {complaints.length === 0 ? (
            <div className="text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl p-16 text-slate-500">
            No complaints have been reported to the system yet.
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="p-5">
                    <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-sm border border-slate-200 uppercase tracking-wider">
                        {item.category}
                    </span>
                    
                    {/* ⚡ RESTORED: Interactive Action Click Button Badge */}
                    <button 
                        onClick={() => handleUpdateStatus(item.id, item.status)}
                        className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-all hover:scale-[1.03] active:scale-95 ${
                        item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        item.status === 'In Progress' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                    >
                        ● {item.status || 'Pending'}
                    </button>
                    </div>

                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm mt-2 line-clamp-4 whitespace-pre-line bg-slate-50 p-3 rounded-lg border border-slate-100">
                    "{item.description}"
                    </p>
                </div>

                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center text-xs font-medium text-slate-500">
                    <span>{item.isAnonymous ? '🕵️ Anonymous Student' : item.name }</span>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
    }