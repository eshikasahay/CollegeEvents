import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import RSOEvents from '../components/RSOEvents';

const RSOEventsPage = () =>
{

    return(
      <div>
        <LoggedInTitle />
        <RSOEvents />
      </div>
    );
};

export default RSOEventsPage;