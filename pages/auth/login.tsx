import React from 'react'
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils';

type FormData = {
    email: string;
    password: string;
}

const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    console.log({errors})

    const onLoginUser = (data: FormData) => {
        console.log({ data })
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar Sesión</Typography>
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
                                error={ !!errors.email } //doble negacion es como si no tuviera pero se hace
                                //para manejarlo como un error booleano xq sino seria el objeto email
                                helperText={ errors.email?.message }
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
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres'}
                                })}
                                error={ !!errors.password } //doble negacion es como si no tuviera pero se hace
                                //para manejarlo como un error booleano xq sino seria el objeto email
                                helperText={ errors.password?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href='/auth/register' passHref legacyBehavior>
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