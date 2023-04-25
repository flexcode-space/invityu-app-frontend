import React, { useState } from 'react';
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
  render: () => void;
}

const DataInformation: React.FC = () => {
  const [isOpenAddDataModal, setOpenAddDataModal] = useState<boolean>(false);
  const [defaultMenu, setDefaultMenu] = useState(createDataInformationMenu);

  const { selectedThemeData } = useSelectedThemeDataStore();

  const informationTooltipMessage =
    'Kamu masih dapat merubah semua informasi data kapan saja, kecuali link undangan.';

  const additionalMenu = createDataInformationMenuAdditional;

  const handleAddMenu = (menu: any) => {
    const updatedMenu = [...defaultMenu];
    updatedMenu[0].push({ ...menu, isChecked: true });

    const existingMenu = additionalMenu[0].find((item: any) => item?.id === menu?.id);

    if (existingMenu) existingMenu.isChecked = true;

    setDefaultMenu(updatedMenu);
  };

  const handleRemoveMenu = (menu: MenuItem) => {
    const updatedMenu = [...defaultMenu];

    const findMenu = updatedMenu[0].findIndex((m: any) => m.id === menu.id);
    if (findMenu !== -1) updatedMenu[0].splice(findMenu, 1);

    const existingMenu = additionalMenu[0].find((item: any) => item.id === menu.id);

    if (existingMenu) existingMenu.isChecked = false;

    setDefaultMenu(updatedMenu);
  };

  return (
    <>
      <PageHeader title={`Data Informasi`} isFixedPosition isBackButton />
      <div className="pt-20 pb-16">
        <CreateStepWizard activeStep={1} />
        <Container className="pt-5 pb-6 space-y-8">
          <h2 className="text-xl font-medium">
            Isi data informasi yang akan kamu tampilkan di undanganmu!
          </h2>
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
                className="flex items-center gap-3 py-4 px-6 hover:bg-gray-50 cursor-pointer"
                borderColor="#EBF2FC"
                onClick={() => setOpenAddDataModal(true)}
              >
                <AddIcon size={20} className="text-primary-600" />
                <div>Data Informasi</div>
                <ModalSheet
                  title="Pilihan Data Informasi"
                  isOpen={isOpenAddDataModal}
                  onClose={() => setOpenAddDataModal(false)}
                  isEffect
                >
                  <div className="px-6 pb-5 bg-white">
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
