import React, { FC, useState } from 'react';
import { Formik, Field, Form, FormikValues } from 'formik';
import { Spin, Switch } from 'antd';
import * as yup from 'yup';

import Input from '@/common/components/form/Input';
import Button from '@/common/components/elements/Button';

import { EventDataProps } from '@/common/types/information';
import { InputProps } from '@/common/components/form/type';
import ButtonIcon from '@/common/components/elements/ButtonIcon';

interface FormEventProps {
  onDelete?: () => void;
  onNameChange: (value?: string) => void;
}

const FormEvent: FC<FormEventProps> = ({ onDelete, onNameChange }) => {
  const initialValues: EventDataProps = {
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

  const inputForm: InputProps[] = [
    {
      label: 'Nama Acara',
      name: 'name',
      placeholder: 'Masukkan nama acara',
      type: 'text',
      required: true,
    },
    {
      label: 'Tanggal',
      name: 'date',
      placeholder: 'Pilih tanggal acara',
      type: 'date',
      required: true,
    },
  ];

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

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Spin size="large" spinning={false}>
              <Form className="m-1">
                {inputForm.map((item, key) => (
                  <div key={key}>
                    <Field name={item?.name}>
                      {({ field, form }: { field: any; form: any }) => (
                        <Input
                          label={item?.label}
                          required={item?.required}
                          name={item?.name}
                          placeholder={item?.placeholder}
                          type={item?.type}
                          note={item?.note}
                          prefix={item?.prefix}
                          suffix={item?.suffix}
                          onChange={(e: any) => {
                            form.setFieldValue(field.name, e.target.value);
                            if (field.name === 'name') onNameChange(e.target.value);
                          }}
                        />
                      )}
                    </Field>
                  </div>
                ))}
                <div className="flex gap-2 justify-between my-4 text-gray-500 font-[14px]">
                  Jadikan acara utama?
                  <Switch
                    checkedChildren="Ya"
                    unCheckedChildren="Tidak"
                    // onChange={handleSwitchChange}
                    // checked={isPrimary}
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
