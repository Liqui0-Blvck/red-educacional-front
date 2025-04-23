import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
// import { actualizar_contraseña_miembro } from '../store/slices/miembros/miembrosPeticiones';
import { useNavigate, useParams } from 'react-router-dom';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import Label from '../components/form/Label';
import Validation from '../components/form/Validation';
import FieldWrap from '../components/form/FieldWrap';
import Input from '../components/form/Input';
import Button from '../components/ui/Button';
import { MdDataSaverOn } from 'react-icons/md';
import { IoMdSave } from 'react-icons/io';
import Container from '../components/layouts/Container/Container';
import { useKeyPress } from 'react-use';
import Icon from '../components/icon/Icon';
import PageWrapper from '../components/layouts/PageWrapper/PageWrapper';
import { restablecimientoContraseñaMiembro } from '../utils/validationForm.utils';
import { confirmar_correo, verificar_token_activacion } from '../store/slices/auth/authSlices';
import { toast } from 'react-toastify';
import FourSquare from 'react-loading-indicators/FourSquare';
import { set } from 'lodash';

interface IFormikValues {
  password: string;
  re_password: string;
}

const PasswordReset = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false); // Estado para controlar el toast
  const dispatch = useAppDispatch();
  const path = useParams();
  const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
  const [passwordShowStatus2, setPasswordShowStatus2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isPressed = useKeyPress('Enter');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(verificar_token_activacion({
      params: {
        id: path.activationId || '',
        token: path.activationToken || ''
      }
    })).unwrap()
      .then((res) => {
        if (res.status === 200) {
            setLoading(false)
        } else {
          toast.error('El enlace de confirmación es inválido o ha expirado.', {
            autoClose: 2000,
          });
        }
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000); // Añadir un retraso de 2 segundos
      })
      .catch((_error) => {
        toast.error('Ocurrió un error al confirmar el correo.', {
          autoClose: 5000,
        });
        setLoading(false);
       
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000); // Añadir un retraso de 2 segundos
      });
  }, [dispatch, path.activationId, path.activationToken, navigate, toastShown]);

  const formik = useFormik({
    initialValues: {
      password: '',
      re_password: ''
    },
    validationSchema: restablecimientoContraseñaMiembro,
    onSubmit: (values: IFormikValues) => {
      // setIsSaving(true);
      // dispatch(actualizar_contraseña_miembro({
      //   params: {
      //     uid: path.activationId || '',
      //     token: path.activationToken || '',
      //     new_password: values.password,
      //     re_new_password: values.re_password
      //   }
      // }))
      //   .then(() => {
      //     navigate('/login', { replace: true });
      //   })
      //   .catch((error) => {
      //     setIsSaving(false);
      //     console.error('Error al actualizar la contraseña:', error);
      //     toast.error('Error al actualizar la contraseña. Intenta nuevamente.', {
      //       autoClose: 5000,
      //     });
      //   });
    }
  });

  useEffect(() => {
    if (isPressed) {
      formik.handleSubmit();
    }
  }, [isPressed]);

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className='dark:bg-zinc-800 bg-zinc-200 shadow-md rounded-lg border-4 border-blue-400/75'>
          <FourSquare color="#2290c0" size="large" text="" textColor="" />
        </div>
      </div>
    )
  }

  return (
    <PageWrapper isProtectedRoute={false} className='bg-white dark:bg-inherit' name='Cambio contraseña'>
      <div className='container mx-auto flex flex-col h-full items-center justify-center'>
        <div className='flex max-w-sm flex-col gap-8'>
          <div>
            <span className='text-4xl font-semibold text-justify'>¡Bienvenido a tu nuevo gimnasio!</span>
          </div>
          <div>
            <span>Para completar el proceso de configuración, por favor crea una nueva contraseña.</span>
          </div>

          <div className='border border-zinc-500/25 dark:border-zinc-500/50' />
          <div className='w-full flex flex-col gap-4'>
            <div>
              <Label htmlFor='password'>Contraseña</Label>

              <Validation
                isValid={formik.isValid}
                isTouched={formik.touched.password}
                invalidFeedback={formik.errors.password}
                validFeedback='Good'>
                <FieldWrap
                  firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
                  lastSuffix={
                    <Icon
                      className='mx-2 cursor-pointer'
                      icon={passwordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
                      onClick={() => {
                        setPasswordShowStatus(!passwordShowStatus);
                      }}
                    />
                  }>
                  <Input
                    dimension='lg'
                    type={passwordShowStatus ? 'text' : 'password'}
                    autoComplete='current-password'
                    id='password'
                    name='password'
                    placeholder='**********'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FieldWrap>
              </Validation>
            </div>

            <div className='col-span-12 lg:col-span-6'>
              <Label htmlFor='re_password'>Confirmar Contraseña</Label>

              <Validation
                isValid={formik.isValid}
                isTouched={formik.touched.re_password}
                invalidFeedback={formik.errors.re_password}
                validFeedback='Good'>
                <FieldWrap
                  firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
                  lastSuffix={
                    <Icon
                      className='mx-2 cursor-pointer'
                      icon={passwordShowStatus2 ? 'HeroEyeSlash' : 'HeroEye'}
                      onClick={() => {
                        setPasswordShowStatus2(!passwordShowStatus2);
                      }}
                    />
                  }>
                  <Input
                    dimension='lg'
                    type={passwordShowStatus2 ? 'text' : 'password'}
                    autoComplete='current-password'
                    id='re_password'
                    name='re_password'
                    placeholder='**********'
                    value={formik.values.re_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FieldWrap>
              </Validation>
            </div>

            <div>
              <Button
                aria-details='Guardar'
                icon={isSaving ? <MdDataSaverOn className='mr-3 text-2xl animate-spin' /> : <IoMdSave className='mr-3 text-2xl' />}
                variant='solid'
                size='lg'
                className='w-full'
                colorIntensity={isSaving ? '400' : '600'}
                isDisable={isSaving}
                onClick={() => formik.handleSubmit()}>
                {isSaving ? 'Guardando...' : 'Actualizar Contraseña'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PasswordReset;
