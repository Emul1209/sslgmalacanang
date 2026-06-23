import { useState } from 'react';
import { db } from '../../firebase/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore'; 

export default function SubmitComplaint() {
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        description: '',
        isAnonymous: false,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [studentName, setStudentName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        setFormData((prev) => ({ ...prev, isAnonymous: e.target.checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); 
        const finalName = formData.isAnonymous ? "Anonymous" : studentName;

        if (!formData.category) {
            setLoading(false);
            return setError('Please select a complaint category.');
        }
        if (!formData.title.trim()) {
            setLoading(false);
            return setError('Please provide a short title.');
        }
        if (!formData.description.trim()) {
            setLoading(false);
            return setError('Please describe your concern.');
        }
        if (!formData.isAnonymous && !studentName.trim()) {
            setLoading(false);
            setStudentName("");
            return setError("Please enter your name!")
            
        }
        

        try {
            await addDoc(collection(db, 'complaints'), {
                name: finalName,
                category: formData.category,
                title: formData.title,
                description: formData.description,
                isAnonymous: formData.isAnonymous,
                status: 'Pending', 
                createdAt: new Date().toISOString(), 
            });

            setSuccess(true);
        } catch (err) {
            console.error("Error writing document to Firebase: ", err);
            setError(`Submission failed: ${err.message || 'Please check your connection.'}`);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-xs text-center border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-700">Complaint Logged Securely</h3>
                <p className="text-slate-600 mt-2">The Malacañang NHS SSLG administration has successfully received your report.</p>
                <button 
                    type="button"
                    className="mt-6 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 cursor-pointer" 
                    onClick={() => { setSuccess(false); setFormData({ category: '', title: '', description: '', isAnonymous: false }); setStudentName('') }}
                    
                >
                    Submit Another Concern
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xs border border-slate-200">
            <a href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl shadow-xs hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 mb-6">
            ← Back to Home
            </a>
            <h2 className="text-2xl font-bold text-red-800">File a Secure Complaint</h2>
            <p className="text-sm text-slate-500 mt-1">Fill out the information below to report school or academic concerns.</p>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                    <select
                        name="category"
                        disabled={loading}
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm focus:outline-hidden"
                    >
                        <option value="">-- Select Category --</option>
                        <option value="Bullying">Bullying / Cyberbullying</option>
                        <option value="Academic">Academic Misconduct</option>
                        <option value="Property">Property Damage</option>
                        <option value="Other">Other Issues</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        disabled={loading}
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Summarize the issue..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm focus:outline-hidden"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Details</label>
                    <textarea
                        name="description"
                        rows="4"
                        disabled={loading}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Provide context or description safely..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm focus:outline-hidden"
                    ></textarea>
                </div>

                {!formData.isAnonymous && (
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-slate-700">Your Name</label>
                        <input 
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        value={studentName}
                        onChange = {(e) => setStudentName(e.target.value)}
                        />
                    </div>
                    )}

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isAnonymous"
                        disabled={loading}
                        checked={formData.isAnonymous}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 border-slate-300 rounded-xs"
                    />
                    <label htmlFor="isAnonymous" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                        Submit anonymously
                    </label>
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-red-800 hover:bg-red-900 text-white font-bold rounded-lg transition-colors disabled:opacity-50 cursor-pointer" 
                    disabled={loading}
                >
                    {loading ? 'Transmitting Data securely...' : 'Submit Report'}
                </button>
            </form>
        </div>
    );
}