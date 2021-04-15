import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import ApproveEvents from '../components/ApproveEvents';

const ApproveEventsPage = () =>
{
    return(
        <div>
            <LoggedInTitle />   
            <ApproveEvents />         
        </div>
    );
}

export default ApproveEventsPage;