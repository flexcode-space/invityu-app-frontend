import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import DataInformation from '@/modules/create/components/information/DataInformation';

import { themeColor } from '@/common/constant/color';
import { meta } from '@/common/constant/meta';
import { protectedRoute } from '@/common/utils/auth';

const CreateInformationPage: NextPage = () => {
  const [metaThemeColor, setMetaThemeColor] = useState<string>(themeColor?.PRIMARY);

  const handleEffectChange = (active: boolean) => {
    if (active) {
      setMetaThemeColor('#222222');
    } else {
      setMetaThemeColor(themeColor?.PRIMARY);
    }
  };

  return (
    <>
      <NextSeo
        title="Data Informasi - Invityu"
        description={meta?.DESCRIPTION}
        themeColor={metaThemeColor}
      />
      <DataInformation setActiveEffect={handleEffectChange} />
    </>
  );
};

export default protectedRoute(CreateInformationPage);
