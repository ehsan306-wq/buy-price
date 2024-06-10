import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, Grid, FormHelperText } from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

export default function SubmitDealForm(props) {
    const [formValues, setFormValues] = useState({
        askingPrice: '',
        estimatedARV: '',
        location: '',
        rehabLevel: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSelect = async (place) => {
        setFormValues({
            ...formValues,
            location: place.description
        });
        try {
            const results = await geocodeByAddress(place.description);
            const latLng = await getLatLng(results[0]);
            console.log('Coordinates:', latLng);
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formValues.askingPrice) newErrors.askingPrice = 'Sale Price is required';
        if (!formValues.estimatedARV) newErrors.estimatedARV = 'ARV Price is required';
        if (!formValues.location) newErrors.location = 'Address is required';
        if (!formValues.rehabLevel) newErrors.rehabLevel = 'Please select Estimated Rehab Level';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Call the backend API or any other necessary actions
            console.log('Form values:', formValues);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="outlined-asking-price"
                        label="Enter your asking price"
                        type="number"
                        name="askingPrice"
                        value={formValues.askingPrice}
                        onChange={handleChange}
                        error={!!errors.askingPrice}
                        helperText={errors.askingPrice}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="outlined-estimated-arv"
                        label="Enter Estimated ARV"
                        type="number"
                        name="estimatedARV"
                        value={formValues.estimatedARV}
                        onChange={handleChange}
                        error={!!errors.estimatedARV}
                        helperText={errors.estimatedARV}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <PlacesAutocomplete
                        value={formValues.location}
                        onChange={(value) => setFormValues({ ...formValues, location: value })}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
                                    required
                                    id="location"
                                    label="Enter a location"
                                    type="text"
                                    name="location"
                                    fullWidth
                                    {...getInputProps({
                                        placeholder: 'Enter a location...',
                                        className: 'location-search-input',
                                        style: { backgroundColor: formValues.location === '' ? 'white' : 'lightgreen' },
                                    })}
                                    error={!!errors.location}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                        const style = {
                                            textAlign: 'left'
                                        }
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    style
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    {/* Conditionally render error message */}
                    {errors.location && (
                        <FormHelperText style={{ fontSize: '12px', color: 'red', paddingLeft: '1rem' }}>
                            {errors.location}
                        </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth style={{ marginLeft: '8px' }} error={!!errors.rehabLevel}>
                        <InputLabel id="rehab-level-label">Choose Estimated Rehab Level</InputLabel>
                        <Select
                            labelId="rehab-level-label"
                            label="Choose Estimated Rehab Level"
                            name="rehabLevel"
                            value={formValues.rehabLevel}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="1">Lipstick</MenuItem>
                            <MenuItem value="2">Light Cosmetic</MenuItem>
                            <MenuItem value="3">Full Cosmetic</MenuItem>
                            <MenuItem value="4">Heavy Rehab</MenuItem>
                            <MenuItem value="5">Down to Stud</MenuItem>
                        </Select>
                        {errors.rehabLevel && <FormHelperText>{errors.rehabLevel}</FormHelperText>}
                    </FormControl>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                sx={{
                    margin: '10px',
                    backgroundColor: '#42885e',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: '#386048',
                    }
                }}
                onClick={props.onReturnClick}
            >
                Return to Home
            </Button>
            <Button
                variant="contained"
                sx={{
                    margin: '10px',
                    backgroundColor: '#42885e',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: '#386048',
                    }
                }}
                type="submit"
            >
                Submit a deal
            </Button>
        </Box>
    );
}
