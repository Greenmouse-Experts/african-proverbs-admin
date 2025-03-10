import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Divider,
  Tooltip,
} from "@material-ui/core";
import ProfileEdit from "./profileEdit";
import UpdatePassword from "./UpdatePassword";
import {
  checkWhoUserIs,
  retrieveEtnicNames,
  checkPermission,
  htmlFilter,
} from "../../utils/utilities";
import { useSelector, useDispatch } from "react-redux";
import { fetchProverbspreview } from "../../store/actions/proverbActions";

const PreviewUser = ({ usersData, updateUserHandler, allowUpdate }) => {
  const classes = useStyles();
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const { result, isLoading, dashboardCount } = useSelector(
    (state) => state.proverb,
  );
  const { user, msg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allowUpdate) {
      if (usersData && result == null) {
        var ethn = retrieveEtnicNames(user.ethnics);
        var nethnics = ethn.toString();
        dispatch(fetchProverbspreview(user.roles, nethnics));
      }
    }
  }, []);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center">
                <div class="avatar-lg mr-3">
                  <img
                    src="/static/assets/images/users/avatar.jpg"
                    class="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div class="media-body overflow-hidden">
                  <Box display="flex" justifyContent="between">
                    <Typography
                      gutterBottom
                      variant="h5"
                      class="my-auto mr-1 text-capitalize"
                    >
                      {usersData.author_profile.first_name}{" "}
                      {usersData.author_profile.last_name}
                    </Typography>
                    {!allowUpdate && (
                      <Tooltip title="Edit" placement="right" arrow>
                        <a
                          onClick={() => setEditProfile(!editProfile)}
                          class=" btn p-0 disabled"
                        >
                          <i class="mdi mdi-pencil text-dark"></i>
                        </a>
                      </Tooltip>
                    )}
                  </Box>
                  <p class="text-muted mb-2 font-13 text-truncate">
                    {usersData.email}
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    {/* <small class="text-danger">
                      <b>Author</b>
                    </small> */}

                    <span class="badge bg-success">Active</span>

                    {!allowUpdate && (
                      <Tooltip title="Update password" placement="right" arrow>
                        <a
                          onClick={() => setEditPassword(!editPassword)}
                          className="btn btn-outline-primary"
                        >
                          Edit password
                          <i class="mdi mdi-pencil ml-2 text-dark"></i>
                        </a>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </Box>
              {/* <Box>
                <Divider />
                <Grid container spacing={2} justify="space-around">
                  <Grid item>
                    <Box
                      display="flex"
                      flexDirection="column"
                      textAlign="center"
                    >
                      <small class="text-secondary">
                        <b>Rating</b>
                      </small>
                      <small class="text-dark">
                        <b>4.5</b>
                      </small>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      display="flex"
                      flexDirection="column"
                      textAlign="center"
                    >
                      <small class="text-secondary">
                        <b>Likes</b>
                      </small>
                      <small class="text-dark">
                        <b>300</b>
                      </small>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      display="flex"
                      flexDirection="column"
                      textAlign="center"
                    >
                      <small class="text-secondary">
                        <b>Proverbs</b>
                      </small>
                      <small class="text-dark">
                        <b>290</b>
                      </small>
                    </Box>
                  </Grid>
                </Grid>
              </Box> */}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                Roles
              </Typography>
              {usersData.roles.map((value) => (
                <Box key={value.id}>
                  <Box display="flex">
                    <Typography class="my-auto">{value.name}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                Ethnic Roles
              </Typography>
              {usersData.ethnics.map((value) => (
                <Box key={value.id}>
                  <Box display="flex">
                    <Typography class="my-auto">{value.name}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                Activities
              </Typography>
              <div id="accordion" class="mb-3">
                {usersData &&
                checkPermission(usersData.roles, "Author") |
                  checkPermission(usersData.roles, "Admin") |
                  checkPermission(usersData.roles, "SuperAdmin") ? (
                  <div class="card mb-1">
                    <div class="card-header" id="headingTwo">
                      <h5 class="m-0">
                        <a
                          class="text-dark"
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="false"
                        >
                          <Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography class="my-auto">
                                Total Created Proverbs
                              </Typography>
                              <Typography variant="h6" class="text-primary">
                                {
                                  usersData.user_created_proverbs
                                    .total_proverbs_created
                                }
                              </Typography>
                            </Box>
                          </Box>
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography class="my-auto">
                              System Accepted Proverbs
                            </Typography>
                            <Typography variant="h6" class="text-primary">
                              {
                                usersData.user_created_proverbs
                                  .system_accepted_proverbs
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  </div>
                ) : null}
                {usersData &&
                checkPermission(usersData.roles, "Publisher") |
                  checkPermission(usersData.roles, "Admin") |
                  checkPermission(usersData.roles, "SuperAdmin") ? (
                  <div class="card mb-1">
                    <div class="card-header" id="headingTwo">
                      <h5 class="m-0">
                        <a
                          class="text-dark"
                          data-toggle="collapse"
                          href="#collapseTwo"
                          aria-expanded="false"
                        >
                          <Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography class="my-auto">
                                Publisher's Proverbs Reviewed
                              </Typography>
                              <Typography variant="h6" class="text-primary">
                                {usersData.user_published_proverbs.total}
                              </Typography>
                            </Box>
                          </Box>
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography class="my-auto">
                              Published Proverbs
                            </Typography>
                            <Typography variant="h6" class="text-primary">
                              {
                                usersData.user_published_proverbs
                                  .published_count
                              }
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography class="my-auto">
                              Proverbs Awaiting Publisher
                            </Typography>
                            <Typography variant="h6" class="text-primary">
                              {
                                usersData.user_published_proverbs
                                  .proverbs_awaiting_publisher
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  </div>
                ) : null}
                {usersData &&
                checkPermission(usersData.roles, "Reviewer") |
                  checkPermission(usersData.roles, "Admin") |
                  checkPermission(usersData.roles, "SuperAdmin") ? (
                  <div class="card mb-1">
                    <div class="card-header" id="headingThree">
                      <h5 class="m-0">
                        <a
                          class="text-dark"
                          data-toggle="collapse"
                          href="#collapseThree"
                          aria-expanded="false"
                        >
                          <Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography class="my-auto">
                                Reviewer's Proverbs Reviewed
                              </Typography>
                              <Typography variant="h6" class="text-primary">
                                {usersData.user_reviewed_proverbs.total}
                              </Typography>
                            </Box>
                          </Box>
                        </a>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      class="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        <Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography class="my-auto">
                              Accepted Proverbs
                            </Typography>
                            <Typography variant="h6" class="text-primary">
                              {usersData.user_reviewed_proverbs.accepted_count}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography class="my-auto">
                              Proverbs Awaiting Reviewer
                            </Typography>
                            <Typography variant="h6" class="text-primary">
                              {
                                usersData.user_reviewed_proverbs
                                  .proverbs_awaiting_review
                              }
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Box display="flex" justifyContent="space-between">
                            <Typography class="my-auto">
                              System Accepted Proverbs
                            </Typography>
                            <Typography variant="h6" class="text-primary">
                              {
                                usersData.user_reviewed_proverbs
                                  .system_accepted_proverbs
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
          {!allowUpdate ? (
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h5">
                  Latest Proverbs
                </Typography>
                {usersData && result ? (
                  <>
                    {result.length > 0 ? (
                      <>
                        {result.slice(-5).map((value) => (
                          <Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography variant="h5" class="my-auto">
                                {value.ethnic && value.ethnic.name}
                              </Typography>
                              <Typography variant="h6" class="text-primary">
                                {value.status}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              class="text-muted text-truncate"
                              component="p"
                            >
                              {htmlFilter(value.content)}
                            </Typography>
                          </Box>
                        ))}
                      </>
                    ) : (
                      checkWhoUserIs(user)
                    )}
                  </>
                ) : (
                  <div class="spinner">Loading...</div>
                )}

                <Box justifyContent="flex-end">
                  <Box>
                    <Link href="/proverbs/view-proverbs">
                      <a>
                        <button
                          type="submit"
                          class="text-primary btn waves-effect waves-light mt-1 p-0 mt-0"
                        >
                          View More
                        </button>
                      </a>
                    </Link>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ) : null}
        </Grid>
        <Grid item sm={12} md={8}>
          {editProfile ? (
            <ProfileEdit
              usersData={usersData}
              closeEditProfile={() => setEditProfile(false)}
            />
          ) : (
            <>
              <Card>
                <CardContent>
                  <Box display="flex" mb={1}>
                    <Typography variant="h5" component="h5">
                      Overview
                    </Typography>
                    {!allowUpdate && (
                      <Tooltip title="Edit" placement="right" arrow>
                        <a
                          onClick={() => setEditProfile(true)}
                          class="ml-1 my-auto btn p-0  disabled"
                        >
                          <i class="mdi mdi-pencil text-dark"></i>
                        </a>
                      </Tooltip>
                    )}
                  </Box>
                  <div>
                    <div class="text-left">
                      <p class="text-muted font-13">
                        <strong>Full Name :</strong>{" "}
                        <span class="ml-2">
                          {usersData.author_profile.first_name}{" "}
                          {usersData.author_profile.last_name}
                        </span>
                      </p>

                      <p class="text-muted font-13">
                        <strong>Mobile :</strong>
                        <span class="ml-2">
                          {usersData.author_profile.phone_number}
                        </span>
                      </p>

                      <p class="text-muted font-13">
                        <strong>Email :</strong>{" "}
                        <span class="ml-2">{usersData.email}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          {editPassword ? (
            <UpdatePassword
              usersData={usersData}
              closeEditPassword={() => setEditPassword(false)}
            />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

PreviewUser.defaultProps = {
  allowUpdate: false,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
    "& .MuiCard-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiDivider-root": {
      margin: theme.spacing(1, 0),
    },
    "& .mdi": {
      fontSize: "15px",
    },
  },
}));

export default PreviewUser;
