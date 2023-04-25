import React, { FC } from 'react';
import Container from '@/common/components/elements/Container';
import { Collapse } from 'antd';

const MenuBride: FC = () => {
  const { Panel } = Collapse;

  return (
    <Container className="pt-6 space-y-4">
      <Collapse>
        <Panel header="Calon Mempelai Wanita" key="1">
          <p>bohkreh</p>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header="Calon Mempelai Pria" key="1">
          <p>sadas</p>
        </Panel>
      </Collapse>
    </Container>
  );
};

export default MenuBride;
