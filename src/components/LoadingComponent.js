import React from 'react';

export const Loading = () => {
    return (
        <div className="col-12">
            <span className="fa fa-spinner fa-2x fa-pulse text-warning fa-fw" ></span>
            <p>Loading ...</p>
        </div>
    );
}