import { Alert } from "@/components/UIElements";
import { deleteFaqsFromBackend } from "@/store/actions/faqActions";
import { useDispatch, useSelector } from "react-redux";

const DeletePopup=({faqId,toggleDropdown})=>{
    const dispatch = useDispatch()
    const { _, msg } = useSelector(state => state.auth);


    const handleDeleteItem = () =>{
        dispatch(deleteFaqsFromBackend(faqId))
        toggleDropdown()
    }

  return <div className="position-absolute flex right-1 card p-2 " style={{width:"200px",position:'absolute',backgroundColor:"#fff",zIndex:"10000",height:"100px",border:"1px solid #ddd",display:"flex",position:"absolute",top:"120%",right:"-150%"}}>
     {msg ? <Alert payload={msg} /> : null}
    <button onClick={handleDeleteItem} className="btn  btn-outline-danger btn-sm">Yes</button>
    <button onClick={()=> toggleDropdown()} className=" btn mt-2 btn-outline-success btn-sm">No</button>
  </div>

}


export default DeletePopup