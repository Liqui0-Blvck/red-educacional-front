import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layouts/PageWrapper/PageWrapper';
import Button from '../../components/ui/Button';
import Input from '../../components/form/Input';
import LogoTemplate from '../../templates/layouts/Logo/Logo.template';
import FieldWrap from '../../components/form/FieldWrap';
import Icon from '../../components/icon/Icon';
import Validation from '../../components/form/Validation';
import { useAppDispatch } from '../../store/hook';
import { onLogin } from '../../store/slices/auth/authSlices';
import { authPages } from '../../config/pages.config';
import {useKeyPress} from 'react-use';
import { use } from 'i18next';



type TValues = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const isPressed = useKeyPress('Enter')




	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.email) {
				errors.email = 'Required';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		onSubmit: (values: TValues) => {
			dispatch(onLogin({ data: { ...values }, navigate }))
		},
	})

	useEffect(() => {
		if (isPressed[0]) {
			formik.handleSubmit()
		}
	}, [isPressed])



	return (
		<PageWrapper isProtectedRoute={false} className='bg-white dark:bg-inherit' name='Sign In'>
			<div className='container mx-auto flex h-full items-center justify-center'>
				<div className='flex max-w-sm flex-col gap-8'>
					<div>
						<LogoTemplate className='h-12' />
					</div>
					<div>
						<span className='text-4xl font-semibold'>Inicia Sesión</span>
					</div>
					<div>
						<span>Ingresa tus credenciales para iniciar sesión</span>
					</div>
					{/* <div className='grid grid-cols-12 gap-4'>
						<div className='col-span-6'>
							<Button
								icon='CustomGoogle'
								variant='outline'
								color='zinc'
								size='lg'
								className='w-full'>
								Google
							</Button>
						</div>
						<div className='col-span-6'>
							<Button
								icon='CustomApple'
								variant='outline'
								color='zinc'
								size='lg'
								className='w-full'>
								Apple
							</Button>
						</div>
					</div> */}
					<div className='border border-zinc-500/25 dark:border-zinc-500/50' />
					<form className='flex flex-col gap-4' noValidate>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.email}
								invalidFeedback={formik.errors.email}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
									<Input
										dimension='lg'
										id='email'
										autoComplete='email'
										name='email'
										placeholder='Email'
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
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
										placeholder='Password'
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div>
							<Button
								size='lg'
								variant='solid'
								className='w-full font-semibold'
								onClick={() => formik.handleSubmit()}>
								Ingresar
							</Button>
						</div>
					</form>
					<div>
						<span className='flex gap-2 text-sm'>
							<span className='text-zinc-400 dark:text-zinc-600'>
								¿Tienes una cuenta?
							</span>
							<Link to={`${authPages.signUp.to}`} className='hover:text-inherit'>
								Registrate
							</Link>
						</span>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
