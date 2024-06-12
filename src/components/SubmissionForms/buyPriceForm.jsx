import React, { useState } from 'react';
import {
    Box, TextField, Button, FormControl, FormHelperText,
    InputLabel, MenuItem, Select, Grid, Checkbox, FormControlLabel, Typography,
    CircularProgress
} from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios';
import { getStateCodeByName } from '../../utils/getStateCodeByName';

export default function BuyPriceForm(props) {
    const [formData, setFormData] = useState({
        sellerPrice: '',
        arv: '',
        maxAllowed: '',
        rehabLevel: '',
        location: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });
    const [googleLocation, setGoogleLocation] = useState(null);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [checkBoxData, setCheckBoxData] = useState({
        check1: false,
        check2: false,
        check3: false,
    });
    const [checkBoxError, setCheckBoxError] = useState('');

    const [animatedPriceLower, setAnimatedPriceLower] = useState(0);
    const [animatedPriceUpper, setAnimatedPriceUpper] = useState(0);


    const [isPropertyLoader, setPropertyLoader] = useState(false);
    const [properties, setProperties] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelect = async (place) => {
        setGoogleLocation(place);
        setFormData((prevFormData) => ({
            ...prevFormData,
            location: place
        }));

        try {
            const results = await geocodeByAddress(place);
            if (results.length === 0) {
                throw new Error('No results found');
            }
            const latLng = await getLatLng(results[0]);
        } catch (error) {
            console.error('Error fetching coordinates:', error.message);
        }
    };

    const submitRequestBuyPrice = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, go to the next step
            setStep(2);
        } else {
            // Form is invalid, set errors
            setErrors(validationErrors);
        }
    };

    const submitCheckBoxForm = (e) => {
        e.preventDefault();
        if (validateCheckBoxForm()) {
            // Proceed with form submission or further steps
            console.log('CheckBox form submitted:', checkBoxData);
            // setStep(3);
            getProperties();
        }
    };

    const getProperties = () => {
        if (googleLocation) {
            setPropertyLoader(true);
            if (googleLocation.label.includes("Florida")) {
                getAtomDataByZipCode();
            } else {
                setPropertyLoader(false);
                setStep(4);
                setProperties([]);
            }
        }
    }

    const getAtomDataByZipCode = async () => {
        if (!googleLocation) return;

        console.log("googleLocation =>> ", googleLocation)
        let addressLine2 = '';
        if (googleLocation.value.types.includes("locality")) {
            addressLine2 += googleLocation.value.structured_formatting.main_text + ", ";
        } else if (googleLocation.value.types.includes("administrative_area_level_1")) {
            addressLine2 += getStateCodeByName(googleLocation.value.structured_formatting.main_text);
        }

        const params = {
            formatted_address: googleLocation.formatted_address,
            addressLine2: addressLine2,
        };

        setPropertyLoader(true);

        try {
            const res = await axios.post('https://buy-price-andy-backend.vercel.app/getAtomData', params);

            if (res.data.status.code === 0) {
                handleSuccessResponse(res.data);
            } else {
                handleErrorResponse();
            }
        } catch (error) {
            console.error('Error occurred:', error);
            handleErrorResponse();
        } finally {
            setPropertyLoader(false);
        }
    };

    const handleSuccessResponse = (res) => {
        let rehabCostSQFT = 0;
        const rehabCosts = {
            low: [25, 30, 35, 45, 60],
            high: [30, 40, 45, 55, 75],
            high1: [60, 65, 70, 80, 100],
            high2: [80, 90, 100, 110, 120],
        };

        let costCategory;
        if (formData.arv <= 501000) {
            costCategory = 'low';
        } else if (formData.arv > 501000 && formData.arv <= 999999) {
            costCategory = 'high';
        } else if (formData.arv > 999999 && formData.arv <= 2999999) {
            costCategory = 'high1';
        } else if (formData.arv > 2999999) {
            costCategory = 'high2';
        }

        rehabCostSQFT = rehabCosts[costCategory][formData.rehabLevel - 1];

        const newProperties = res.property.filter((property) => {
            const areaSQFT = property.building.size.universalsize;
            const avrPrice = formData.arv;
            const rehabCost = areaSQFT * rehabCostSQFT;
            const estClosingCost = (avrPrice * 8) / 100;
            const estCarryingCost = (avrPrice * 1.5) / 100;
            const dispoPrice = avrPrice - rehabCost - estClosingCost - estCarryingCost;
            const conditionalPrice = (dispoPrice - 40000) + 50000;

            return conditionalPrice >= formData.sellerPrice;
        });

        if (newProperties.length > 0) {
            setProperties(newProperties);
            setStep(3);
        } else {
            setStep(4);
            setProperties([]);
        }
    };

    const handleErrorResponse = () => {
        setProperties([]);
        setPropertyLoader(false);
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
        if (googleLocation) {
            if (!googleLocation.label.includes("Florida")) {
                errors.compareValues = 'We buy homes only in Florida';
            }
        } else {
            errors.location = 'Location is required.';
        }

        // Check if seller price and arv are valid
        if (data.sellerPrice - data.arv > 50000) {
            errors.compareValues = 'Please check current price and maximum allowable offer';
        }

        return errors;
    };

    const validateCheckBoxForm = () => {
        if (!checkBoxData.check1 || !checkBoxData.check2 || !checkBoxData.check3) {
            setCheckBoxError('Please select all the checkboxes');
            return false;
        }
        setCheckBoxError('');
        return true;
    };

    const validateStep3Form = () => {
        let errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required.';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required.';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = 'Please enter a valid email.';
            }
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required.';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveEmailData = () => {
        if (validateStep3Form()) {
            console.log('Step 3 form data:', formData);
            // For demonstration, assuming that the form is always not interested in this home
            setStep(4); // or setStep(5) based on your logic
        }
    };

    const animatePrices = (lower, upper) => {
        setAnimatedPriceLower(lower);
        setAnimatedPriceUpper(upper);
    };

    const handleCheckBoxChange = (e) => {
        const { name, checked } = e.target;
        setCheckBoxData({
            ...checkBoxData,
            [name]: checked
        });
    };

    return (
        isPropertyLoader ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress color="success" />
            </Box>
        ) :
            <>
                {step === 1 && (
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '100%' }, // Set width to 100% for responsiveness
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={submitRequestBuyPrice}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {errors.compareValues && (
                                    <div style={{ borderRadius: '5px', backgroundColor: "#e6fcb7", fontWeight: 'bold', padding: '15px' }}>
                                        {errors.compareValues}
                                    </div>
                                )}
                            </Grid>
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
                                    {errors.rehabLevel && (
                                        <div style={{ textAlign: 'left', fontSize: '13px', color: 'red', paddingLeft: '0.7rem', paddingTop: '0.1rem' }}>
                                            {errors.rehabLevel}
                                        </div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <PlacesAutocomplete
                                    selectProps={{
                                        value: googleLocation,
                                        onChange: handleSelect,
                                        placeholder: 'Enter a location...',
                                        styles: {
                                            input: (provided) => ({
                                                ...provided,
                                                width: '100%'
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                width: '100%',
                                            }),
                                        },
                                    }}
                                />
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
                )}
                {step === 2 && (
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '100%' }, // Set width to 100% for responsiveness
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={submitCheckBoxForm}
                        style={{
                            padding: "0 20px",
                            textAlign: "left"
                        }}
                    >
                        <Typography gutterBottom style={{ fontSize: '16px', textAlign: 'center', fontWeight: "bold", padding: "10px 0" }}>
                            Upon the successful acquisition of the aforementioned property under contract, I agree to the following:
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkBoxData.check1}
                                    onChange={handleCheckBoxChange}
                                    name="check1"
                                    color="primary"
                                />
                            }
                            style={{ padding: "5px 0" }}
                            label="* 72H Exclusivity: Grant EzyRes an exclusive right to sell the property effective for a duration of seventy-two (72) hours AFTER providing fully executed A-B contract and access to the underlying property if I can get it under contract within $20,000 of the buy price given from EzyRes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkBoxData.check2}
                                    onChange={handleCheckBoxChange}
                                    name="check2"
                                    color="primary"
                                />
                            }
                            style={{ padding: "5px 0" }}
                            label="* JV: Should I find the buyer NOT through EzyRes during the 72h exclusivity, I still agree to JV with EzyRes at 50%/50% split"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkBoxData.check3}
                                    onChange={handleCheckBoxChange}
                                    name="check3"
                                    color="primary"
                                />
                            }
                            style={{ padding: "5px 0" }}
                            label="* 50%/50% split: either the property sold by EzyRes or me during the 72h exclusivity period, I agree to 50%/50% split of the total assignment fee"
                        />
                        {checkBoxError && (
                            <Typography color="error" variant="body2">
                                {checkBoxError}
                            </Typography>
                        )}
                        <div style={{ display: "flex", justifyContent: "center" }}>
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
                                Back to Home
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
                                Proceed
                            </Button>
                        </div>
                    </Box>
                )}
                {step === 3 && (
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { width: '100%' }, // Set width to 100% for responsiveness
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="bg-white p-4">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phone"
                                        label="Phone"
                                        type="number"
                                        fullWidth
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                    />
                                </Grid>
                            </Grid>
                            <div className="my-4 justify-center flex space-x-2">
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
                                    Back to Home
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
                                    onClick={saveEmailData}
                                >
                                    Proceed
                                </Button>
                            </div>
                        </div>
                    </Box>
                )}

                {step === 4 && (
                    <Box className="bg-white p-4 text-center">
                        <Typography variant="h3" color="error" gutterBottom>
                            We are not interested in this home.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            According to your inputted values we have determined that the prices are too far off for it to make sense for us to pursue.
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" gutterBottom>
                            If you feel like you are able to get the seller much lower you can try again by clicking the button below:
                        </Typography>
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
                            onClick={() => setStep(1)}
                        >
                            Request a Buy Price
                        </Button>
                    </Box>
                )}

                {step === 5 && (
                    <Box className="px-8 py-4 bg-white flex flex-col items-center justify-center">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Based on <span style={{ backgroundColor: 'yellow' }}>your ARV</span> and our proprietary algorithm you need to get this property between*:
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
                                ${animatedPriceLower.toLocaleString()} - ${animatedPriceUpper.toLocaleString()}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" gutterBottom>
                                Thanks for submitting. Our team will underwrite your deal and get back to you within 24 hours.
                            </Typography>
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
                                Go Back to Home Page
                            </Button>
                        </div>
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                            <strong>DISCLAIMER</strong> - This is just a preliminary estimate using our proprietary algorithm. After you fully submit the deal through our deal submission portal, we will fully underwrite your deal within 1 business day. If you have any questions or concerns reach out to deals@ezyres.com.
                        </Typography>
                    </Box>
                )}
            </>
    );
}
