import { fetchFaqs } from '@/store/actions/faqActions';
import { formatDate } from '@/utils/utilities';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderByDropdown from './DropDown';

const useStyles =makeStyles({
  tableRow:{
    "&:hover":{
      backgroundColor:"#eee !important",
      cursor:"pointer"
    }
  }})

const FAQTable = () => {
     const [showDropdown,setShowDropdow] = useState(false)
     const [selectedRows, setSelectedRows] = useState([]);
     
     
     const dispatch = useDispatch()
     const {faqs} = useSelector((state)=>state.faqs)
     const classes = useStyles()


    useEffect(()=>{
       dispatch(fetchFaqs())
    },[])




    //-----------hanlders-------------
    //row select logic
    const handleRowClick = (event, row) => {
        const selectedIndex = selectedRows.indexOf(row.id);
        let newSelected = [];
        if (selectedIndex === -1) {
          newSelected.push(row.id);
        } else {
          newSelected.splice(selectedIndex, 1);
        }
        setSelectedRows(newSelected);
      };
    const isSelected = (id) => selectedRows.indexOf(id) !== -1;

    //delete popup logic
    const hanldeDeleteButtonClicked =()=>{
      setShowDropdow(!showDropdown)
    }

    return (
          <div class="col-lg-12">
              <div class="mb-2 d-flex  position-relative" >
                <div className='d-flex row align-items-center col-lg-3'>
                    <Link href={`/update-faq/${selectedRows.length>0 && selectedRows[0]}`} className='disabled'>
                    <button type="button"  class={`btn mr-2 btn-${selectedRows.length>0?"primary":"secondary"} btn-sm`} disabled={!(selectedRows.length>0)}>   
                            <>
                            <i className="mdi mdi-border-color"></i>
                                        <span>Update FAQ </span>
                            </>                 
                     </button>
                     </Link>
                    <button  onClick={hanldeDeleteButtonClicked} type="button" style={{position:"relative"}}  class={`btn mr-2 btn-${selectedRows.length>0?"danger":"secondary"} btn-sm`} disabled={!(selectedRows.length>0)}> <i className="mdi mdi-delete-forever"></i>
                                        <span>Delete Faq </span>
                    </button>
                    </div>
                    <OrderByDropdown/>
               </div>
       
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>S/N</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Modified At</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {faqs.map((row,index) => (
                    <TableRow
                      key={row.id}
                      className={classes.tableRow}
                      onClick={(event) => handleRowClick(event, row)}
                      selected={isSelected(row.id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(row.id)}
                          inputProps={{ 'aria-labelledby': `row-${row.id}-checkbox` }}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{formatDate(row["date_created"])}</TableCell>
                      <TableCell>{formatDate(row["date_modified"])}</TableCell>
                      <TableCell>{row.question}</TableCell>
                      <TableCell>{row.answer}</TableCell>
                      <TableCell>{row.faqStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>       


    )
} 


  
export default FAQTable;