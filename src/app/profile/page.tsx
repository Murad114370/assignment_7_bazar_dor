"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import Image from "next/image";
import logo from '../../../assets/my-logo.png';

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter(); // 2. Initialize router

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Set initial name once user data is loaded
    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    // Handle Sign Out function
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    // Handle Profile Update & Redirect
    const handleUpdateName = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const { data, error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                setMessage("নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
            } else {
                setMessage("ਸফলভাবে নাম আপডেট হয়েছে! রিডাইরেক্ট হচ্ছে...");
                
                // 3. Redirect to homepage ("/") after a brief success message
                setTimeout(() => {
                    router.push("/");
                    router.refresh(); // Refreshes server components/navbar data
                }, 1000); // 1-second delay so they can see the success message
            }
        } catch (err) {
            setMessage("একটি ত্রুটি ঘটেছে।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200/50 p-6 sm:p-10">
            <div className="max-w-2xl mx-auto space-y-6">
                
                {/* Header Title */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* Top Card: User Info & Sign Out */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-base-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring-2 ring-offset-2">
                                <Image
                                    src={user?.image || logo}
                                    alt="Profile Logo"
                                    width={56}
                                    height={56}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-gray-800">{user?.name || "লোড হচ্ছে..."}</h2>
                            <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSignOut}
                        className="btn btn-outline btn-error btn-sm flex items-center gap-1 text-red-500 hover:text-white"
                    >
                        ↩ সাইন আউট
                    </button>
                </div>

                {/* Bottom Card: Update Name Form */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-base-200">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">তথ্য</h3>
                    
                    <form onSubmit={handleUpdateName} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                নাম
                            </label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-green-600"
                                required
                            />
                        </div>

                        {message && (
                            <p className={`text-sm ${message.includes("সমস্যা") ? "text-red-500" : "text-green-600"}`}>
                                {message}
                            </p>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="btn bg-green-700 hover:bg-green-800 text-white w-full border-none shadow-md"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;