import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Box,
  Badge,
  Hidden,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Done as DoneIcon,
  DeleteOutline as DeleteOutlineIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
  MoreVert as MoreVertIcom,
} from '@material-ui/icons';
import { Modal, IconButton, Divider } from '../../../UiElements';
import { ProverbForm } from '../widgets';

function Description({ className, title, publish, pending, history }) {
  return (
    <div className={className}>
      <span> {title} </span>
      <Badge className={className.badge} badgeContent={publish} color="primary">
        <DoneIcon />
      </Badge>
      {pending && (
        <Badge badgeContent={pending} color="secondary">
          <HourglassEmptyIcon />
        </Badge>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3, 2),
    '& svg': {
      fontSize: theme.spacing(2),
    },
  },
  submitButton: {
    float: 'right',
  },
  items: {
    padding: theme.spacing(2.7),
  },
  iconFeatures: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      marginLeft: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      order: 1,
      justifyContent: 'flex-start',
    },
  },
  content: {
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
  },
  description: {
    background: theme.palette.background.dark,
    padding: theme.spacing(1.5, 2.4, 1, 0.7),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(0.7),
    fontSize: theme.spacing(1.2),
    '& > *': {
      marginLeft: theme.spacing(1.5),
    },
    badge: {
      background: 'red',
    },
    '& svg': {
      fontSize: '1rem',
    },
  },
}));

const EditProverb = ({
  content,
  submitUpdate,
  deleteProverb,
  history,
  adminRole,
}) => {
  const classes = useStyles();
  const [closeModal, setModal] = useState(false);
  const [moreDetails] = useState(true);

  const UpdateHandler = (data) => {
    setModal(!closeModal);
    submitUpdate(content, { ...data });
  };

  const approveProverbHandler = () => {
    submitUpdate(content, { accepted: !content.accepted  });
  };

  return (
    <Paper className={classes.root}>
      {content && (
        <>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
          >
            <Grid
              item
              className={classes.items}
              xs={12}
              sm={8}
              className={classes.content}
            >
              <Typography variant="h3">
                <Box mb={1}>{content.content}</Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <div className={classes.iconFeatures}>
                {adminRole === 'Author' && (
                  <>
                    <Modal
                      modalTitle="Update Proverb"
                      closeModal={closeModal}
                      IconComponent={EditIcon}
                    >
                      <ProverbForm
                        classes={classes}
                        submit={(data) => UpdateHandler(data)}
                        defaultFiled={content}
                      />
                    </Modal>
                    <IconButton
                      onClick={deleteProverb.bind(this, content.id, history)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </>
                )}
                {content.accepted ? (
                  <IconButton disabled={adminRole === 'Reviewer' ||  adminRole.length > 1 ? false : true}  color="secondary" onClick={approveProverbHandler}>
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <IconButton disabled={adminRole === 'Reviewer' ||  adminRole.length > 1 ? false : true} color="primary" onClick={approveProverbHandler}>
                    <CheckIcon />
                  </IconButton>
                )}
                <IconButton>
                  <MoreVertIcom />
                </IconButton>
              </div>
              <Hidden smUp>
                <Divider />
              </Hidden>
            </Grid>
          </Grid>
          {moreDetails && (
            <>
              <Hidden smDown>
                <Divider />
              </Hidden>
              <Box display="flex" bgcolor="background.paper" flexWrap="wrap">
                <Description
                  className={classes.description}
                  title="Translation"
                  publish={2}
                  pending={1}
                />
                <Description
                  className={classes.description}
                  title="Interpretation"
                  publish={2}
                  pending={1}
                />
                <Description
                  className={classes.description}
                  title="Categories"
                  publish={2}
                />
              </Box>
            </>
          )}
        </>
      )}
    </Paper>
  );
};

export default withRouter(EditProverb);
