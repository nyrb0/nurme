import React, { FC } from 'react';
import { IoIosHome } from 'react-icons/io';
import pathS from './ThePath.module.scss';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

type theRoad = {
    toPathBack: string;
    nameToPath: string;
};
interface PathProps {
    path: theRoad[];
}

const ThePath: FC<PathProps> = ({ path }) => {
    return (
        <div className={pathS.thePath}>
            <IoIosHome
                size={37}
                style={{ marginRight: 10 }}
                className={pathS.home}
            />
            {path.map((road, index) => (
                <div className={pathS.links} key={index}>
                    <Link to={road.toPathBack} className={pathS.link}>
                        {road.nameToPath === '/' ? (
                            <span>{road.nameToPath}</span>
                        ) : (
                            road.nameToPath
                        )}
                    </Link>
                    <IoIosArrowForward />
                </div>
            ))}
        </div>
    );
};

export default ThePath;
