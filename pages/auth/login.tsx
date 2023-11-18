import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils';
import { tesloApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/context';

type FormData = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter()
    const { loginUser } = useContext( AuthContext )
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showError, setShowError] = useState(false)


    const onLoginUser = async ({ email, password }: FormData) => {

        setShowError(false)

        const isValidLogin = await loginUser( email, password )

        if( !isValidLogin ){
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
            return
        }

        const destination = router.query.p?.toString() || '/'
        router.replace(destination)
        
        // TODO: navegar a la pantalla a la cual el usuario estaba
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
                                <Chip
                                    label="La constraseña o el email es incorrecto"
                                    color='error'
                                    variant='outlined'
                                    icon={<ErrorOutline />}
                                    className='fadeIn'
                                    sx={{display: showError ? 'flex' : 'none'}}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Correo'
                                type='email'
                                variant='filled'
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail // es hacer la referencia pero no llama a la funcion.
                                    //y es lo mismo que: (val) => validations.isEmail(val)

                                })}
                                error={!!errors.email} //doble negacion es como si no tuviera pero se hace
                                //para manejarlo como un error booleano xq sino seria el objeto email
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password} //doble negacion es como si no tuviera pero se hace
                                //para manejarlo como un error booleano xq sino seria el objeto email
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                fullWidth
                                disabled= {showError}
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p?.toString()}` : '/auth/register'} passHref legacyBehavior>
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage