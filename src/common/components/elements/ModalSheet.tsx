import React, { useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";
import { AiOutlineCloseCircle as IconClose } from "react-icons/ai";
import styled from "@emotion/styled";

interface ModalSheetProps {
	isEffect?: boolean;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

const ModalSheet = ({
	isOpen,
	isEffect,
	onClose,
	children,
	title,
}: ModalSheetProps) => {
	const ref = useRef<SheetRef>(null);

	return (
		<StyledModalSheet
			ref={ref}
			isOpen={isOpen}
			onClose={onClose}
			rootId={isEffect ? "__next" : ""}
			springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
			detent="content-height"
		>
			<Sheet.Container>
				<Sheet.Header>
					<StyledModalSheetHeader>
						<div>{title}</div>
						<IconClose
							size={20}
							onClick={(event) => {
								event.stopPropagation();
								onClose();
							}}
							className="cursor-pointer"
						/>
					</StyledModalSheetHeader>
				</Sheet.Header>
				<Sheet.Content>{children}</Sheet.Content>
			</Sheet.Container>
			<Sheet.Backdrop onTap={onClose} />
		</StyledModalSheet>
	);
};

export default ModalSheet;

const StyledModalSheet = styled(Sheet)`
	max-width: 480px;
	margin: 0px auto;

	.react-modal-sheet-container {
		border-top-right-radius: 2rem !important;
		border-top-left-radius: 2rem !important;
	}

	.react-modal-sheet-header {
		height: 30px !important;
	}

	.react-modal-sheet-backdrop {
		border: none !important;
	}
`;

const StyledModalSheetHeader = styled.div`
	border-top-right-radius: 2rem !important;
	border-top-left-radius: 2rem !important;
	background: #fff;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 2rem 1rem !important;
`;
