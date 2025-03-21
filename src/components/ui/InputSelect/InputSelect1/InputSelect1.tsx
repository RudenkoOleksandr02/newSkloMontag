import Modal from '../Modal/Modal';
import React, {FC, useEffect, useState} from 'react';
import classes from './InputSelect1.module.css';
import InputText from "../../InputText/InputText";

interface InputSelectProps {
    title: string;
    value: string;
    onInputChange: (value: string) => void;
    onOptionClick: (option: string) => void;
    options: string[];
    isError?: boolean;
    disabled?: boolean;
}

const InputSelect1: FC<InputSelectProps> = ({
                                               value,
                                               onInputChange,
                                               onOptionClick,
                                               title,
                                               options,
                                               isError = false,
                                               disabled = false
                                           }) => {
    const [showModal, setShowModal] = useState<boolean>(options.length !== 0);
    const [focus, setFocus] = useState<boolean>(false)

    useEffect(() => {
        setShowModal(options.length !== 0);
    }, [options, focus]);

    const handleInputChange = (value: string) => {
        onInputChange(value);
        setShowModal(true);
    };

    const handleOptionMouseDown = (option: string) => {
        onOptionClick(option);
        setShowModal(false);
    };

    const handleBlur = () => {
        setShowModal(false);
        setFocus(false);
    };

    return (
        <div className={classes.wrapper}>
            <InputText
                value={value}
                handleChange={handleInputChange}
                title={title}
                autoComplete={false}
                disabled={disabled}
                handleBlur={handleBlur}
                handleFocus={() => setFocus(true)}
                isError={isError}
                onlyText={false}
            />
            <Modal show={showModal && focus}>
                {options.map((option: string, index: number) => (
                    <div
                        key={index}
                        className={classes.option}
                        onMouseDown={() => handleOptionMouseDown(option)}
                    >
                        {option}
                    </div>
                ))}
            </Modal>
        </div>
    );
};

export default InputSelect1;