import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../layout/header'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { add, update } from '../../store/userSlice'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

function AddUser() {
    const data = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const roleList = useSelector(state => state.role)

    const initialValues = {
        userName: '',
        userEmail: '',
        userUsername: '',
        userMobile: '',
        userRole: '',
        userPassword: ''
    }

    const validate = values => {
        let errors = {}
        if (!values.userName) {
            errors.userName = 'Name is required'
        }
        if (!values.userEmail) {
            errors.userEmail = 'Email is required'
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.userEmail)) {
            errors.userEmail = 'Invalid email format'
        }
        if (!values.userUsername) {
            errors.userUsername = 'Username is required'
        }
        if (!values.userMobile) {
            errors.userMobile = 'Mobile number is required'
        } else if (!/^[0-9]{10}$/.test(values.userMobile)) {
            errors.userMobile = 'Mobile number should be 10 digit.'
        }
        if (!values.userRole) {
            errors.userRole = 'User role is required'
        }
        if (!values.userPassword) {
            errors.userPassword = 'Password is required'
        }
        return errors
    }

    const onSubmit = values => {
        if (data?.state === null) {
            dispatch(add(values))
            toast.success("New user successfully created!", {
                autoClose: 3000,
            });
        } else {
            dispatch(update(values))
        }
        navigate("/users-list");
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    })

    return (
        <>
            <Header />
            <ToastContainer />
            <div className='container d-flex justify-content-center align-items-center my-5'>
                <div className='card  w-50 p-3'>
                    <div className='card-body'>
                        <div className='text-start'>
                            <h3>{data?.state === null ? 'Create New User' : 'Update User'} </h3>
                            {
                                data?.state === null ? (<small>Please fill the form to create new user.</small>)
                                    :
                                    (<small>Please update the user information.</small>)
                            }
                        </div>
                        <hr />
                        <form className='text-start' onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    name="userName"
                                    autoComplete='off'
                                    placeholder='Enter name'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userName}
                                />
                                {formik.touched.userName && formik.errors.userName ? <small className='text-danger'>{formik.errors.userName}</small> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="userEmail"
                                    name="userEmail"
                                    autoComplete='off'
                                    placeholder='Enter email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userEmail}
                                />
                                {formik.touched.userEmail && formik.errors.userEmail ? <small className='text-danger'>{formik.errors.userEmail}</small> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userUsername" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userUsername"
                                    name="userUsername"
                                    autoComplete='off'
                                    placeholder='Enter username'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userUsername}
                                />
                                {formik.touched.userUsername && formik.errors.userUsername ? <small className='text-danger'>{formik.errors.userUsername}</small> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userMobile" className="form-label">Mobile</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="userMobile"
                                    name="userMobile"
                                    autoComplete='off'
                                    maxLength={10}
                                    placeholder='Enter mobile number'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userMobile}
                                />
                                {formik.touched.userMobile && formik.errors.userMobile ? <small className='text-danger'>{formik.errors.userMobile}</small> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userRole" className="form-label">Roles</label>
                                <select
                                    className="form-select"
                                    id="userRole"
                                    name="userRole"
                                    autoComplete='off'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userRole}
                                >
                                    <option defaultValue>Select role</option>
                                    {
                                        roleList.map((role, index) => (
                                            <option key={index} value={role.roleKey}>{role.roleLabel}</option>
                                        ))
                                    }
                                </select>
                                {roleList.length === 0 ? <small className='text-secondary note'>Please first create user role</small> : ''}<br />
                                {formik.touched.userRole && formik.errors.userRole ? <small className='text-danger'>{formik.errors.userRole}</small> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userPassword" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="userPassword"
                                    name="userPassword"
                                    placeholder='Enter password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.userPassword}
                                />
                                {formik.touched.userPassword && formik.errors.userPassword ? <small className='text-danger'>{formik.errors.userPassword}</small> : null}
                            </div>
                            <div className='text-end'>
                                <Link to={'/users-list'} path="relative" className="btn btn-outline-primary me-3">Cancel</Link>
                                <button type="submit" className="btn btn-primary"> {data?.state === null ? 'Add User' : 'Update User'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddUser