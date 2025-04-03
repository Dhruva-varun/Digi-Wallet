import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    return <div>{children}</div>;
}

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default PublicRoute;
