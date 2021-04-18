import React from 'react';

import LoggedInTitle from '../components/LoggedInTitle';
import EditComment from '../components/EditComment';

const EditCommentPage = () =>
{
    return(
        <div>
            <LoggedInTitle />   
            <EditComment />         
        </div>
    );
}

export default EditCommentPage;