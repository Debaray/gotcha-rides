import React from 'react';
import bike from '../../Images/bike.png';
import car from '../../Images/car.png';
import bus from '../../Images/bus.png';
import train from '../../Images/train.png';
import Ride from '../Ride/Ride';
const Home = () => {
    const rideArray =[{rideId:1,rideName:'bike',imageUrl:bike},
    {rideId:2,rideName:'car',imageUrl:car},
    {rideId:3,rideName:'bus',imageUrl:bus},
    {rideId:4,rideName:'train',imageUrl:train}];
    return (
        <div className="row d-flex mt-5 align-items-center">
            {
                rideArray.map(ride =><Ride key={ride.rideId} ride={ride}></Ride>)
            }
        </div>
    );
};

export default Home;