import React from "react";
import Button from "@/common/components/elements/Button";
import Container from "@/common/components/elements/Container";
import Image from "@/common/components/elements/Image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Custom404: React.FC = () => {
	const route = useRouter();
	const handleBack = () => route.back();

	return (
		<StyledNotFound>
			<Container>
				<Image
					src="/images/illustrations/404.svg"
					width={500}
					height={500}
					alt="404"
					loading="eager"
					priority
				/>
				<div className="text-base p-5 mb-3">
					Ups.. halaman yang kamu cari ga ada nih!
				</div>
				<Button isBlock onClick={handleBack}>
					Kembali
				</Button>
			</Container>
		</StyledNotFound>
	);
};

export default Custom404;

const StyledNotFound = styled.div`
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	@media (max-width: 480px) {
		width: 100%;
	}
`;
