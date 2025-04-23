import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/layouts/PageWrapper/PageWrapper';
import Container from '../components/layouts/Container/Container';
import FourSquare from 'react-loading-indicators/FourSquare';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { confirmar_correo } from '../store/slices/auth/authSlices';
import { toast } from 'react-toastify';

const ConfirmPage = () => {
  const { id, token } = useParams<{ id: string; token: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(confirmar_correo({ params: { navigate, id, token } }))
        .unwrap()
        .then(() => {
          setLoading(false);
          toast.success('Correo Confirmado', {
            autoClose: 500,
          })
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 4000);
        })
        .catch((err) => {
          if (err === 'Usuario ya confirmado') {
            setError('Tu cuenta ya ha sido confirmada.');
          } else {
            setError('No se pudo confirmar tu cuenta.');
          }
          setLoading(false);
          // Después de mostrar el mensaje de error, redirige al login después de 3 segundos
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        });
    }, 2000); // Espera 2000 ms (2 segundos)

    return () => clearTimeout(timer);
  }, [id, token]);

  return (
    <PageWrapper title='Confirmación' isProtectedRoute={false}>
      <Container
        breakpoint={null}
        className='h-full flex items-center justify-center p-10'
      >
        <div className='flex flex-col items-center justify-center p-8 dark:bg-zinc-800 bg-zinc-200 shadow-md rounded-lg border-4 border-blue-400/75'>
          {loading ? (
            <FourSquare color="#2290c0" size="large" text="" textColor="" />
          ) : (
            <>
              <h1 className='text-2xl font-semibold mb-4 dark:text-zinc-400 text-black'>{error ? 'Confirmado' : '¡Felicitaciones!'}</h1>
              <p className='text-lg mb-4 dark:text-zinc-400 text-black'>{error ? error : 'Tu email ha sido confirmado con éxito.'}</p>
              {!error && <p className='text-base dark:text-zinc-400 text-black'>Ahora serás redirigido al inicio de sesión.</p>}
            </>
          )}
        </div>
      </Container>
    </PageWrapper>
  );
};

export default ConfirmPage;
