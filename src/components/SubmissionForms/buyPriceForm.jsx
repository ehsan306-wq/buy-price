import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function BuyPriceForm() {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '100%' }, // Set width to 100% for responsiveness
            }}
            noValidate
            autoComplete="off"
        >
            <Grid container spacing={2}> {/* Grid container */}
                <Grid item xs={12} sm={6}> {/* Two fields per row on large screens */}
                    <TextField
                        required
                        id="outlined-required"
                        label="Seller's Bottom Line Price"
                        type='number'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}> {/* Two fields per row on large screens */}
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Estimated ARV"
                        type='number'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}> {/* Two fields per row on large screens */}
                    <TextField
                        required
                        id="outlined-required"
                        label="Your Maximum Allowed Number"
                        type='number'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}> {/* Two fields per row on large screens */}
                    <FormControl fullWidth>
                        <InputLabel id="rehab-level-label">Choose Estimated Rehab Level</InputLabel>
                        <Select
                            labelId="rehab-level-label"
                            label="Choose Estimated Rehab Level"
                            fullWidth
                        >
                            <MenuItem value={10}>Lipstick</MenuItem>
                            <MenuItem value={20}>Light Cosmetic</MenuItem>
                            <MenuItem value={20}>Full Cosmetic</MenuItem>
                            <MenuItem value={20}>Heavy Rehab</MenuItem>
                            <MenuItem value={20}>Down to Stud</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}> {/* Two fields per row on large screens */}
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter a location"
                        type='text'
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
