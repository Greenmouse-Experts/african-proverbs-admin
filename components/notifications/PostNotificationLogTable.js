import { useSelector } from 'react-redux';
import useNotificationService from '../../parts/hooks/useNotificationService';
import Alert from '../UIElements/Alert';
import PostNotificationTableData from './PostNotificationData';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';


  
const header = [
    { id: 's/n', title: 'S/N' },
    {
        id: 'user_id',
        title: 'User Id',
    },
    {
        id: 'Message Id',
        title: 'Message Id',
    },
    {
        id: 'device_type',
        title: 'Device Type',
    },
    {
        id: 'Response ',
        title: 'response',
    },

    {
        id: 'Status',
        title: "Status",
    },
    {
        id: 'done_by',
        title: "Creator's Id",
    },
    {
        id: 'create_time_stamp',
        title: "Created At",
    },
    ];

const PostNotificationLogTable = () => {
    const { msg } = useSelector((state) => state.auth);
    const {notifications,handleSearch,handleSearchEmail,isLoading} = useNotificationService('post')

   
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

    const handleSearchClicked=(e)=>{


        if(email && datePrevious && dateAfter){
            const payload={
                "email": email,
                "startdate": `${datePrevious} 00:00:00`,
                "enddate": `${dateAfter} 00:00:00`
            }
            return handleSearchEmail('post',payload)
        }
        const payload={
            "startdate": `${datePrevious} 00:00:00`,
            "enddate": `${dateAfter} 00:00:00`
        }
        handleSearch('post',payload)
    }

    return (
        <div class="content mt-2 col-12" >
             <>
             {msg ? <Alert payload={msg} /> : null }    
                    <div className="row col-12">
                   
                  
                    <div className="row mx-auto col-lg-12">
                    <div className='mb-6 row flex col-12' style={{width:"100%"}}>
                <div>
                <label className="col-form-label text-xxl">Start Date</label>
                <input type='date' className="form-control" value={datePrevious} onChange={handleDatePreviousChange}/>
                </div>
                <div>
                <label className="col-form-label text-xxl">End Date</label>
                <input type='date' className="form-control" value={dateAfter} onChange={handleDateAfterChange}/>                
                </div>
                <div>
                <label className="col-form-label text-xxl" >Email</label>
                <input type='email' className="form-control" value={email} onChange={handleEmailChange} placeholder='Enter user email'/>
                </div>   
                <div className="form-group col-md-2 mt-4">
                            <button onClick={handleSearchClicked} disabled={!(dateAfter && datePrevious)}  type='button' className="btn col-md-12 btn-purple waves-effect flex waves-light mr-3">{isLoading ? (
                            <CircularProgress size={16} color="white" />):null}  <span>Search</span> </button>
                        </div>
            </div>
                    {notifications && notifications.length > 0?
                                <PostNotificationTableData tableHeader={header} title="Notification Log">{
                                     notifications.map((value, index) => {
                                        return (
                                            <tr key={value.id}>
                                                <td>{index +1}</td>
                                                <td>{value['user_id']}</td>
                                                <td>{value['message_id']}</td>
                                                <td>{value['device_type']}</td>
                                                <td>{value['response']}</td>
                                                <td>{value['status']}</td>
                                                <td>{value['done_by'] } </td>
                                                <td>{value['create_time_stamp'] } </td>
                                            </tr>)
                                    })}
                                </PostNotificationTableData>: <p>No Notification Log Found</p>}
                            </div>
                    </div>
            </>
        </div>


    )
} 
  
export default PostNotificationLogTable;