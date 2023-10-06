import { NextPage, GetServerSideProps } from "next"
import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import { Box, Typography } from "@mui/material"
import { dbProducts } from '@/database';
import { IProduct } from "@/interfaces"

interface Props {
    products: IProduct[],
    foundProducts: boolean,
    query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    //asi no, TENGO QUE USAR EL: getServerSideProps
    //const { products, isLoading, isError } = useProducts('/search/haha')

    return (
        <ShopLayout title={'Teslo-shop - Search'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
            <Typography variant='h1' component='h1'>Buscar productos</Typography>
            {
                foundProducts ?
                <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>{ query }</Typography>
                :
                <Box display='flex' >
                    <Typography variant='h2' sx={{ mb: 1 }}>No encontramos productos ningún producto</Typography>
                    <Typography variant='h2' sx={{ ml: 1 }} textTransform='capitalize' color='secondary'>{ query }</Typography>
                </Box>
            }
            
            <ProductList products={ products } />

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string }

    if( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }  

    let products = await dbProducts.getProductsByTerm( query )

    const foundProducts = products.length > 0;

    //TODO: si no hay productos, mostrar sugerencias
    //x eso uso let y no const

    if( !foundProducts ) {
        //aca podria leer las cokies y buscar algo relacionado
        // getProductsByTerm('shirt') por ejemplo o cualquier cosa
        products = await dbProducts.getProductsByTerm('shirt')
        //products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}


export default SearchPage