import React, { FC, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import Button from '@/common/components/elements/Button';
import EmptyState from '@/common/components/elements/EmptyState';

import Collapse from '@/common/components/elements/Collapse';
import FormEvent from '../form/FormEvent';

import { EventDataProps } from '@/common/types/information';

import { useGetInvitationDataBySection } from '@/modules/create/hooks/dataHooks';

const MenuEvent: FC = () => {
  const [events, setEvents] = useState<EventDataProps[]>([]);
  const [eventName, setEventName] = useState<string | undefined>('');

  const { data: formDataRes, isLoading } = useGetInvitationDataBySection({
    filter: 'events',
  });
  const eventsData = useMemo(() => formDataRes?.data?.data || [], [formDataRes?.data?.data]);

  useEffect(() => {
    if (eventsData) setEvents(eventsData);
  }, [eventsData]);

  const isFirstEvent = events?.length === 1 ? true : false;

  const handleAddEvent = () => {
    if (events.length >= 2) {
      return toast.error('Maksimal 2 Acara');
    }

    const newEvent = {
      name: '',
      date: '',
      start_time: '',
      end_time: '',
      is_until_finish: false,
      timezone: '',
      location: '',
      address: '',
      gmaps: '',
      is_primary: false,
    };

    if (events.length === 0) {
      newEvent.is_primary = true;
    } else {
      const hasPrimaryEvent = events.some((event) => event.is_primary);
      if (!hasPrimaryEvent) {
        newEvent.is_primary = true;
      }
    }

    const addEvent = [...events, newEvent];
    setEvents(addEvent);
  };

  const handleDeleteEvent = (index: number) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      updatedEvents.splice(index, 1);
      return updatedEvents;
    });
  };

  const handleEventNameChange = (index: number, name?: string) => {
    const newEvents = [...events];
    newEvents[index].name = name || '';
    setEvents(newEvents);
  };

  const handlePrimaryEventChange = (checked: boolean, index: number) => {
    const newEvents = [...events];
    if (checked) {
      const primaryEventIndex = newEvents.findIndex((event) => event.is_primary);
      if (primaryEventIndex >= 0) {
        newEvents[primaryEventIndex].is_primary = false;
      }
      newEvents[index].is_primary = true;
    } else {
      newEvents[0].is_primary = true;
      newEvents[index].is_primary = false;
    }
    setEvents(newEvents);
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
              <Collapse
                title={event?.name || eventName || '-'}
                initialState={event?.is_primary && isFirstEvent}
              >
                <FormEvent
                  data={event}
                  onDelete={() => handleDeleteEvent(index)}
                  onNameChange={(name) => handleEventNameChange(index, name)}
                  isFirstEvent={isFirstEvent}
                  onPrimaryOrderChange={(e) => handlePrimaryEventChange(e, index)}
                />
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
