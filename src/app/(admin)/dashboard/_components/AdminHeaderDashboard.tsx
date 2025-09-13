
export const AdminHeaderDashboard = ({
  leftText,
  rightText,
  description
}: {
  leftText?: string;
  rightText?: string;
  description: string;
}) => {

  return (
    <div className="py-4 px-4 flex justify-between items-center">
      <div className="relative inline-block">

        <div className="relative text-start pt-2 leading-tight sm:leading-none">
            <h1 className="relative text-[28px] sm:text-[36px] font-bold text-white uppercase leading-tight sm:leading-none">
                {leftText}{" "}
                <span className="inline-block tracking-wide uppercase py-0.5 px-1 bg-gradient-to-r from-[#0F75BD] to-[#64BB48] text-white">
                    {rightText}
                </span>
                </h1>
            <p className="text-white pt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};
