import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"

const SummaryPage = () => (
    <ShopLayout title="Resumen de orden" pageDescription={"Resumen de la orden"}>
        <Typography variant="h1" component='h1'>Resumen de la orden</Typography>
        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList isEditable/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant="h2">Resumen (3 productos)</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'> Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' legacyBehavior passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography>Gastón Fleitas</Typography>
                        <Typography>333 Algun lugar</Typography>
                        <Typography>Calle, HYA 23S</Typography>
                        <Typography>Canadá</Typography>
                        <Typography>+54 23135143</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <NextLink href='/cart' legacyBehavior passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        
                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
)

export default SummaryPage