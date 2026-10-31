"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import logo from '../../assets/my-logo.png';
import Link from 'next/link';
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    // Handle Sign Out function using better-auth client
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সফলভাবে সাইন আউট করা হয়েছে!", {
                        position: "top-center" // 👈 Centers the success toast
                    });
                    
                    // Give a tiny delay so the toast is visible before reloading/redirecting
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                },
                onError: (error) => {
                    toast.error(error.error.message || "সাইন আউট করতে সমস্যা হয়েছে!", {
                        position: "top-center" // 👈 Centers the error toast if it fails
                    });
                },
            },
        });
    };

    return (
        <div>
            {user ? (
                /* DaisyUI Dropdown Container */
                <div className="dropdown dropdown-end">
                    
                    {/* Trigger Button (Avatar + Name + Arrow) */}
                    <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer m-1">
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <Image
                                    src={user.image || logo}
                                    alt="Profile Logo"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                        <span className="font-medium text-sm hidden sm:inline">{user.name || "User"}</span>
                        <svg className="w-4 h-4 fill-current opacity-70" viewBox="0 0 24 24">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                    </div>

                    {/* Dropdown Menu Content */}
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-200 mt-2">
                        
                        {/* User Info Header Inside Dropdown */}
                        <div className="px-3 py-2 border-b border-base-200 mb-2">
                            <p className="font-bold text-base text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>

                        {/* Profile Link */}
                        <li>
                            <Link href="/profile" className="flex items-center gap-2 py-2 text-sm text-gray-700 hover:bg-base-200 rounded-lg">
                                <span>👤</span> আমার প্রোফাইল
                            </Link>
                        </li>

                        {/* Sign Out Button */}
                        <li>
                            <button 
                                onClick={handleSignOut} 
                                className="flex items-center gap-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg w-full text-left"
                            >
                                <span>↩</span> সাইন আউট
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                /* Sign In / Sign Up buttons when user is logged out */
                <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
                    <Link href={'/signin'}><button className="btn btn-sm text-xs sm:btn-md sm:text-sm lg:text-base font-medium">
                        সাইন ইন
                    </button></Link>

                    <Link href={'/signup'}><button className="btn btn-sm sm:btn-md rounded-lg bg-green-700 hover:bg-green-800 border-none px-3 sm:px-4 text-xs sm:text-sm lg:text-base text-white shadow-[0_8px_12px_-3px_rgba(0,0,0,0.2)] shadow-green-400/50 transition-transform hover:scale-[1.02]">
                        সাইন আপ
                    </button></Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;