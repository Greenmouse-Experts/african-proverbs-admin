import { deleteFaqsFromBackend, fetchFaqs } from '@/store/actions/faqActions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../UIElements/Alert';
import UserNotificationTableData from './UserNotificationData';
import useNotificationService from '../../parts/hooks/useNotificationService';
import { CircularProgress } from '@material-ui/core';


  
const header = [
    { id: 's/n', title: 'S/N' },
    {
        id: 'date_created',
        title: 'Date Created',
    },
    {
        id: 'date_modified',
        title: 'Date Modified',
    },
    {
        id: 'title',
        title: 'Title',
    },
    {
        id: 'body',
        title: 'Body',
    },

    {
        id: 'done_by',
        title: "Creator's Id",
    },
    {
        id: 'is_deleted',
        title: 'Is Deleted',
    },
    ];

const UserNotificationLogTable = () => {

    const { msg } = useSelector((state) => state.auth);
    const {notifications,handleSearch,handleSearchEmail,isLoading} = useNotificationService()

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
            return handleSearchEmail('',payload)
        }
        const payload={
            "startdate": `${datePrevious} 00:00:00`,
            "enddate": `${dateAfter} 00:00:00`
        }
        handleSearch('',payload)
    }

 
    return (
        <div class="content mt-2 col-12">
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
                            <CircularProgress  size={16} color="white" />):null}  <span>Search</span> </button>
                        </div>
            </div>
                    {notifications && notifications.length > 0?
                                <UserNotificationTableData tableHeader={header} title="Notification Log">{
                                     notifications.map((value, index) => {
                                        return (
                                            <tr key={value.id}>
                                                <td>{index +1}</td>
                                                <td>{value['date_created']}</td>
                                                <td>{value['date_modified']}</td>
                                                <td>{value['title']}</td>
                                            
                                               
                                                <td>{value['body']}</td>
                                                <td>{value['done_by']}</td>
                                                <td>{value['is_deleted'] ?'True':'False'} </td>
                                            </tr>)
                                    })}
                                </UserNotificationTableData>: <p>No Notification Log Found</p>}
                            </div>
                    </div>
            </>
        </div>


    )
} 
  
export default UserNotificationLogTable;