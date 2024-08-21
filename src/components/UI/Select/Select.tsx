import { FC, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import selectS from './Select.module.scss';

interface SelectI {
    option: string[] | number[] | undefined;
    onOptionChange: (value: string | number, type?: string) => void;
    selectedOption: string | number;
    type?: string | undefined;
    onChangeCurrent?: (value: string) => void;
}
const Select: FC<SelectI> = ({
    option,
    onOptionChange,
    selectedOption,
    type,
}) => {
    const [opSee, setOpSee] = useState(false);

    const changeOption = (currentValue: string | number) => {
        if (typeof currentValue === 'string') {
            onOptionChange(currentValue, '');
        } else if (type && typeof currentValue === 'number') {
            onOptionChange(currentValue, type);
        }
        setOpSee(false);
    };

    return (
        <div className={selectS.select} onClick={() => setOpSee(!opSee)}>
            <span>{selectedOption}</span>
            <div className={selectS.arrow}>
                {opSee ? <IoIosArrowUp /> : <IoIosArrowDown size={25} />}
            </div>
            {opSee && (
                <div className={`${selectS.options} `}>
                    {option &&
                        option.map(p => (
                            <div
                                key={p}
                                onClick={() => {
                                    changeOption(p);
                                }}
                                className={selectS.selfOpition}
                            >
                                {p}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Select;
