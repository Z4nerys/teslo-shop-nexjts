import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtototal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${265.36} Usd</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos (15%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>${35.34} Usd</Typography>
            </Grid>

            <Grid item xs={6} sx={{mt: 2}}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} sx={{mt: 2}} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">${365.36} Usd</Typography>
            </Grid>
        </Grid>
    )
}
