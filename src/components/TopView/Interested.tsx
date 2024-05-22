import { FC } from 'react';

interface InterestedI {
    which: string;
}

const Interested: FC<InterestedI> = ({ which }) => {
    return (
        <div>
            {which}

            {/* <img src={} alt="" /> */}
        </div>
    );
};

export default Interested;
