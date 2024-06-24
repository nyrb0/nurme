import { FC } from 'react';

interface RadiosCustom {
    options: string[];
    onChange: (value: string) => void;
    selected?: string;
}
const RadioCustom: FC<RadiosCustom> = ({ options, onChange, selected }) => {
    return (
        <div>
            {options.map(op => (
                <label key={op}>
                    <div>
                        <input
                            type='radio'
                            value={op}
                            checked={selected === op}
                            onChange={() => onChange(op)}
                        />
                        {op}
                    </div>
                </label>
            ))}
        </div>
    );
};

export default RadioCustom;
