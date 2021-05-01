import React from 'react';
import './RidesNumber.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
const RidesNumber = (props) => {
    const { fare, imageURL, person, ridesType } = props.ride;
    return (
        <div className="row ride-detail mb-2">
            <div className="col-9">
                <div className="d-flex icon-with-name">
                    <img src={imageURL} className="w-25" alt="" />
                    <p>{ridesType}</p>
                    <p><FontAwesomeIcon icon={faUserFriends} />{person}</p>
                </div>
            </div>
            <div className="col-3">
                <p >${fare}</p>
            </div>
        </div>
    );
};

export default RidesNumber;