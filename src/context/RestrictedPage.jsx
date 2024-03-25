import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const RestrictedPage = ({children}) => {
    const { user } = UserAuth()
    
    if (!user) {
        return (<Navigate to='/signin' />);
    }
    return children;
};

export default RestrictedPage;