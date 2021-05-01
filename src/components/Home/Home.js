import React from 'react';
import { mainRiders } from '../../data/mainRiders.js';
import Ride from '../Ride/Ride';
const Home = () => {
    const rideArray =mainRiders;
    return (
        <div className="row d-flex mt-5 align-items-center">
            {
                rideArray.map(ride =><Ride key={ride.rideId} ride={ride}></Ride>)
            }
        </div>
    );
};

export default Home;