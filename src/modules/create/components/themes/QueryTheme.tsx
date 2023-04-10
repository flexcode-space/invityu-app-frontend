import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	TbListDetails as IconList,
	TbLayoutGrid as IconGrid,
} from "react-icons/tb";

import Container from "@/common/components/elements/Container";
import PageHeader from "@/common/components/layouts/partials/PageHeader";
import ThemeCard from "./ThemeCard";
import { ThemeProps } from "@/common/types/themes";

import { useGetThemeList } from "../../hooks";

const QueryTheme: React.FC = () => {
	const [viewOptions, setViewOptions] = useState("list");

	const router = useRouter();
	const { id } = router.query;
	console.log("🚀 aulianza ~ file: QueryTheme.tsx:20 ~ id:", id);

	const { data, isLoading, isError } = useGetThemeList();
	const themeList = data?.data?.data[0]?.themes || [];

	const handleViewOptions = () => {
		setViewOptions(viewOptions === "list" ? "grid" : "list");
	};

	return (
		<>
			<PageHeader title="Pilihan Tema Basic" isFixedPosition isBackButton />
			<div className="pt-6 pb-14" />
			<Container className="pt-3 pb-10 space-y-3">
				<div className="flex items-center justify-between">
					<div>Filter: semua tema Basic</div>
					<div className="cursor-pointer" onClick={handleViewOptions}>
						{viewOptions === "list" ? (
							<IconList size={22} />
						) : (
							<IconGrid size={22} />
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 justify-items-center">
					{themeList.map((theme: ThemeProps, index: number) => (
						<ThemeCard
							key={index}
							{...theme}
							viewOptions={viewOptions}
							isAnimation
						/>
					))}
				</div>
			</Container>
		</>
	);
};

export default QueryTheme;
