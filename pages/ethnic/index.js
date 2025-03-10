import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withAuth from "@/utils/withAuth";
import {
  fetchEthnic,
  createEthnic,
  deleteEthnic,
} from "../../store/actions/ethnicAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormDialog from "../../components/widgets/Modal";
import DialogContent from "@material-ui/core/DialogContent";
// import EthnicForm from './ethnicForm';
import { fetchLanguages } from "../../store/actions/languageAction";
import Table from "../../components/UIElements/DataTable";
import Alert from "../../components/UIElements/Alert";
import ReactTooltip from "react-tooltip";
import Link from "next/link";
import EthnicForm from "../../parts/forms/EthnicForm";
import { checkPermission } from "../../utils/utilities";
import EthnicTable from "./ethnicTable";

const useStyles = makeStyles({
  detail: {
    borderTop: "4px solid green",
  },
  button: {
    margin: "10px",
  },
});

const Ethnic = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState();
  const { ethnics, isLoadingethnic } = useSelector((state) => state.Ethnics);
  const { isLoading, msg } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    dispatch(fetchEthnic());
  }, [fetchEthnic]);

  const openModal = () => {
    setOpen(true);
  };

  const openModalEdit = (value) => {
    setOpenEdit(true);
    const editvalue = ethnics.find((x) => x.id === value);
    setSelectedElement(editvalue);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeModalEdit = () => {
    setOpenEdit(false);
  };

  const header = [
    { id: "s/n", title: "S/N" },
    {
      id: "name",
      title: "Name",
    },
    {
      id: "language",
      title: "Language",
    },
    {
      id: "location",
      title: "Location",
    },
    {
      id: "proverbs",
      title: "Proverbs",
    },
    {
      id: "action",
      title: "",
    },
  ];

  if (open) {
    return <EthnicForm close={closeModal} />;
  }

  if (openEdit) {
    return (
      <EthnicForm
        close={closeModalEdit}
        ethnicEditdata={selectedElement}
        requestType="Edit"
      />
    );
  }

  return (
    <div class="content mt-2">
      {isLoadingethnic && ethnics === null ? (
        <div class="spinner">Loading...</div>
      ) : (
        <>
          {msg ? <Alert payload={msg} /> : null}
          <div class="container-fluid">
            <div class="col-12">
              <div class="card-box">
                <div class="row">
                  <div class="col-lg-3">
                    <div class="widget">
                      <div class="widget-body">
                        {user &&
                        user.roles &&
                        checkPermission(user.roles, "Author") |
                          checkPermission(user.roles, "Admin") |
                          checkPermission(user.roles, "SuperAdmin") ? (
                          <a
                            href="#"
                            onClick={() => openModal()}
                            class="btn btn-lg btn-success font-16 btn-block waves-effect waves-light"
                          >
                            <i class="fa fa-plus mr-1"></i> Add Ethnic Group
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {user && (
                    <EthnicTable
                      ethnics={ethnics}
                      openModalEdit={openModalEdit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      
    </div>
  );
};

export default withAuth(Ethnic);
