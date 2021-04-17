import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import ViewCollEvents from '../components/ViewCollEvents';

const ViewCollEventsPage = () =>
{
    return(
        <div>
            <LoggedInTitle />   
            <ViewCollEvents />         
        </div>
    );
}

export default ViewCollEventsPage;