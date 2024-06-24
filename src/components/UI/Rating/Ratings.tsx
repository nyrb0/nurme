import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { yellow } from '@mui/material/colors';
import { FC, useState } from 'react';
interface RatingI {
    normalizedValue: number;
}
const Ratings: FC<RatingI> = ({ normalizedValue }) => {
    const [value, setValue] = useState<number | null>(normalizedValue);

    return (
        <Box>
            <Rating
                sx={{ color: 'yellow', zIndex: -1 }}
                name='read-only'
                value={value}
                readOnly
                size='large'
                precision={0.5}
            />
        </Box>
    );
};
export default Ratings;
