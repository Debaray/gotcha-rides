import React from 'react';
import { Link } from 'react-router-dom';
import './Ride.css';
const Ride = (props) => {
    const { rideName, imageUrl } = props.ride;
    return (
        <div className=" col-sm-12 col-md-6 col-lg-3 card">
            <Link to={"/ride/" + rideName}>

                <img src={imageUrl} className="border img-fluid" alt="..." />
                <div className="card-body">
                    <p className="card-text text-decoration">{rideName}</p>
                </div>

            </Link>
        </div>
    );
};

export default Ride;