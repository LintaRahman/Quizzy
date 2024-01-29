import React from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

const Footer = () => {
  return (
   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
    <Grid item xs={3} ></Grid>
    <Grid item xs={3} ></Grid>
    <Grid item xs={3} >
      <h1>Get in touch</h1>

    </Grid>
   </Grid>
  )
}

export default Footer