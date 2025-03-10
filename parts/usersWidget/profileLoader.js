import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const ProfileLoader = () => {
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Skeleton variant="circle">
                  <Avatar />
                </Skeleton>
              </Grid>
              <Grid item xs={8}>
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
                <Skeleton width="100%">
                  <Typography>.</Typography>
                </Skeleton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={9} xs={12}>
        <Card>
          <CardContent>
            <Skeleton width="60%">
              <Typography>.</Typography>
            </Skeleton>
            <Skeleton width="35%">
              <Typography>.</Typography>
            </Skeleton>
            <Skeleton width="100%" height={150}>
              <Typography>.</Typography>
            </Skeleton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileLoader;
