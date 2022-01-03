import React, { useState, useEffect } from 'react';
import { Slider, Box, Input } from '@mui/material';
import FilterContainer from '../containers/filter-container';

const RangeFilter = ({
  filterName,
  title,
  selectedMin,
  selectedMax,
  min,
  max,
  onChange,
  sx,
}) => {
  const [range, setRange] = useState([selectedMin, selectedMax]);
  const [currMin, currMax] = range;

  const handleSliderOnChange = (_, newRange) => {
    const [rangeMin, rangeMax] = newRange;
    if (rangeMin !== currMin || rangeMax !== currMax) {
      setRange(newRange);
    }
  };

  useEffect(
    () => setRange([selectedMin, selectedMax]),
    [selectedMin, selectedMax],
  );

  return (
    <FilterContainer title={title}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          my: 1,
          px: 3,
        }}
      >
        <Input
          value={currMin}
          type="number"
          inputProps={{ sx: { textAlign: 'center' } }}
          onChange={(event) => onChange({
            filterName,
            min: Number(event.target.value),
            max: currMax,
          })}
        />
        <Input
          value={currMax}
          type="number"
          inputProps={{ sx: { textAlign: 'center' } }}
          onChange={(event) => onChange({
            filterName,
            min: currMin,
            max: Number(event.target.value),
          })}
        />
      </Box>
      <Box sx={{ px: 1 }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          min={min}
          max={max}
          value={range}
          sx={sx}
          onChange={handleSliderOnChange}
          onChangeCommitted={(_, [newMin, newMax]) => onChange(
            { filterName, min: newMin, max: newMax },
          )}
          valueLabelDisplay="auto"
        />
      </Box>
    </FilterContainer>
  );
};

export default RangeFilter;
