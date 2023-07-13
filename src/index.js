import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';


export default function DaDataAutocomplete({
    token='b64560af54b95583ac2711f8ecb9744514f08b11',
    type='address',
    label='Адрес',
    initialQuery='',
    value,
    onChange=(event, newValue) => {console.log(newValue);},
    inputProps
}) {
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState(value ? value.value : initialQuery);

    const updateSuggestions = (newInputValue) => {
        if (newInputValue) {
            axios.post(
                'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/' + type,
                {
                    query: newInputValue
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }
            ).then(
                (response) => {
                    setSuggestions(response.data.suggestions);
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        }
        else {
            setSuggestions([]);
        }
    }

    const handleFocus = (event, newInputValue) => {
        updateSuggestions(event.target.value);
    }

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        updateSuggestions(newInputValue);
    }

    const handleChange = (event, newValue) => {
        onChange(event, newValue);
    }

    return (
        <Autocomplete
            freeSolo={true}
            filterOptions={(x) => x}
            options={suggestions}
            getOptionLabel={(option) => option.value}
            onInputChange={handleInputChange}
            onFocus={handleFocus}
            onChange={handleChange}
            inputValue={inputValue}
            value={value}
            {...inputProps}
            renderInput={(params) => <TextField {...params} label={label} />}
            renderOption={(props, option, {inputValue}) => {
                return (
                    <li {...props}>
                        <div>
                            {option.value}
                            {type === 'fms_unit' && (
                                <span style={{fontSize: '0.8rem'}}>
                                    <br />
                                    Код подразделения {option.data.code}
                                </span>
                            )}
                        </div>
                    </li>
                );
            }}
        />
    );
}
