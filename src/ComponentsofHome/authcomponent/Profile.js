import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Maincontext, { mycontext } from '../../Maincontext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  pic:{
    backgroundColor: "gold",
  }
  
}));

 function Profile() {
    const {user}=useContext(mycontext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={user.photoURL} className={classes.pic} />
    </div>
  );
}

export default Profile
