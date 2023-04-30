import React, { FC, useState } from 'react';
import { Formik, Field, Form, FormikValues } from 'formik';
import { BsInstagram as InstgramIcon } from 'react-icons/bs';
import { Spin, Switch } from 'antd';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { BrideDataProps } from '@/common/types/information';
import { InputProps } from '@/common/components/form/type';

import Input from '@/common/components/form/Input';
import Button from '@/common/components/elements/Button';

import { usePostBridesData } from '@/modules/create/hooks/dataHooks';
import { onErrorHandling } from '@/common/helpers/error';
import ImageUpload from '@/common/components/form/ImageUpload';

interface FormBrideProps {
  type: 'bride' | 'groom';
  data: BrideDataProps;
  isPrimary: boolean;
  onPrimaryOrderChange: (type: 'bride' | 'groom', checked: boolean) => void;
}

const FormBride: FC<FormBrideProps> = ({ type, data, isPrimary, onPrimaryOrderChange }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  console.log('🚀 aulianza ~ file: FormBride.tsx:25 ~ data:', data);

  const { mutate, isLoading } = usePostBridesData(type);

  const initialValues: BrideDataProps = {
    full_name: null,
    short_name: null,
    photo: null,
    father_name: null,
    mother_name: null,
    family_tree: null,
    instagram: null,
    is_primary: false,
  };

  const inputForm: InputProps[] = [
    {
      label: 'Nama Lengkap',
      name: 'full_name',
      placeholder: 'Masukkan nama lengkap',
      type: 'text',
      note: '*',
    },
    {
      label: 'Nama Panggilan',
      name: 'short_name',
      placeholder: 'Masukkan nama panggilan',
      type: 'text',
      note: '*',
    },
    {
      label: 'Nama Ayah',
      name: 'father_name',
      placeholder: 'Masukkan nama ayah',
      type: 'text',
    },
    {
      label: 'Nama Ibu',
      name: 'mother_name',
      placeholder: 'Masukkan nama ibu',
      type: 'text',
    },
    {
      label: 'Anak Ke',
      name: 'family_tree',
      placeholder: 'Masukkan anak ke',
      type: 'number',
    },
    {
      label: 'Instagram',
      name: 'instagram',
      placeholder: 'Masukkan username instagram',
      type: 'text',
      prefix: <InstgramIcon size="18" />,
    },
  ];

  const validationSchema = yup.object().shape({
    full_name: yup.string().required('Nama Lengkap wajib diisi'),
    short_name: yup.string().required('Nama Panggilan wajib diisi'),
    photo: yup.string().nullable(),
    father_name: yup.string().nullable(),
    mother_name: yup.string().nullable(),
    family_tree: yup.number().nullable(),
    instagram: yup.string().nullable(),
  });

  const handleSwitchChange = (checked: boolean) => {
    onPrimaryOrderChange(type, checked);
  };

  const handleImageChange = (imageUrl: string) => setPhoto(imageUrl);

  const onSubmit = (values: FormikValues) => {
    const payload = {
      full_name: values?.full_name,
      short_name: values?.short_name,
      photo: photo,
      father_name: values?.father_name,
      mother_name: values?.mother_name,
      family_tree: values?.family_tree,
      instagram: values?.instagram,
      is_primary: isPrimary,
    };

    console.log('aulianza payload => ', payload);

    try {
      mutate(payload, {
        onSuccess: (res) => {
          if (res?.data?.status) {
            toast.success('Data berhasil disimpan');
          }
        },
        onError: (error) => onErrorHandling(error),
      });
    } catch (error) {
      toast.error('Unexpected error occurred!');
    }
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Spin size="large" spinning={isLoading}>
              <div className="mb-5">
                <label className="block text-gray-500 text-[14px]">Foto</label>
                <ImageUpload onChange={handleImageChange} />
              </div>
              <Form className="m-1">
                {inputForm.map((item, key) => (
                  <div key={key}>
                    <Field name={item?.name}>
                      {({ field, form }: { field: any; form: any }) => (
                        <Input
                          label={item?.label}
                          name={item?.name}
                          placeholder={item?.placeholder}
                          type={item?.type}
                          note={item?.note}
                          prefix={item?.prefix}
                          suffix={item?.suffix}
                        />
                      )}
                    </Field>
                  </div>
                ))}
                <div className="flex gap-2 justify-between my-4 text-gray-500 font-[14px]">
                  Jadikan yang utama?
                  <Switch
                    checkedChildren="Ya"
                    unCheckedChildren="Tidak"
                    onChange={handleSwitchChange}
                    checked={isPrimary}
                  />
                </div>
                <Button
                  type="submit"
                  className="my-3"
                  disabled={!formik.dirty || !formik.isValid}
                  isBlock
                >
                  Simpan Data Mempelai {type === 'bride' ? 'Wanita' : 'Pria'}
                </Button>
              </Form>
            </Spin>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormBride;
