import { NextPage, GetServerSideProps, GetStaticProps, GetStaticPaths } from "next"
import { ShopLayout } from "@/components/layouts"
import { ProductSlideshow, SizeSelector } from "@/components/products"
import { ItemCounter } from "@/components/ui"
import { IProduct } from "@/interfaces"

import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { dbProducts } from "@/database"

interface Props {
    product: IProduct
}

//NEXT RECOMIENDA USAR LA GENERACION ESTATICA HASTA DONDE SEA POSIBLE
const ProductPage: NextPage<Props> = ({ product }) => {

    /* const router = useRouter()
    const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`) */

    //no se hace asi xq el SEO no se ve nada
    //xq se veria el <h1>Loading</h1> y no sirve para el SEO

    //pregenerar la data del lado del servidor

    return (
        <ShopLayout title={"ABC"} pageDescription={""}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant="h1" component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">${product.price}</Typography>

                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">Cantidad</Typography>
                            <ItemCounter />
                            <SizeSelector
                                selectedSize={product.sizes[0]}
                                sizes={product.sizes}
                            />
                        </Box>
                        {/**agregar al carrito */}
                        <Button color="secondary" className="circular-btn">
                            Agregar al carrito
                        </Button>

                        {/* <Chip label="No hay disponibles" color="error" variant="outlined"/> */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">Descripción</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//import { GetServerSideProps } from 'next'

//ES MEJOR USAR LA GENERACION ESTATICA, X ESO ESTO ESTA COMENTADO
/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { slug= '' } = params as { slug: string }
    const product = await dbProducts.getProductBySlug( slug )

    if( !product ){
        return {
            redirect: {
                destination: '/',
                permanent: false //esto sirve para saber si ese slug es parte de la web o no,
                //para marcarlo como permanentemente que no exista asi nunca mas lo toma,
                //en este caso puede existir un producto con un slug que ahora no existe
            }
        }
    }
    return {
        props: {
            product
        }
    }
} */

// getStaticPaths...

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const productSlugs = await dbProducts.getAllProductSlugs()

    return {
        paths: productSlugs.map(({ slug }) => ({
            params: {
                slug
            }
        })),
        fallback: "blocking"
    }
}

//getStaticProps, este es el que mando el producto al componente/page este (productPage)

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string } 
    const product = await dbProducts.getProductBySlug( slug )

    if( !product ){
        return {
            redirect: {
                destination: '/',
                permanent: false //esto sirve para saber si ese slug es parte de la web o no,
                //para marcarlo como permanentemente que no exista asi nunca mas lo toma,
                //en este caso puede existir un producto con un slug que ahora no existe
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}


export default ProductPage