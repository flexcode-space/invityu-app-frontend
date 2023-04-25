import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import LoadingOverlay from 'react-loading-overlay-ts';
import toast from 'react-hot-toast';

import { BiKey } from 'react-icons/bi';
import { Formik, Field, Form, FormikValues } from 'formik';
import { HiOutlineMail as EmailIcon } from 'react-icons/hi';
import * as yup from 'yup';

import Button from '@/common/components/elements/Button';
import Container from '@/common/components/elements/Container';
import Input from '@/common/components/form/Input';
import Image from '@/common/components/elements/Image';
import PageHeading from '@/common/components/layouts/partials/auth/PageHeading';
import SSOLogin from '@/modules/auth/components/SSOLogin';

import { login } from '@/common/utils/auth';
import { onErrorHandling } from '@/common/helpers/error';
import { ssoProviders } from '@/common/constant/ssoProviders';
import { StyledAuthPage } from '@/common/styles/auth';

import { InputProps } from '@/common/components/form/type';

import { usePostLogin } from '../hooks';

const Login: React.FC = () => {
  const [isGoogleLoading, setGoogleLoading] = useState<boolean>(false);

  const [usernameValue, setUsernameValue] = useState<any>(null);
  const [usernameInputType, setUsernameInputType] = useState<string>('text');
  const [usernameInputPrefix, setUsernameInputPrefix] = useState<JSX.Element | null>(null);

  const router = useRouter();
  const { error } = router.query;

  const activeSSOProvider = ssoProviders.find((provider) => provider.is_active);
  const handleRoute = (url: string) => Router.push(url);

  const { mutate, isLoading } = usePostLogin();

  const initialValues = {
    username: null,
    password: null,
  };

  const inputForm: InputProps[] = [
    {
      label: 'Nomor HP atau Email',
      name: 'username',
      type: usernameInputType,
      prefix: <>{usernameInputPrefix}</>,
    },
    {
      label: 'Kata Sandi',
      name: 'password',
      type: 'password',
      prefix: <BiKey size="20" />,
    },
  ];

  const handleUsernameChange = useCallback(
    (setFieldValue: FormikValues['setFieldValue'], event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      value = event.target.value.replace(/^0+/, '').toLowerCase();
      setFieldValue('username', value);
      setUsernameValue(value);
    },
    [],
  );

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Nomor HP atau Email wajib diisi')
      .test('phone-or-email', 'Harap masukkan nomor HP atau email yang valid', function (value) {
        if (!value) return false;
        const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        const phoneRegex = /^(^\+62\s?|^8)(\d{3,4}-?){2}\d{3,4}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }),
    password: yup.string().min(5, 'Password minimal 5 karakter').required('Password wajib diisi'),
  });

  const onSubmit = (values: FormikValues) => {
    const payload = {
      username: values?.username,
      password: values?.password,
      type: usernameInputType,
    };

    try {
      mutate(payload, {
        onSuccess: (res) => {
          console.log('res:', res);
          if (res?.data?.status) {
            const token = res?.data?.data?.token || {};
            login({ token });
          }
        },
        onError: (error) => onErrorHandling(error),
      });
    } catch (error) {
      toast.error('Unexpected error occurred!');
    }
  };

  useEffect(() => {
    if (!usernameValue) {
      setUsernameInputType('text');
      setUsernameInputPrefix(<></>);
      return;
    }

    setUsernameInputType(isNaN(usernameValue) ? 'email' : 'phone');
    setUsernameInputPrefix(
      isNaN(usernameValue) ? (
        <EmailIcon size="20" />
      ) : (
        <>
          <Image src="/images/id-flag.svg" width={20} height={15} alt="id" />
          &nbsp; +62
        </>
      ),
    );
  }, [usernameValue]);

  useEffect(() => {
    if (error) toast.error('Terjadi kesalahan. Silahkan coba kembali');
  }, [error]);

  // TODO: move this line to page instead
  useEffect(() => {
    Cookies.get('token') && Router.push('/dashboard');
  }, []);

  return (
    <LoadingOverlay active={isGoogleLoading} spinner text="Mohon tunggu..." className="h-screen">
      <StyledAuthPage>
        <Container>
          <PageHeading title="Welcome back 👋" description="Masuk ke akunmu untuk melanjutkan" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="my-10">
                  {inputForm.map((item, key) => (
                    <div key={key}>
                      <Field name={item?.name}>
                        {({ field, form }: { field: any; form: any }) => (
                          <Input
                            label={item?.label}
                            name={item?.name}
                            type={item?.type}
                            prefix={item?.prefix}
                            suffix={item?.suffix}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                              item?.name === 'username' &&
                              handleUsernameChange(form.setFieldValue, event)
                            }
                          />
                        )}
                      </Field>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <div
                      className="text-right text-primary cursor-pointer"
                      onClick={() => handleRoute('/auth/forgot-password')}
                    >
                      Lupa Password?
                    </div>
                  </div>

                  <div className="my-8 space-y-6">
                    <Button
                      type="submit"
                      isDisabled={!(formik.isValid && formik.dirty)}
                      isBlock
                      isLoading={isLoading}
                    >
                      Masuk
                    </Button>
                    {activeSSOProvider && (
                      <div
                        className="flex justify-center items-center gap-5 w-full"
                        data-aos="flip-up"
                      >
                        <div className="border-t border-gray-200 w-full"></div>
                        <div className="text-gray-500">atau</div>
                        <div className="border-t border-gray-200 w-full"></div>
                      </div>
                    )}
                    <div className="flex flex-col space-y-4">
                      <SSOLogin setIsLoading={setGoogleLoading} />
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mt-10">
                    Belum punya akun?
                    <div
                      className="text-right text-primary font-medium cursor-pointer"
                      onClick={() => handleRoute('/auth/register')}
                    >
                      Daftar yuk!
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Container>
      </StyledAuthPage>
    </LoadingOverlay>
  );
};

export default Login;
