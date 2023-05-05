import React, { FC, useState } from 'react';
import Collapse from '@/common/components/elements/Collapse';
import FormBride from '../form/FormBride';
import { BrideDataProps } from '@/common/types/information';

interface BridesSectionProps {
  id: number;
  title: string;
  render: (data: BrideDataProps) => JSX.Element;
}

const MenuBride: FC = () => {
  const BRIDES_SECTION: BridesSectionProps[] = [
    {
      id: 1,
      title: 'Calon Mempelai Wanita',
      render: () => (
        <FormBride
          type="bride"
          isPrimary={primaryOrder === 'bride'}
          onPrimaryOrderChange={(type: 'bride' | 'groom', checked: boolean) =>
            handlePrimaryOrderChange(type, checked)
          }
        />
      ),
    },
    {
      id: 2,
      title: 'Calon Mempelai Pria',
      render: () => (
        <FormBride
          type="groom"
          isPrimary={primaryOrder === 'groom'}
          onPrimaryOrderChange={(type: 'bride' | 'groom', checked: boolean) =>
            handlePrimaryOrderChange(type, checked)
          }
        />
      ),
    },
  ];

  const [primaryOrder, setPrimaryOrder] = useState<string>('bride');

  const handlePrimaryOrderChange = (type: 'bride' | 'groom', checked: boolean) => {
    if (checked) {
      setPrimaryOrder(type);
    } else {
      setPrimaryOrder(type === 'bride' ? 'groom' : 'bride');
    }
  };

  return (
    <div className="py-5 px-5 pb-8 space-y-4">
      {BRIDES_SECTION.map((bride, index) => (
        <Collapse key={bride?.id} title={bride?.title}>
          {bride?.render({
            is_primary: bride?.id === 1 ? primaryOrder === 'bride' : primaryOrder === 'groom',
            full_name: null,
            short_name: null,
          })}
        </Collapse>
      ))}
    </div>
  );
};

export default MenuBride;
