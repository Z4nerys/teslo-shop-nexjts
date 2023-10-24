import { useState } from 'react';
import NextLink from 'next/link';
import { AuthLayout } from '@/components/layouts'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material'
import { useForm } from 'react-hook-form';
import { tesloApi } from '@/api';
import { validations } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const [showError, setShowError] = useState(false)

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false)
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password })
            const { token, user } = data;
            console.log({ token, user })
        } catch (error) {
            console.log('Ese usuario ya esta registrado')
            //console.log(error?.response?.data)
            setShowError(true)
            setTimeout(() => setShowError(false), 3000)
        }
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip
                                    label="El usuario ya fue creado"
                                    color='error'
                                    variant='outlined'
                                    icon={<ErrorOutline />}
                                    className='fadeIn'
                                    sx={{display: showError ? 'flex' : 'none'}}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label='Nombre'
                                variant='filled'
                                fullWidth
                                {...register('name',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.name} //doble negacion es como si no tuviera pero se hace
                                //para manejarlo como un error booleano xq sino seria el objeto email
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label='Correo'
                                variant='filled'
                                fullWidth
                                {...register('email',{
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
                            >
                                Crear cuenta
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href='/auth/login' passHref legacyBehavior>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage