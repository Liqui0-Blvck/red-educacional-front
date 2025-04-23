import React, { useState } from 'react';
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
import { onLogin, onSignUp } from '../../store/slices/auth/authSlices';
import useCookiesStorage from '../../hooks/useCookieStorage';
import { SignUpValidation } from '../../utils/validationForm.utils';


type TValues = {
	email: string;
  username: string
	password: string;
  re_password: string;
};

const SignUpPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [tokens, setTokens] = useCookiesStorage('user', null);

	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);


	const formik = useFormik({
		initialValues: {
			email: '',
      username: '',
			password: '',
      re_password: '',
		},
    validationSchema: SignUpValidation,
		onSubmit: (values: TValues) => {
				dispatch(onSignUp({ data: { ...values }, navigate }))
		},
	});



	return (
		<PageWrapper isProtectedRoute={false} className=' bg-white dark:bg-inherit' name='Registro'>
			<div className='container mx-auto flex h-full items-center justify-center'>
				<div className='flex max-w-sm flex-col gap-8'>
					<div>
						<LogoTemplate className='h-12' />
					</div>
					<div>
						<span className='text-4xl font-semibold'>Registro</span>
					</div>
					<div>
						<span>Registrate con una nueva cuenta</span>
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
								invalidFeedback={formik.errors.email}>
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
								isTouched={formik.touched.username}
								invalidFeedback={formik.errors.username}>
								<FieldWrap
									firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
									<Input
										dimension='lg'
										id='username'
										name='username'
										placeholder='Nombre usuario'
										value={formik.values.username}
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
								invalidFeedback={formik.errors.password}>
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

            <div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.re_password}
								invalidFeedback={formik.errors.re_password}>
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
										id='re_password'
										name='re_password'
										placeholder='Confirmar Password'
										value={formik.values.re_password}
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
								Registrate
							</Button>
						</div>
					</form>
					<div>
						<span className='flex gap-2 text-sm'>
							<span className='text-zinc-400 dark:text-zinc-600'>
								¿Tienes una cuenta?
							</span>
							<Link to='/' className='hover:text-inherit'>
								Inicia sesión
							</Link>
						</span>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default SignUpPage;
