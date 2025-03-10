import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import withAuth from '@/utils/withAuth';
import { makeStyles } from '@material-ui/core/styles';
import PreviewUser from '@/parts/usersWidget/previewUser';
import ProfileLoading from '@/parts/usersWidget/profileLoader';
import { fetchEachUser } from '@/store/actions/userAction';
import Unauthorized from '@/parts/SubPages/Unauthorized'

const ViewProverb = () => {
    const router = useRouter();
  const { q } = router.query;
  if(q){
  const [userData, setUserData] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isLoading, user_msg, roles } = useSelector(
    (state) => state.Users
  );
  console.log('i am on top');

  useEffect(() => {
    dispatch(fetchEachUser(q));
  }, []);

  return (
    <div class="content">
      <div class="container-fluid">
        {user ? <PreviewUser allowUpdate={true} usersData={user} /> : <ProfileLoading />}
      </div>
    </div>
  );
  }else{
    return (
        <Unauthorized>
            <h1 class="text-error">404</h1>
              <h3 class="mt-3 mb-2">Page not found</h3>
        </Unauthorized>
    )
}
};


const useStyles = makeStyles((theme) => ({
  errorMsg: {
    color: 'red',
    fontSize: 11,
  },
}));

export default withAuth(ViewProverb);
