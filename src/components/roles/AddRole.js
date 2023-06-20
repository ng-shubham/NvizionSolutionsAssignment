import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../layout/header'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { add } from '../../store/roleSlice'
import { useNavigate } from 'react-router-dom';

function AddRole() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const initialValues = {
        roleLabel: '',
        roleKey: '',
    }

    const validate = values => {
        let errors = {}
        if (!values.roleLabel) {
            errors.roleLabel = 'Role label is required'
        }
        if (!values.roleKey) {
            errors.roleKey = 'Role key is required'
        }
        return errors
    }

    const onSubmit = values => {
        dispatch(add(values))
        navigate("/roles-list");
    }

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    })

    return (
        <>
            <Header />
            <div className='container d-flex justify-content-center align-items-center my-5'>
                <div className='card  w-50 p-3'>
                    <div className='card-body'>
                        <div className='text-start'>
                            <h3>Create New Role</h3>
                            <small>Please fill the form to create new role.</small>
                        </div>
                        <hr />
                        <form className='text-start' onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roleLabel" className="form-label">Role Label</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="roleLabel"
                                    name="roleLabel"
                                    autoComplete='off'
                                    placeholder='Enter role label'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.roleLabel}
                                />
                                {formik.touched.roleLabel && formik.errors.roleLabel ? <small className='text-danger'>{formik.errors.roleLabel}</small> : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roleKey" className="form-label">Role Key</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="roleKey"
                                    name="roleKey"
                                    autoComplete='off'
                                    placeholder='Enter role key'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.roleKey}
                                />
                                {formik.touched.roleKey && formik.errors.roleKey ? <small className='text-danger'>{formik.errors.roleKey}</small> : null}
                            </div>
                            <div className='text-end'>
                                <Link to={'/roles-list'} path="relative" className="btn btn-outline-primary me-3">Cancel</Link>
                                <button type="submit" className="btn btn-primary">Add Role</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddRole