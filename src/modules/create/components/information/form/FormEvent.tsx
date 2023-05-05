import React, { FC } from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { Spin, Switch } from 'antd';
import * as yup from 'yup';

import Input from '@/common/components/form/Input';
import Button from '@/common/components/elements/Button';

import { EventDataProps } from '@/common/types/information';
import ButtonIcon from '@/common/components/elements/ButtonIcon';
import Datepicker from '@/common/components/form/Datepicker';

interface FormEventProps {
  onDelete?: () => void;
  onNameChange: (value?: string) => void;
  isFirstEvent: boolean;
  onPrimaryOrderChange: (checked: boolean) => void;
}

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
  });

  const onSubmit = (values: FormikValues) => {
    const payload = {
      name: values?.name,
      date: values?.date,
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
                />
                <Datepicker
                  label="Tanggal"
                  required={true}
                  name="date"
                  placeholder="Pilih tanggal acara"
                  onSelectedDate={(date: string | null) => formik.setFieldValue('date', date)}
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
