import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import Map from '../Map/Map';
import './RideDetails.css';
const RideDetails = () => {
    const { rideName } = useParams();
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-3 border">
                    < form className="ride-form" onSubmit={handleSubmit(onSubmit)} >
                        < input name="from" ref={register({ required: true })} placeholder="From" />
                        {errors.from && <span className='error'>From is required</span>}

                        < input name="to" ref={register({ required: true })} placeholder="To" />
                        {errors.to && <span className='error'>To is required</span>}
                        <input className="btn btn-primary" type="submit" value="Search"/>
                    </form >
                </div>
                <div className="col-sm-12 col-md-7 col-lg-9 border">
                    <Map></Map>
                </div>
            </div>

        </div>
    );
};

export default RideDetails;