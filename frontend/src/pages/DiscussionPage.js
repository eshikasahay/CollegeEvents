import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import Discussion from '../components/Discussion';

const DiscussionPage = () =>
{

    return(
      <div>
        <LoggedInTitle />
        <Discussion />
      </div>
    );
};

export default DiscussionPage;