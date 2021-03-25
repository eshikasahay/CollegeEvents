import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import CreateCollege from '../components/CreateCollege';

const CreateCollPage = () =>
{

    return(
      <div>
        <LoggedInTitle />
        <CreateCollege />
      </div>
    );
};

export default CreateCollPage;