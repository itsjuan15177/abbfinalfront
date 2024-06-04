import React from "react";
import { Box, TextField, Button, Grid } from "@mui/material";

function UserInput() {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Courier" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Tracking Number" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Notification eMail" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="EAT Date" />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="contained" color="primary">
            Get POD
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button variant="outlined" color="primary">
          Add to Tracking List
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Upload Tracking List
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginLeft: "10px" }}
        >
          Export Tracking List
        </Button>
      </Box>
    </Box>
  );
}

export default UserInput;
