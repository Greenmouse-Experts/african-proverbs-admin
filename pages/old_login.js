import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/LoginFooter';
import { useForm } from "react-hook-form";
import { clearMsg, login } from '../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../components/UIElements/Alert';
import { useRouter } from 'next/router'


const Login = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter()
	const { isLoading, msg, user } = useSelector(state => state.auth)

	const { register, handleSubmit, errors } = useForm();

	const onSubmit = (data) => {
		if (data.email !== "" && data.password !== "") {
            dispatch(login(data, router))
        }
    }
    

	useEffect(() => {
		if (msg) {
			setTimeout(() => {
				dispatch(clearMsg())
			}, 2000);
		}

	}, [msg])

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
							 </Typography>

					<form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							size='small'
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							inputRef={register({
								required: true,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: "Enter a valid e-mail address",
								},
							})}
							helperText={errors.email && <span className={classes.error}>{errors.email.message}</span>}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							size='small'
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							helperText={errors.password && <span className={classes.error}>This field is required</span>}
							inputRef={register({ required: true })}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={isLoading ? true : null}
						>
							{
								isLoading ? <CircularProgress color="secondary" /> : 'Sign In'
							}
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='/forget_password' variant="body2">
									Forgot password?
													 </Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Footer />
						</Box>
					</form>
					{msg ? <Alert key={new Date()} payload={msg} /> : null}
				</div>
			</Grid>
		</Grid>
	);
}


const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(/background.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		color: 'red'
	}
}));

export default Login;
