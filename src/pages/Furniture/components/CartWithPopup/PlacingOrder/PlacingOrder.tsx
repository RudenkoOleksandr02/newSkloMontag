import React, {FC, useState} from 'react';
import DeliveryData from "./DeliveryData";
import cl from './PlacingOrder.module.css'
import {forFurnitureSendEmail} from "../../../../../utils/email";
import UserData from "./UserData";
import PrimaryButton from "../../../../../components/ui/buttons/PrimaryButton/PrimaryButton";
import {IProduct} from "../../../../../types";

interface PlacingOrderProps {
    cleanCart: () => void;
    products: IProduct[];
    generalPrice: number;
}

const PlacingOrder: FC<PlacingOrderProps> = ({cleanCart, products, generalPrice}) => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [isErrorName, setIsErrorName] = useState<boolean>(false);
    const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [deliveryInfo, setDeliveryInfo] = useState<{ city: string, department: string }>({
        city: "",
        department: ""
    });
    const [isErrorCity, setIsErrorCity] = useState<boolean>(false);
    const [isErrorDepartment, setIsErrorDepartment] = useState<boolean>(false);

    const handleSetDeliveryInfo = (value: string, key: string) => {
        setDeliveryInfo({...deliveryInfo, [key]: value})
    }
    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const changePhoneHandler = (value: string) => {
        setPhone(value);
    }

    const sendEmailHandler = () => {
        const isNameValid = name.length >= 2;
        const isPhoneValid = phone.length === 13;
        const isCityValid = deliveryInfo.city.length !== 0;
        const isDepartmentValid = deliveryInfo.department.length !== 0;

        setIsErrorName(!isNameValid);
        setIsErrorPhone(!isPhoneValid);
        setIsErrorCity(!isCityValid);
        setIsErrorDepartment(!isDepartmentValid);

        if (isNameValid && isPhoneValid && isCityValid && isDepartmentValid) {
            setIsSuccess(true);
            forFurnitureSendEmail(name, phone, products, generalPrice, `${deliveryInfo.city} ${deliveryInfo.department}`);

            const timer = setTimeout(() => {
                setName('');
                setPhone('');
                cleanCart();
            }, 3500)
            return () => clearTimeout(timer);
        }
    };

    return (
        <div className={cl.wrapper}>
            <DeliveryData
                handleSetDeliveryInfo={handleSetDeliveryInfo}
                isErrorDepartment={isErrorDepartment}
                isErrorCity={isErrorCity}
            />
            <UserData
                phone={phone}
                isErrorPhone={isErrorPhone}
                changePhoneHandler={changePhoneHandler}
                changeNameHandler={changeNameHandler}
                isErrorName={isErrorName}
                name={name}
            />
            <div className={cl.button}>
                <PrimaryButton
                    width='100%'
                    height='63px'
                    padding='none'
                    onClick={sendEmailHandler}
                    isSuccess={isSuccess}
                    resetSuccess={() => setIsSuccess(false)}
                >
                    Оформити замовлення
                </PrimaryButton>
            </div>
        </div>
    );
};

export default PlacingOrder;