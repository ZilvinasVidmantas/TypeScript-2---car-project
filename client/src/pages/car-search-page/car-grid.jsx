import { Card, CardHeader, CardMedia, Grid } from '@mui/material';

import { CarContext } from '../../contexts/car-context';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
// import { Image } from 'mui-image';

const StyledCardLink = styled(Link)({
	textDecoration: 'none',
	color: 'black',
	'& :hover div': {
		opacity: '0.85',
	},
});

const StyledCardMedia = styled(CardMedia)({
	height: '250px',
	// position: 'relative',
	// overflow: 'hidden',
	// ':after': {
	// 	content: '" "',
	// 	display: 'block',
	// 	width: '100%',
	// 	paddingTop: '70%',
	// },
});

const CarGrid = ({ cars }) => {
	console.log(cars);
	return (
		<Grid container spacing={2} sx={{ mb: 2 }}>
			{cars.map(({ id, brand, model, year, price, images }) => {
				return (
					<Grid item key={id} xs={12} sm={6} md={4}>
						<StyledCardLink to={`/car/${id}`}>
							<Card raised>
								<CardHeader
									title={`${brand} - ${model}`}
									subheader={`Metai: ${year} | Kaina: ${price} €`}
									align="center"
									sx={{ pb: 1, fontSize: '2.5vw' }}
								/>
								<StyledCardMedia component="div">
									<img
										src={images[0]}
										alt="car"
										style={{
											objectFit: 'cover',
											width: '100%',
											height: '100%',
										}}
										// duration={1000}
										// fit="fill"
										// style={{
										// 	position: 'absolute',
										// 	width: '100%',
										// 	height: '100%',
										// 	margingTop: '-40px',
										// 	// paddingBottom: '20%' /* = width for a 1:1 aspect ratio */,
										// 	// margin: '1.66%',
										// }}
										// style={{
										// 	height: '100%',
										// 	width: '100%',
										// 	position: 'absolute',
										// 	top: 0,
										// 	left: 0,
										// 	right: 0,
										// }}
									/>
								</StyledCardMedia>
							</Card>
						</StyledCardLink>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default CarGrid;
