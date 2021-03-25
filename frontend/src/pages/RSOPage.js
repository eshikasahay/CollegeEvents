import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import RSO from '../components/RSO';

const RSOPage = () =>
{
    return(
        <div>
            <LoggedInTitle />   
            <RSO />         
        </div>
    );
}

export default RSOPage;