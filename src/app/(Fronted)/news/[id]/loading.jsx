import NewsDetailsSkeleton from '../../Componets/Card/NewsDetailsSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <NewsDetailsSkeleton />
        </div>
    );
};

export default loading;