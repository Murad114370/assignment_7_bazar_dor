import Image from "next/image";


const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        }
    )
    // console.log(date);

    return (
        <div className="flex justify-between container mx-auto mt-7" >
            <div className="flex gap-2 items-center">
                <Image className="w-10 h-10 " height={50} width={50} src={"/Stack@2x.png"} alt="" />

                <div>
                    <h2 className="font-bold">
                        বাজার দর
                    </h2>
                    <p>{date}</p>
                </div>

            </div>


            <div className="flex gap-4 ">
                <button className="btn cursor-pointer  hover:scale-101 transition-transform">সাইন ইন</button>
                <button className="btn bg-green-700 rounded-[8px] px-4 py-3 text-white shadow-[0_8px_12px_-3px_rgba(0,0,0,0.3)] shadow-green-400 cursor-pointer  hover:scale-102 transition-transform">সাইন আপ</button>
            </div>
        </div>
    );
};

export default Header;