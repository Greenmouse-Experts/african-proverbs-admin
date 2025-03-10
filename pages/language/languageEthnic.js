import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import withAuth from '@/utils/withAuth'
import {fetchEthnic, createEthnic, deleteEthnic} from '../../store/actions/ethnicAction';
import {useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import FormDialog from '../../components/widgets/Modal';
import DialogContent from '@material-ui/core/DialogContent';
// import EthnicForm from './ethnicForm';
import {fetchLanguageEthnics} from '../../store/actions/languageAction';
import Table from '../../components/UIElements/DataTable'
import Alert from '../../components/UIElements/Alert';
import ReactTooltip from "react-tooltip";
import Link from 'next/link'
import EthnicForm from '../../parts/forms/EthnicForm';
import {checkPermission} from '../../utils/utilities';
import EthnicTable from '../ethnic/ethnicTable'
import LanguageViewProverb from './languageProverbs'


const useStyles = makeStyles({
    detail: {
        borderTop: "4px solid green",
      },
      button: {
          margin: "10px",
      },
  });

const LanguageEthnic = ({selectedEthnics, fromLanguage, closeModaEthnicPagel}) => {
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false); 
    const [openEdit, setOpenEdit] = React.useState(false);
    const [selectedElement, setSelectedElement] = React.useState();
    const { ethnics, isLoadingethnic } = useSelector(state => state.Ethnics);
    const { languageEthnic, languages, isLoadinglanguages } = useSelector(state => state.Languages);
    const { isLoading, msg } = useSelector((state) => state.auth);
    const { user } = useSelector(state => state.auth);
    const [showProverbs, setShowProverbs] = useState(false)
    const [selectedProverbs, setSelectedProverbs] = useState()

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        dispatch(fetchLanguageEthnics(selectedEthnics));
    }, [fetchLanguageEthnics]);

    const openModal = () => {
        setOpen(true);
      };
    
      const openModalEdit = (value) => {
        setOpenEdit(true);
        const editvalue = languageEthnic.find((x) => x.id===value)
        setSelectedElement(editvalue)
      };
    
      const closeModal = () => {
        setOpen(false);
      };

      const closeModalEdit = () => {
        setOpenEdit(false);
      };

      const showProverb =(value)=>{
        setShowProverbs(true)
        setSelectedProverbs(value);
      }

      const closeProverb = ()=>{
        setShowProverbs(false)
      }

    const header = [
        { id: 's/n', title: 'S/N'},
        {
            id: 'name',
            title: 'Name',
        },
        {
            id: 'language',
            title: 'Language',
        },
        {
            id: 'location',
            title: 'Location',
        },
        {
            id: 'proverbs',
            title: 'Proverbs',
        },
        {
            id: 'action',
            title: '',
        },
        ];

    if (open){
        return (
            <EthnicForm close={closeModal}/>
        )
    }

    if (openEdit){
        return (
            <EthnicForm close={closeModalEdit} ethnicEditdata={selectedElement} requestType="Edit"/>
        )
    }

   

    return (
        <div class="content mt-2">
            {languageEthnic===null ? <div class="spinner">Loading...</div>
               
            : 
             <>
             {msg ? <Alert payload={msg} /> : null }
            <div class="container-fluid">
                <div class="col-12">
                    <div class="card-box">
                        <div class="modal-header">
                            {/* <h4 class="modal-title mt-0"><strong>{requestType} Language </strong></h4> */}
                            <button type="button" onClick={closeModaEthnicPagel} class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        {showProverbs ? 
                            <LanguageViewProverb selectedProverbs={selectedProverbs} closeProverb={closeProverb}/>
                            :
                            <div class="row">
                                <div class="col-lg-12">
                                    <a onClick={closeModaEthnicPagel} class='btn btn-primary button-last'><i class="mdi mdi-window-close text-danger"></i></a>
                                </div>
                                <EthnicTable showProverb={showProverb} ethnics={languageEthnic.content} openModalEdit={openModalEdit} fromLanguage={true}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
            </>
            }
        </div>


    )
} 
  
export default LanguageEthnic;