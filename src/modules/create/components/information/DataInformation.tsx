import React, { useEffect, useState } from 'react';
import { Alert, Tooltip } from 'antd';
import { FcInfo as InfoIcon } from 'react-icons/fc';
import { IoIosAddCircle as AddIcon } from 'react-icons/io';

import Button from '@/common/components/elements/Button';
import Card from '@/common/components/elements/Card';
import Container from '@/common/components/elements/Container';
import Menu from '@/common/components/elements/Menu';
import PageHeader from '@/common/components/layouts/partials/PageHeader';

import {
  createDataInformationMenu,
  createDataInformationMenuAdditional,
} from '@/common/constant/menu';

import CreateStepWizard from '../CreateStepWizard';
import ModalSheet from '@/common/components/elements/ModalSheet';
import { useSelectedThemeDataStore } from '@/common/store/useThemeStore';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  target: string;
  icon: string;
  isRequired: boolean;
  tag: string | null;
  isChecked?: boolean;
  render: () => React.ReactNode;
}

interface DataInformationProps {
  setActiveEffect: (active: boolean) => void;
}

const DataInformation: React.FC<DataInformationProps> = ({ setActiveEffect }) => {
  const [isOpenAddDataModal, setOpenAddDataModal] = useState<boolean>(false);
  const [defaultMenu, setDefaultMenu] = useState(createDataInformationMenu);

  const { selectedThemeData } = useSelectedThemeDataStore();

  const informationTooltipMessage =
    'Kamu masih dapat merubah semua informasi data kapan saja, kecuali link undangan.';

  const additionalMenu = createDataInformationMenuAdditional;

  const toggleAddDataModal = () => {
    setOpenAddDataModal((prevState) => !prevState);
  };

  const handleAddMenu = (menu: any) => {
    const updatedMenu = [...defaultMenu];
    const [firstMenu] = updatedMenu;
    const updatedItem = { ...menu, isChecked: true };
    firstMenu.push(updatedItem);

    const existingMenu = additionalMenu[0].find((item: any) => item?.id === menu?.id);
    if (existingMenu) existingMenu.isChecked = true;

    setDefaultMenu(updatedMenu);
  };

  const handleRemoveMenu = (menu: MenuItem) => {
    const updatedMenu = [...defaultMenu];
    const [firstMenu] = updatedMenu;

    const findMenuIndex = firstMenu.findIndex((m: any) => m.id === menu.id);
    if (findMenuIndex !== -1) {
      firstMenu.splice(findMenuIndex, 1);
    }

    const existingMenu = additionalMenu[0].find((item: any) => item.id === menu.id);
    if (existingMenu) existingMenu.isChecked = false;

    setDefaultMenu(updatedMenu);
  };

  useEffect(() => {
    if (isOpenAddDataModal) {
      setActiveEffect(true);
    } else {
      setActiveEffect(false);
    }
  }, [isOpenAddDataModal, setActiveEffect]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (isOpenAddDataModal) {
        body.style.overflow = 'hidden';
      } else {
        body.style.removeProperty('overflow');
      }
    }
  }, [isOpenAddDataModal]);

  useEffect(() => {
    if (isOpenAddDataModal) {
      setActiveEffect(true);
      const handleEsc = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
          toggleAddDataModal();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    } else {
      setActiveEffect(false);
    }
  }, [isOpenAddDataModal, setActiveEffect]);

  return (
    <>
      <PageHeader title={`Data Informasi`} isFixedPosition isBackButton />
      <div className="pt-20 pb-16">
        <CreateStepWizard activeStep={1} />
        <Container className="pt-5 pb-6 space-y-8">
          <h2 className="text-xl font-medium">Isi informasi yang akan tampil di undanganmu!</h2>
          <Alert
            message={`Kamu memilih tema ${selectedThemeData?.name}`}
            type="info"
            className="text-primary-600 text-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Data Informasi</h3>
              <Tooltip
                placement="bottom"
                title={informationTooltipMessage}
                overlayStyle={{ fontSize: '12px' }}
              >
                <InfoIcon size={16} />
              </Tooltip>
            </div>
            <div>
              <Menu menus={defaultMenu} isChevron isClickable />

              <Card
                className="flex items-center gap-3 py-4 px-6 hover:md:bg-gray-50 cursor-pointer"
                borderColor="#EBF2FC"
                onClick={toggleAddDataModal}
              >
                <AddIcon size={20} className="text-primary-600" />
                <div>Data Informasi</div>
                <ModalSheet
                  title="Pilihan Data Informasi"
                  isOpen={isOpenAddDataModal}
                  onClose={toggleAddDataModal}
                  isEffect
                >
                  <div className="px-6 pb-5">
                    <Menu
                      menus={additionalMenu}
                      checkedMenu={(menu: any) => handleAddMenu(menu)}
                      unCheckedMenu={(menu: any) => handleRemoveMenu(menu)}
                      isCheckbox
                    />
                  </div>
                </ModalSheet>
              </Card>
            </div>
          </div>
          <Button isBlock>Lihat Preview Undangan</Button>
        </Container>
      </div>
    </>
  );
};

export default DataInformation;
