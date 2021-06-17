// 登録してその後ログインされる
import React, { FC, useState, useCallback } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useHistory, useLocation } from 'react-router-dom';
import Register from '../../components/pages/Register';
import { useRegister } from '../../hooks/auth';
import { Provider } from '../../types/OAuth';

type Inputs = {
    name: string
    age: number
    email: string
    password: string
}

const EnhancedRegister: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/' },
    };
    const { error, isLoading, mutate: registration } = useRegister();
    console.log(error?.response?.data.errors.name)
    const statusCode = error?.response?.status;
    const onSubmit = async (data: Inputs): Promise<void> => {
        const { name, age, email, password } = data;
        if (
            !name ||
            !email ||
            !password ||
            !age
        ) {
            // 空の場合はPOSTしない
            return;
        }
        registration(
            { name, age, email, password },
            {
                onSuccess: () => {
                    history.replace(from);
                }
            }
        )
    }

    return (
        <Register
            error={error}
            isLoading={isLoading}
            statusCode={statusCode}
            onSubmit={onSubmit}
        />
    )
};

export default EnhancedRegister;
