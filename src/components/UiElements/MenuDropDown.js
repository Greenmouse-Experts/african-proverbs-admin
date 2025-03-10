import React from "react";
import Proptypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemText } from "@material-ui/core";
import { ExpandMore as ArrowDropDownIcon } from "@material-ui/icons";
import Button from "./Button";
import Modal from './Modal'

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: "8rem",
    "& .MuiList-padding ": {
      padding: "0 !important",
    },
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    textTransform: "capitalize",
    textAlign: 'center',
    borderBottom: "1px solid #3f51b50a",
    "&:focus": {
      // backgroundColor: "grey",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root": {
      padding: theme.spacing(1),
      borderRadius: "0",
      boxShadow: "none",
      background: theme.palette.background.dark,
      // color: "#444",
      // borderColor: "#ddd",
      "& span": {
        color: "#000000c4 !important",
        fontSize: "14px !important",
      },
    },
    icon: {
      marginleft: theme.spacing(1),
    },
  },
}));

const CustomizedMenus = ({
  previewHandler,
  publishHandler,
  deleteHandler,
  acceptedHander,
  showPublish,
  showAccepted,
  menuTitle,
  publish,
  accepted,
  adminRole,
  // modal properties
  children,
  closeModal
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePreview = (index) => {
    setAnchorEl(null);
    if (index === 0) return previewHandler();
    deleteHandler();
  };

  const handlePublish = () => {
    setAnchorEl(null);
    publishHandler();
  };

  const acceptProverbHandler = () => {
    setAnchorEl(null)
    acceptedHander()
  }
  return (
    <div className={classes.root}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        size="small"
        variant="contained"
        color="default"
        onClick={handleClick}
      >
        Action
        <ArrowDropDownIcon className={classes.icon} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuTitle &&
          menuTitle.map((data, index) => (
            <StyledMenuItem key={data.id}>
              {data.modal? (
                <ListItemText 
                onClick={() => handleClose(index)}>
                <Modal modalTitle={data.modalTitle} closeModal={closeModal}>
                  {children}
                </Modal>
                </ListItemText>
              ) : 
              (<ListItemText
                onClick={() => handlePreview(index)}
                secondary={data.title}
              />)
            }
            </StyledMenuItem>
          ))}
        {showPublish && (adminRole.roles[0] === 'Publisher' || adminRole.roles.length > 1) && (
          <StyledMenuItem>
            <ListItemText
              onClick={handlePublish}
              secondary={publish ? "unpublish" : "publish"}
            />
          </StyledMenuItem>
        )}
        {showAccepted && (adminRole.roles[0] === 'Reviewer' || adminRole.roles.length > 1)  && (
          <StyledMenuItem>
            <ListItemText
              onClick={acceptProverbHandler}
              secondary={accepted ? "Reject" : "Accept"}
            />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </div>
  );
};

CustomizedMenus.defaultProps = {
  showPublish: false,
  showAccepted: false,
};

CustomizedMenus.proptype = {
  menuTitle: Proptypes.object.isRequired,
};

export default CustomizedMenus;
