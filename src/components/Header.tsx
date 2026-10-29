import Image from "next/image";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className=" mt-4 px-4 sm:mt-6 sm:px-6 lg:mt-7 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">

                {/* Logo and Brand */}
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                    <div className="relative flex-shrink-0">
                        <Image
                            src="/Stack@2x.png"
                            alt="বাজার দর logo"
                            width={50}
                            height={50}
                            className="h-9 w-9 sm:h-11 sm:w-11 lg:h-14 lg:w-14 object-contain"
                            priority
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="text-base font-extrabold sm:text-xl lg:text-2xl text-gray-900 leading-tight">
                            বাজার দর
                        </h2>
                        <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 font-medium">
                            {date}
                        </p>
                    </div>
                </div>

               <UserInfo />

            </div>

            {/* Navigation Links */}
            <div className="mt-4 sm:mt-5">
                <NavLinks />
            </div>
        </header>
    );
};

export default Header;