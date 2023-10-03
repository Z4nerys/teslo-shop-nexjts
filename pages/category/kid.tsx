import { NextPage } from 'next'
import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'

const KidPage: NextPage = () => {

  const { products, isLoading, isError } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title='Teslo-Shop kids' pageDescription='Ropa para niños'>
      <Typography variant='h1' component='h1'>Niños</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Productos para niños</Typography>
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default KidPage