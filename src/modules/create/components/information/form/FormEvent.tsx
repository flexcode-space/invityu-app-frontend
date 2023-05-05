import React, { FC } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { Spin, Switch } from 'antd';
import * as yup from 'yup';

import Input from '@/common/components/form/Input';
import Button from '@/common/components/elements/Button';
import ButtonIcon from '@/common/components/elements/ButtonIcon';
import Datepicker from '@/common/components/form/Datepicker';
import Select from '@/common/components/form/Select';
import Textarea from '@/common/components/form/Textarea';

import { EventDataProps } from '@/common/types/information';

interface FormEventProps {
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
  onDelete,
  onNameChange,
  isFirstEvent,
  onPrimaryOrderChange,
}) => {
  const initialValues: EventDataProps = {
    name: '',
    date: null,
    start_time: '',
    end_time: '',
    is_until_finish: false,
    timezone: '',
    location: '',
    address: '',
    gmaps: '',
    is_primary: false,
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
      end_time: values?.end_time,
      timezone: values?.timezone,
      location: values?.location,
      address: values?.address,
      gmaps: values?.gmaps,
    };

    console.log('aulianza payload => ', payload);

    // try {
    //   mutate(payload, {
    //     onSuccess: (res) => {
    //       if (res?.data?.status) {
    //         toast.success('Data berhasil disimpan');
    //       }
    //     },
    //     onError: (error) => onErrorHandling(error),
    //   });
    // } catch (error) {
    //   toast.error('Unexpected error occurred!');
    // }
  };

  const handleSwitchChange = (checked: boolean) => {
    onPrimaryOrderChange(checked);
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Spin size="large" spinning={false}>
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
                  <Input
                    label="Waktu Selesai"
                    required={false}
                    name="end_time"
                    placeholder="00:00"
                    type="time"
                    className="w-1/2"
                  />
                </div>
                <Select
                  name="timezone"
                  label="Zona Waktu"
                  placeholder="Pilih zona waktu"
                  onChange={(value: string | number) => formik.setFieldValue('timezone', value)}
                  options={timezoneSelectOptions}
                  required={true}
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
                <Textarea
                  label="Link Google Maps"
                  required={true}
                  name="gmaps"
                  placeholder="Masukkan link Google Maps"
                  type="textarea"
                  rows={2}
                  autoSize
                />

                <div className="flex gap-2 justify-between my-4 text-gray-500 font-[14px]">
                  Jadikan acara utama?
                  <Switch
                    checkedChildren="Ya"
                    unCheckedChildren="Tidak"
                    onChange={handleSwitchChange}
                    checked={isFirstEvent}
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
                  onClick={onDelete}
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
