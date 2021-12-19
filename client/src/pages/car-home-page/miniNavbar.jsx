import React from 'react';
import Container from '@mui/material/Container';
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

const MiniNavbar = () => {
	return (
		<Box sx={{ backgroundColor: 'orangered' }}>
			<a>
				<FaPhone />{' '}
				<Typography
					sx={{
						fontWeight: '400',
						marginTop: '9px',
						paddingBottom: '10px',
						paddingLeft: '60px',
					}}
				>
					+370 663 56777
				</Typography>
			</a>
			<a
				rel="noopener noreferrer"
				target="_blank"
				href="mailto:info@supirkimas-auto.lt"
				id="btn-1615113012823"
				class="sppb-btn  sppb-btn-link sppb-btn-rounded sppb-btn-flat"
			>
				<FaEnvelope sx={{ bgColor: 'white' }} /> info@pardavimas-auto.lt
			</a>
		</Box>
	);
};

export default MiniNavbar;
