import React, { useState } from 'react';


const UserNotificationTableData = ({ children, tableHeader, 
    title}) => {

        const [datePrevious, setDatePrevious] = useState('');
        const [dateAfter, setDateAfter] = useState('');
        const [email,setEmail] = useState('')

        const handleDatePreviousChange = (e) => {
            setDatePrevious(e.target.value);
        };
  
        const handleDateAfterChange = (e) => {
            setDateAfter(e.target.value);
          
        };

        const handleEmailChange=(e)=>{
            setEmail(e.target.value);
        }
  
    return (
        <div className='card-box col-lg-12 mx-auto'>
            <h4 class="mb-2 header-title">{title}</h4>
                        <div class="table-responsive">
                <table class="table table-striped table-bordered nowrap">
                    <thead>
                        <tr>
                            {tableHeader.map((value) => (
                                <th key={value.id}> {value.title} </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserNotificationTableData
