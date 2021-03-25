import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import Colleges from '../components/Colleges';

const CollegePage = () =>
{
    return(
        <div>
            <LoggedInTitle />   
            <Colleges />         
        </div>
    );
}

export default CollegePage;