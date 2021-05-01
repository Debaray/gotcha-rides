import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { ridesDetailData } from '../../data/rideDetailsData';
import Map from '../Map/Map';
import RidesNumber from '../RidesNumber/RidesNumber';
import './RideDetails.css';

const RideDetails = () => {

    let filteredRideDetails = [];
    const { rideName } = useParams();
    const { register, watch, errors } = useForm();
    const [findRide, setFindRide] = useState(false);
    const [rideDetails, setRideDetails] = useState({
        ride: rideName,
        from: '',
        to: ''
    });
    const [findRideDetails, setFindRideDetails] = useState([]);
    const [filterRiderState,setFilterRiderState] = useState([]);

    useEffect(() => {
        setFindRideDetails(ridesDetailData);
    }, [])

    const handleSubmit = (e) => {
        if (rideDetails.from && rideDetails.to) {

            filteredRideDetails = findRideDetails.filter(r => {
                return r.ridesType === rideDetails.ride && r.from === rideDetails.from && r.to === rideDetails.to;
            }
            );
            setFilterRiderState(filteredRideDetails);
            setFindRide(!findRide);

        }

        e.preventDefault();
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'from') {
            isFieldValid = e.target.value.trim().length > 0;
        }
        if (e.target.name === 'to') {
            isFieldValid = e.target.value.trim().length > 0;
        }
        if (isFieldValid) {
            const newRideDetail = { ...rideDetails };
            if (e.target.name === 'from') {
                newRideDetail.from = e.target.value;
            }
            if (e.target.name === 'to') {
                newRideDetail.to = e.target.value;
            }
            setRideDetails(newRideDetail);
        }
    }
    return (

        <div className="container">
            <div className="row">

                <div className="col-sm-12 col-md-5 col-lg-3 border">
                    {!findRide && < form className="ride-form" onSubmit={handleSubmit} >
                        < input type="text" name="from" onBlur={handleBlur} ref={register({ required: true })} placeholder="From : Mirpur,Shantinagar,Gazipur,Khilgaon" />
                        {errors.from && <span className='error'>From is required</span>}

                        < input name="to" type="text" onBlur={handleBlur} ref={register({ required: true })} placeholder="To : Mirpur,Shantinagar,Gazipur,Khilgaon" />
                        {errors.to && <span className='error'>To is required</span>}
                        <input className="btn btn-primary" type="submit" value="Search" />
                    </form >}
                    {findRide &&

                        < div className="ride-form">
                            <p>From : {rideDetails.from}</p>

                            <p>To : {rideDetails.to}</p>
                            {
                                filterRiderState.map(ride => <RidesNumber key={ride.ridesId}ride={ride}></RidesNumber>)
                            }
                        </div >
                    }
                </div>


                <div className="col-sm-12 col-md-7 col-lg-9 border">
                    <Map></Map>
                </div>
            </div>

        </div>
    );
};

export default RideDetails;