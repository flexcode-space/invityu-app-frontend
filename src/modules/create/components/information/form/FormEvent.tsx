import React, { FC, useState } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { Checkbox, Spin, Switch } from 'antd';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import Input from '@/common/components/form/Input';
import Button from '@/common/components/elements/Button';
import ButtonIcon from '@/common/components/elements/ButtonIcon';
import Datepicker from '@/common/components/form/Datepicker';
import Select from '@/common/components/form/Select';
import Textarea from '@/common/components/form/Textarea';
import TimePicker from '@/common/components/form/Timepicker';
import GoogleMapSelector from '@/common/components/elements/GoogleMapSelector';

import { EventDataProps } from '@/common/types/information';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import {
  useDeleteEventData,
  usePostEventsData,
  usePutEventData,
} from '@/modules/create/hooks/dataHooks';
import { onErrorHandling } from '@/common/helpers/error';
import { useQueryClient } from 'react-query';

interface FormEventProps {
  data: EventDataProps;
  onDelete?: () => void;
  onNameChange: (value?: string) => void;
  isFirstEvent: boolean;
  onPrimaryOrderChange: (checked: boolean) => void;
}

const timezoneSelectOptions = [
  { value: 'WIB', label: 'WIB (Waktu Indonesia Barat)' },
  { value: 'WIT', label: 'WIT (Waktu Indonesia Timur)' },
  { value: 'WITA', label: 'WITA (Waktu Indonesia bagian Tengah)' },
];

const FormEvent: FC<FormEventProps> = ({
  data,
  onDelete,
  onNameChange,
  isFirstEvent,
  onPrimaryOrderChange,
}) => {
  const [isUntilFinish, setUntilFinish] = useState<boolean>(data?.is_until_finish || false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: Number(data?.latitude) || null,
    lng: Number(data?.longitude) || null,
  });

  const queryClient = useQueryClient();

  const { mutate: createEvent, isLoading: postDataLoading } = usePostEventsData();
  const { mutate: updateEvent, isLoading: putDataLoading } = usePutEventData();
  const { mutate: deleteEvent, isLoading: deleteDataLoading } = useDeleteEventData();

  const initialValues: EventDataProps = {
    name: data?.name || null,
    date: data?.date || null,
    start_time: data?.start_time || '',
    end_time: data?.end_time || '',
    is_until_finish: data?.is_until_finish || false,
    timezone: data?.timezone || '',
    location: data?.location || '',
    address: data?.address || null,
    latitude: data?.latitude || '',
    longitude: data?.longitude || '',
    is_primary: data?.is_primary || false,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Nama Acara wajib diisi'),
    date: yup.string().required('Tanggal Acara wajib dipilih'),
    start_time: yup.string().required('Waktu mulai wajib dipilih'),
    timezone: yup.string().required('Zona Waktu wajib dipilih'),
    address: yup.string().required('Alamat lengkap acara wajib diisi'),
  });

  const onSubmit = (values: FormikValues) => {
    const payload = {
      name: values?.name,
      date: values?.date,
      start_time: values?.start_time,
      end_time: !isUntilFinish ? values?.end_time : '',
      is_until_finish: isUntilFinish,
      timezone: values?.timezone,
      location: values?.location,
      address: values?.address,
      latitude: selectedLocation?.lat?.toString() || '',
      longitude: selectedLocation?.lng?.toString() || '',
      is_primary: data?.is_primary || false,
      ...(data?.id && { id: data.id }),
    };

    console.log('aulianza payload => ', payload);

    if (data?.id) {
      try {
        updateEvent(payload, {
          onSuccess: (res) => {
            if (res?.data?.status) {
              queryClient.invalidateQueries(['invitation-data']);
              toast.success('Data acara berhasil diubah');
            }
          },
          onError: (error) => onErrorHandling(error),
        });
      } catch (error) {
        toast.error('Unexpected error occurred!');
      }
    } else {
      try {
        createEvent(payload, {
          onSuccess: (res) => {
            if (res?.data?.status) {
              queryClient.invalidateQueries(['invitation-data']);
              toast.success('Data acara berhasil disimpan');
            }
          },
          onError: (error) => onErrorHandling(error),
        });
      } catch (error) {
        toast.error('Unexpected error occurred!');
      }
    }
  };

  const handleDeleteEvent = () => {
    const eventId = data?.id;

    if (eventId) {
      const payload = { id: eventId };

      try {
        deleteEvent(payload, {
          onSuccess: (res) => {
            if (res?.data?.status) {
              queryClient.invalidateQueries(['invitation-data']);
              toast.success('Acara berhasil dihapus');
            }
          },
          onError: (error) => onErrorHandling(error),
        });
      } catch (error) {
        toast.error('Unexpected error occurred!');
      }
    } else {
      console.log('aulianza event blm di create');
      onDelete?.();
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    onPrimaryOrderChange(checked);
  };

  const handleEndTimeCheckbox = (e: CheckboxChangeEvent) => {
    setUntilFinish(e.target.checked);
  };

  const handleSelectLocation = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  // RY: todo follow form bride to set initial value on useEffect

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Spin size="large" spinning={postDataLoading || putDataLoading || deleteDataLoading}>
              <Form className="m-1">
                <Input
                  label="Nama Acara"
                  required={true}
                  name="name"
                  placeholder="Masukkan nama acara"
                  type="text"
                  onChange={(e: any) => {
                    onNameChange(e.target.value);
                  }}
                />
                <Datepicker
                  label="Tanggal"
                  required={true}
                  name="date"
                  value={formik.values.date || undefined}
                  placeholder="Pilih tanggal acara"
                  onSelectedDate={(date: string | null) => formik.setFieldValue('date', date)}
                />
                <div className="flex w-full gap-3 mb-3">
                  <Input
                    label="Waktu Mulai"
                    required={true}
                    name="start_time"
                    placeholder="00:00"
                    type="time"
                    className="w-1/2"
                  />
                  <div className="flex flex-col gap-1 w-1/2">
                    <Input
                      label="Waktu Selesai"
                      required={false}
                      name="end_time"
                      placeholder="00:00"
                      type="time"
                      className="w-full"
                      isReadOnly={isUntilFinish}
                    />
                    <Checkbox onChange={handleEndTimeCheckbox} checked={isUntilFinish}>
                      Sampai selesai
                    </Checkbox>
                  </div>
                </div>
                <Select
                  name="timezone"
                  label="Zona Waktu"
                  placeholder="Pilih zona waktu"
                  onChange={(value: string | number) => formik.setFieldValue('timezone', value)}
                  options={timezoneSelectOptions}
                  required={true}
                  value={data?.timezone ?? undefined}
                />
                <Input
                  label="Lokasi"
                  required={false}
                  name="location"
                  placeholder="Masukkan lokasi acara"
                  type="text"
                />
                <Textarea
                  label="Alamat Lengkap"
                  required={true}
                  name="address"
                  placeholder="Masukkan alamat lengkap"
                  type="textarea"
                  rows={2}
                  autoSize
                />
                <GoogleMapSelector
                  onSelectLocation={handleSelectLocation}
                  latitude={data?.latitude}
                  longitude={data?.longitude}
                />
                {selectedLocation?.lat && (
                  <div className="flex bg-blue-50 text-gray-500 mb-8 py-3 px-5 rounded-xl">
                    <ul>
                      <li>
                        Latitude : <span className="font-semibold">{selectedLocation?.lat}</span>
                      </li>
                      <li>
                        Longitude : <span className="font-semibold">{selectedLocation?.lng}</span>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-2 justify-between my-4 text-gray-500 font-[14px]">
                  Jadikan acara utama?
                  <Switch
                    checkedChildren="Ya"
                    unCheckedChildren="Tidak"
                    onChange={handleSwitchChange}
                    checked={data?.is_primary}
                  />
                </div>
                <Button
                  type="submit"
                  className="my-3"
                  disabled={!formik.dirty || !formik.isValid}
                  isBlock
                >
                  Simpan Data Acara
                </Button>
                <ButtonIcon
                  type="button"
                  onClick={handleDeleteEvent}
                  className="border-none"
                  bgColor="#ffffff"
                  textColor="#ee4a4a"
                  borderColor="#ffffff"
                  isBlock
                >
                  Hapus Acara
                </ButtonIcon>
              </Form>
            </Spin>
          );
        }}
      </Formik>
    </>
  );
};

export default FormEvent;
