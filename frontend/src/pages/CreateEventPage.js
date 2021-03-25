import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import CreateEvent from '../components/CreateEvent';

const CreateEventPage = () =>
{

    return(
      <div>
        <LoggedInTitle />
        <CreateEvent />
      </div>
    );
};

export default CreateEventPage;