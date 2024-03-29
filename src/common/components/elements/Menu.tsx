import React, { useEffect, useMemo, useState } from 'react';
import Router from 'next/router';
import { Checkbox, Tag } from 'antd';
import { BiChevronRight as RightArrowIcon } from 'react-icons/bi';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Card from './Card';
import Image from './Image';

import ModalSheet from './ModalSheet';

import { logout } from '@/common/utils/auth';

interface MenuItem {
  order: number;
  id: string;
  title: string;
  description?: string | null;
  target: string;
  icon: string | null;
  isRequired: boolean;
  tag: string | null;
  isChecked?: boolean;
  render: () => React.ReactNode;
}

interface MenuProps {
  menus: MenuItem[][];
  isCheckbox?: boolean;
  isClickable?: boolean;
  isChevron?: boolean;
  checkedMenu?: (item: MenuItem) => void;
  unCheckedMenu?: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({
  menus,
  isCheckbox,
  isClickable,
  isChevron,
  checkedMenu,
  unCheckedMenu,
}) => {
  const lastMenu = menus?.map((i) => i[i.length - 1]);

  const filterMenus = (menus: MenuItem[][]): MenuItem[][] =>
    menus.map((menu) =>
      menu.reduce((filteredMenu, item) => {
        const existingItem = filteredMenu.find((filteredItem) => filteredItem.id === item.id);
        if (!existingItem) {
          filteredMenu.push(item);
        }
        return filteredMenu;
      }, [] as MenuItem[]),
    );
  const filteredMenus = useMemo(() => filterMenus(menus), [menus]);

  const [isOpenModalSheet, setOpenModalSheet] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<MenuItem>(menus[0][0]);

  const handleCheckMenu = (item: MenuItem) => {
    const updatedItem = { ...item, isChecked: !item.isChecked };
    if (updatedItem.isChecked && checkedMenu) {
      checkedMenu(updatedItem);
    } else if (!updatedItem.isChecked && unCheckedMenu) {
      unCheckedMenu(updatedItem);
    }
  };

  const checkedValues = filteredMenus[0]
    .filter((item: MenuItem) => item.isChecked === true)
    .map((item: MenuItem) => item.id);

  const handleClick = (type: string, target?: string, menu?: MenuItem | null) => {
    if (type === 'modal') {
      if (menu) {
        setMenuActive(menu);
        setOpenModalSheet(true);
      }
    } else if (type === 'url') {
      const checkTarget = target?.substring(0, 1).includes('/');
      if (target && checkTarget) {
        Router.push(target);
      } else if (logout) {
        logout();
      }
    }
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      if (isOpenModalSheet) {
        body.style.overflow = 'hidden';
      } else {
        body.style.removeProperty('overflow');
      }
    }
  }, [isOpenModalSheet]);

  useEffect(() => {
    if (isOpenModalSheet) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
          setOpenModalSheet(false);
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpenModalSheet]);

  return (
    <div className="mb-8 space-y-6">
      {filteredMenus.map((child, index) => (
        <Card key={index} className="p-0" borderColor="#EBF2FC">
          {child.map((item, key) => (
            <StyledMenuItem
              key={key}
              className={`pt-4 pb-3 px-6 cursor-pointer hover:md:bg-gray-50 ${
                isClickable ? '' : 'cursor-default'
              }`}
              isLast={item?.id !== lastMenu[index].id}
              onClick={() => {
                if (isClickable) {
                  handleClick('modal', '', item);
                }
                handleCheckMenu(item);
              }}
              disabled={!isClickable}
            >
              <Checkbox.Group className="w-full" name="menu" value={checkedValues}>
                <div className="flex items-center w-full gap-5">
                  {isCheckbox && <Checkbox value={item?.id} checked={item?.isChecked} />}
                  {item?.icon && (
                    <div className="w-fit">
                      <Image src={item?.icon} width={55} height={55} alt={item?.title} />
                    </div>
                  )}
                  <div className="w-full">
                    <div className="flex">
                      <span>{item?.title}</span>
                      {item?.isRequired && <span className="text-red-500">*</span>}
                      {item?.tag && (
                        <Tag
                          color={item?.tag === 'Premium' ? 'purple' : 'gold'}
                          className="ml-2 rounded-xl"
                        >
                          {item?.tag}
                        </Tag>
                      )}
                    </div>
                    {item?.description && (
                      <div
                        className="text-gray-500 text-sm"
                        dangerouslySetInnerHTML={{ __html: item?.description || '' }}
                      ></div>
                    )}
                  </div>
                  {isChevron && (
                    <div>
                      <RightArrowIcon size="24" className="align-middle text-primary-600" />
                    </div>
                  )}
                </div>
              </Checkbox.Group>
            </StyledMenuItem>
          ))}
        </Card>
      ))}

      <ModalSheet
        title={menuActive?.title}
        isOpen={isOpenModalSheet}
        onClose={() => setOpenModalSheet(false)}
        isDisableDrag
      >
        <>{menuActive.render()}</>
      </ModalSheet>
    </div>
  );
};

export default Menu;

const StyledMenuItem = styled.div<{ isLast: boolean; disabled: boolean }>`
  ${({ isLast }) =>
    isLast &&
    css`
      border-bottom: 1px solid #f3f3f3;
    `}
`;
