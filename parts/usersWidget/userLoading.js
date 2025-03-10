import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const UserLoading = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4].map((val) => (
        <Grid item md={3} xs={12} key={val}>
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
      ))}
    </Grid>
  );
};

export default UserLoading;
