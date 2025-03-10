import { useEffect, useState } from "react"
import { fetchAllNotifications, searchNotification, searchNotificationwithEmail } from "../../services/notificationLogsService"

const useNotificationService =(notificationType='')=>{


    const [notifications,setNotifications] = useState([])
    const [isLoading,setIsLoading] = useState(false)

useEffect(()=>{
    fetchAllNotifications(notificationType).then(({data})=>{
        let responseData = data
        if(notificationType==='post'){
            responseData=data.data.content
        }else{
            responseData=data.content
        }
        setNotifications(responseData)
    }).catch(error=>{
        console.log(error)
    })
    },[])


    const handleSearch=(notificationType,payload)=>{
        setIsLoading(true)
        searchNotification(notificationType,payload)
        .then(({data})=>{
            let responseData = data
        if(notificationType==='post'){
            responseData=responseData.data
        }else{
           console.log(responseData)
        }
        setNotifications(responseData)}
        ).catch(err=>{
            toast.error("Error happened during filtering")}
         ).finally(()=>{
            setIsLoading(false)
         })
    }
    

    const handleSearchEmail=(notificationType,payload)=>{
        setIsLoading(true)
        searchNotificationwithEmail(notificationType,payload)
        .then(({data})=>{
            let responseData = data
        if(notificationType==='post'){
            responseData=responseData.data
        }else{
            console.log(responseData)
        }
        setNotifications(responseData)}
        ).catch(err=>{
            console.log("ERROR",err)
            toast.error("Error happened during filtering")}
         ).finally(()=>{
            setIsLoading(false)
         })
    }

    return {notifications,isLoading,handleSearch,handleSearchEmail}
}





export default useNotificationService