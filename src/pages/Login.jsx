import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const { username, password } = formData;

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

	useEffect(() => {
		if(isError) {
			toast.error(message)
		}

		// Redirect when logged in
		if(isSuccess || user) {
			toast.success("Logged in successfully")
			navigate('/')
		}

		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

    const onSubmit = (e) => {
        e.preventDefault()


		const userData = {
			username,
			password
		}

		dispatch(login(userData))
    }

	if(isLoading) {
		return <Spinner />
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please login to add Employees</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='username'
							name='username'
							value={username}
							onChange={onChange}
							placeholder='Enter username'
                            required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter password'
                            required
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default Login
