import React from 'react';
import { Card } from 'react-bootstrap';

import LoggedInTitle from '../components/LoggedInTitle';
import Events from '../components/Events';
import GoogleMap from '../components/GoogleMap';

const HomePage = () =>
{
    return(
        <div>
            <LoggedInTitle />
            <Events />
            {/* <div className="col text-center">
            <Card className="card-size">
                <Card.Body><GoogleMap /></Card.Body>
            </Card>
            </div> */}
            
        </div>
    );
}

export default HomePage;