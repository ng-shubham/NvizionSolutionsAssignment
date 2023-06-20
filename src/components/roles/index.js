import React, { useState } from 'react'
import Header from '../layout/header'
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import AddRole from './AddRole';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import DeleteModal from '../shared/DeleteModal';
import { remove } from '../../store/roleSlice';
import { ToastContainer, toast } from 'react-toastify';

function RolesList() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const roleList = useSelector(state => state.role)
    const [isRoleListPage, setIsRoleListPage] = useState(true)
    const [isAddRolePage, setIsAddRolePage] = useState(false)
    const [show, setShow] = useState(false);
    const [recordId, setRecordId] = useState()

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setRecordId(id)
    }

    const addRoleHandler = () => {
        setIsRoleListPage(!isRoleListPage)
        setIsAddRolePage(!isAddRolePage)
        navigate("/add-role");
    }

    const editUserHandler = (data) => {
        navigate("/add-role",
            {
                state: {
                    data
                }
            });
    }

    const deleteUserHandler = () => {
        dispatch(remove(recordId))
        toast.success("Role successfully deleted.", {
            autoClose: 3000,
        });
        handleClose()
    }

    return (
        <>
            <Header />
            <ToastContainer />
            {
                isRoleListPage && (
                    <Container className='mt-5'>
                        <div className='text-end my-3'>
                            <button className='btn btn-primary' onClick={() => addRoleHandler()}>
                                Add New role
                            </button>
                        </div>
                        {
                            roleList?.length === 0 ? <p>No data Available, Please add some roles ;</p> : (
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>S.No</TableCell>
                                                <TableCell>Label</TableCell>
                                                <TableCell>Key</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {roleList?.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{row.roleLabel}</TableCell>
                                                    <TableCell>{row.roleKey}</TableCell>
                                                    <TableCell>
                                                        <button className='btn btn-link' onClick={() => editUserHandler(row)}>
                                                            Edit
                                                        </button>
                                                        <button className='btn btn-link' onClick={() => handleShow(row.roleKey)} >
                                                            Delete
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                        }
                    </Container>
                )
            }
            {
                isAddRolePage && (
                    <AddRole />
                )
            }
            {
                show && (
                    <DeleteModal
                        show={show}
                        handleClose={handleClose}
                        deleteUserHandler={deleteUserHandler}
                    />
                )
            }
        </>
    )
}

export default RolesList