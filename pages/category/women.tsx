import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'
import React from 'react'

const WomenPage = () => {
  const { products, isLoading, isError } = useProducts('/products?gender=women')

  return (
    <ShopLayout title='Teslo-Shop women' pageDescription='Ropa para mujeres'>
      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para mujeres</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default WomenPage