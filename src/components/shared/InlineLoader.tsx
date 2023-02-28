import React from "react";
import { motion, Transition } from "framer-motion";
import styled from "@emotion/styled";

const loadingContainer = {
	width: "3rem",
	height: "1.4rem",
	display: "flex",
	justifyContent: "space-around",
	alignItems: "center",
};

const loadingCircle = {
	display: "block",
	width: "8px",
	height: "8px",
	backgroundColor: "#003a87",
	borderRadius: "0.5rem",
};

const loadingContainerVariants = {
	start: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	end: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const loadingCircleVariants = {
	start: {
		y: "0%",
	},
	end: {
		y: "60%",
	},
};
const loadingCircleTransition: Transition = {
	duration: 0.4,
	repeat: Infinity,
	repeatType: "reverse",
	ease: "easeInOut",
};

const StyledLoading = styled.div`
	text-align: -webkit-center;
`;

const InlineLoader: React.FC = () => {
	return (
		<StyledLoading>
			<motion.div
				style={loadingContainer}
				variants={loadingContainerVariants}
				initial="start"
				animate="end"
			>
				<motion.span
					style={loadingCircle}
					variants={loadingCircleVariants}
					transition={loadingCircleTransition}
				></motion.span>
				<motion.span
					style={loadingCircle}
					variants={loadingCircleVariants}
					transition={loadingCircleTransition}
				></motion.span>
				<motion.span
					style={loadingCircle}
					variants={loadingCircleVariants}
					transition={loadingCircleTransition}
				></motion.span>
			</motion.div>
		</StyledLoading>
	);
};

export default InlineLoader;
