import { useState, useEffect, Link } from "react";
import { db } from '../../firebase/firebaseConfig'; 
import { collection, query, onSnapshot } from "firebase/firestore";



export default function TransparencyBoard(){
    const [complaints, setComplaints] = useState([]);
    const resolvedCounts = complaints.filter(item => item.status === 'Resolved').length;
    const inProgressCounts = complaints.filter(item => item.status === 'In Progress').length;
    const pendingCounts = complaints.filter(item => item.status === 'Pending').length;
    useEffect(() => {
        const q = query(collection(db, 'complaints'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const dataArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComplaints(dataArray)
        });
        return () => unsubscribe();
    }, [])
    return(
    <div className="max-w-6xl mx-auto px-6 py-12">
        <a href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-xs hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 mb-6">
        ← Back to Home
        </a>
        <div className=""></div>
        <div className="border-b border-slate-200 pb-5 mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            📊 SSLG Public Transparency Board
        </h1>
        <p className="text-sm text-slate-500 mt-1">
            Live tracking of student concerns resolved by the Malacañang National High School SSLG
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pending Card */}
            <div className="bg-white border border-rose-100 p-6 rounded-2xl shadow-xs text-center">
                <span className="text-2xl">📥</span>
                <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider mt-2">Pending Issues</h3>
                <p className="text-4xl font-black text-rose-900 mt-2">
                {pendingCounts}
                </p>
            </div>

            {/* In Progress Card */}
            <div className="bg-white border border-amber-100 p-6 rounded-2xl shadow-xs text-center">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mt-2">In Progress</h3>
                <p className="text-4xl font-black text-amber-900 mt-2">
                {inProgressCounts}
                </p>
            </div>

            {/* Resolved Card */}
            <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-xs text-center">
                <span className="text-2xl">✅</span>
                <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-2">Resolved Cases</h3>
                <p className="text-4xl font-black text-emerald-900 mt-2">
                {resolvedCounts}
                </p>
            </div>
        </div>
    </div>
    )
    
}