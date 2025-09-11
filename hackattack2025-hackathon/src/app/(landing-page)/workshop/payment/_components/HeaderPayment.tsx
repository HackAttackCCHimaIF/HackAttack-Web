import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const HeaderPayment = ({

}) => {

  return (
    <div className="pt-32 ">
        <div className="flex flex-row items-start gap-6 text-white">
            <Link 
                href={"/workshop"}
                className={buttonVariants({className: "rounded-full size-14 bg-transparent border items-center flex justify-center", size: "icon"})}
                >
                <ChevronLeft className="size-12" strokeWidth={1} />
            </Link>
            <div className='text-2xl flex space-y-3 flex-col justify-center sm:text-4xl font-bold mb-3'>
                <div className="">
                    <span className='bg-gradient-to-r from-[#0f75bd] to-[#64BB48] bg-clip-text text-transparent'>
                    Workshop
                    </span>
                    :{" "}
                    <br className='sm:hidden block'/>
                    <span className='bg-[#EF4B72] px-2 py-1 block sm:inline mt-1 sm:mt-0 w-fit'>
                    Exclusive Access
                    </span>
                </div>
                <div>
                    <p className="text-xl font-semibold">Registration is open, claim your spot today!</p>
                </div>
            </div>
        </div>
    </div>
  );
};
