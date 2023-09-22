import { NextPage } from 'next'
import { Box, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { ProductList } from '../components/products'
import { useProducts } from '@/hooks'

const HomePage: NextPage = () => {

  const { products, isLoading, isError } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading
        ? <h1>Cargando...</h1>
        : <ProductList products={ products } />
      }
    </ShopLayout>
  )
}

export default HomePage