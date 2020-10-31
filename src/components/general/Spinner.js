import React from 'react';
import '../../css/spinner.css'

const Spinner = (props) =>{
    return(
        <div className="center">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
};
export default Spinner