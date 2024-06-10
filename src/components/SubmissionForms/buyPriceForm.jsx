import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-google-places-autocomplete';

export default function BuyPriceForm(props) {
    const [formData, setFormData] = React.useState({
        sellerPrice: '',
        arv: '',
        maxAllowed: '',
        rehabLevel: '',
        location: ''
    });

    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelect = async (place) => {
        setFormData({
            ...formData,
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
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, submit data
            console.log('Form submitted:', formData);
        } else {
            // Form is invalid, set errors
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        // Validate seller's bottom line price
        if (!data.sellerPrice.trim()) {
            errors.sellerPrice = 'Seller\'s Bottom Line Price is required.';
        }

        // Validate estimated ARV
        if (!data.arv.trim()) {
            errors.arv = 'Estimated ARV is required.';
        }

        // Validate maximum allowed number
        if (!data.maxAllowed.trim()) {
            errors.maxAllowed = 'Maximum Allowed Number is required.';
        }

        // Validate rehab level
        if (!data.rehabLevel.trim()) {
            errors.rehabLevel = 'Rehab Level is required.';
        }

        // Validate location
        if (!data.location.trim()) {
            errors.location = 'Location is required.';
        }

        return errors;
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: '100%' }, // Set width to 100% for responsiveness
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}> {/* Grid container */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="sellerPrice"
                        name="sellerPrice"
                        label="Seller's Bottom Line Price"
                        type='number'
                        fullWidth
                        value={formData.sellerPrice}
                        onChange={handleChange}
                        error={!!errors.sellerPrice}
                        helperText={errors.sellerPrice}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="arv"
                        name="arv"
                        label="Enter Estimated ARV"
                        type='number'
                        fullWidth
                        value={formData.arv}
                        onChange={handleChange}
                        error={!!errors.arv}
                        helperText={errors.arv}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="maxAllowed"
                        name="maxAllowed"
                        label="Your Maximum Allowed Number"
                        type='number'
                        fullWidth
                        value={formData.maxAllowed}
                        onChange={handleChange}
                        error={!!errors.maxAllowed}
                        helperText={errors.maxAllowed}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.rehabLevel}>
                        <InputLabel id="rehab-level-label">Choose Estimated Rehab Level</InputLabel>
                        <Select
                            labelId="rehab-level-label"
                            label="Choose Estimated Rehab Level"
                            name="rehabLevel"
                            fullWidth
                            value={formData.rehabLevel}
                            onChange={handleChange}
                        >
                            <MenuItem value="Lipstick">Lipstick</MenuItem>
                            <MenuItem value="Light Cosmetic">Light Cosmetic</MenuItem>
                            <MenuItem value="Full Cosmetic">Full Cosmetic</MenuItem>
                            <MenuItem value="Heavy Rehab">Heavy Rehab</MenuItem>
                            <MenuItem value="Down to Stud">Down to Stud</MenuItem>
                        </Select>
                        {errors.rehabLevel && <div style={{ textAlign: 'left', fontSize: '13px', color: 'red', paddingLeft: '0.7rem', paddingTop: '0.1rem' }}>{errors.rehabLevel}</div>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <PlacesAutocomplete
                        value={formData.location}
                        onChange={(value) => setFormData({ ...formData, location: value })}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <TextField
                                    required
                                    id="location"
                                    label="Enter a location"
                                    type='text'
                                    fullWidth
                                    {...getInputProps({
                                        placeholder: 'Enter a location...',
                                        className: 'location-search-input',
                                        onClick: () => {
                                            // Apply styling when clicked
                                            document.getElementById("location").style.backgroundColor = "lightgreen";
                                        },
                                        onBlur: () => {
                                            // Remove styling when blurred
                                            document.getElementById("location").style.backgroundColor = "white";
                                        }
                                    })}
                                    error={!!errors.location}
                                    helperText={errors.location}
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
                type='submit'
            >
                Request a Buy Price
            </Button>
        </Box>
    );
}
