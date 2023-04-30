import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import Button from '@/common/components/elements/Button';
import EmptyState from '@/common/components/elements/EmptyState';

import Collapse from '@/common/components/elements/Collapse';
import FormEvent from '../form/FormEvent';

import { EventDataProps } from '@/common/types/information';

const MenuEvent: FC = () => {
  const [events, setEvents] = useState<EventDataProps[]>([]);
  console.log('🚀 aulianza ~ file: MenuEvent.tsx:21 ~ MenuEvent ~ events:', events);

  const isFirstEvent = events?.length === 0 ? true : false;

  const handleAddEvent = () => {
    if (events?.length >= 2) {
      return toast.error('Maksimal 2 Acara');
    }

    const addEvent = [
      ...events,
      {
        name: '',
        date: '',
        start_time: '',
        end_time: '',
        is_until_finish: false,
        timezone: '',
        location: '',
        address: '',
        gmaps: '',
        is_primary: isFirstEvent,
      },
    ];
    setEvents(addEvent);
  };

  const handleDeleteEvent = () => {
    console.log('🚀 aulianza ~ file: MenuEvent.tsx:43 ~ handleDeleteEvent');
  };

  const variants = {
    open: { height: 'auto', opacity: 1 },
    closed: { height: 0, opacity: 0 },
  };

  return (
    <div className="py-5 px-5 pb-8">
      {events?.length ? (
        <motion.div className="mt-2 mb-8 space-y-4">
          {events?.map((event, index) => (
            <motion.div
              key={index}
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <Collapse title={event?.name || '-'} initialState={event?.is_primary}>
                <FormEvent onDelete={handleDeleteEvent} />
              </Collapse>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          className="mb-10"
          title="Acara Belum Ditambahkan"
          description="Klik tombol dibawah untuk mulai menambah acara"
          src="https://assets7.lottiefiles.com/private_files/lf30_mb1rkenn.json"
        />
      )}

      <Button onClick={handleAddEvent} isDisabled={events?.length >= 2} isBlock>
        Tambah Acara
      </Button>
    </div>
  );
};

export default MenuEvent;
