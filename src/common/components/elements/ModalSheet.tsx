import React, { useRef } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { IoMdClose as IconClose } from 'react-icons/io';
import styled from '@emotion/styled';

interface ModalSheetProps {
  isEffect?: boolean;
  isOpen: boolean;
  isDraggable?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalSheet = ({
  isOpen,
  isEffect,
  isDraggable = false,
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
      rootId={isEffect ? '__next' : ''}
      springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
      detent="content-height"
      disableDrag={isDraggable}
    >
      <Sheet.Container>
        <Sheet.Header>
          <StyledModalSheetHeader>
            <div className="font-semibold">{title}</div>
            <IconClose
              size={22}
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              className="cursor-pointer font-semibold"
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
    border-top-right-radius: 1rem !important;
    border-top-left-radius: 1rem !important;
  }

  .react-modal-sheet-header {
    height: 30px !important;
  }

  .react-modal-sheet-backdrop {
    border: none !important;
  }

  .react-modal-sheet-content {
    background: #fafafc;
  }
`;

const StyledModalSheetHeader = styled.div`
  border-top-right-radius: 1rem !important;
  border-top-left-radius: 1rem !important;
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
`;
