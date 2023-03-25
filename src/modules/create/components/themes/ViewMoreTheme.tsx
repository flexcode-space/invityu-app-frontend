import React from "react";
import { Avatar } from "antd";
import { BiRightArrowAlt as MoreIcon } from "react-icons/bi";

const ViewMoreTheme = () => {
	return (
		<div className="py-2 min-w-[14rem] max-w-[14rem] w-14rem">
			<div className="flex text-center gap-5 flex-col justify-center items-center h-full rounded-xl overflow-hidden shadow-sm border border-solid border-primary-50 cursor-pointer transition-all duration-300 ">
				<Avatar
					size={26}
					onClick={() => console.log("handle view more theme")}
					className="mr-3 text-primary-600 bg-white shadow-sm"
				>
					<MoreIcon size="24" />
				</Avatar>
				<div className="px-12 text-sm text-primary-600 font-semibold">
					Lihat Tema Lainnya
				</div>
			</div>
		</div>
	);
};

export default ViewMoreTheme;
