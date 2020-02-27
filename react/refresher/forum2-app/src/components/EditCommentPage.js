import React from 'react';

const EditCommentPage = (props) => {
    console.log(props);
    return (
        <div>
            This is from my Edit comment page
            Looking to edit item: {props.match.params.id}
        </div>
    );
};

export default EditCommentPage;