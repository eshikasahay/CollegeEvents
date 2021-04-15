import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import CreateRsoEvent from '../components/CreateRsoEvent';

const CreateRsoEventPage = () =>
{

    return(
      <div>
        <LoggedInTitle />
        <CreateRsoEvent />
      </div>
    );
};

export default CreateRsoEventPage;