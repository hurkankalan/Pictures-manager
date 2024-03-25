import React from "react";
import {PrimaryTextStyle} from "./style";

interface Props {
    placeholder?: string;
    children?: React.ReactNode;
    error?: boolean;
    errorMessage?: string;
    success?: boolean;
    successMessage?: string;
}

export const ManageError: React.FC<Props> = ({error, errorMessage}) => {
    if (error) {
        return <PrimaryTextStyle textColor={'red'}>{errorMessage}</PrimaryTextStyle>;
    }
}

export const ManageSuccess: React.FC<Props> = ({success, successMessage}) => {
    if (success) {
        return <PrimaryTextStyle textColor={'green'}>{successMessage}</PrimaryTextStyle>;
    }
};

export const PrimaryText: React.FC<Props> = () => {
    return (
        <PrimaryTextStyle textColor={'black'}/>
    );
}