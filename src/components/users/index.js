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
import AddUser from './AddUser';
import { useSelector } from 'react-redux'
import DeleteModal from '../shared/DeleteModal';
import { useDispatch } from 'react-redux'
import { remove } from '../../store/userSlice';
import { ToastContainer, toast } from 'react-toastify';

function UserList() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userList = useSelector(state => state.user)

    const [isUserListPage, setIsUserListPage] = useState(true)
    const [isAddUserPage, setIsAddUserPage] = useState(false)
    const [show, setShow] = useState(false);
    const [recordId, setRecordId] = useState()

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setRecordId(id)
    }

    const addUserHandler = () => {
        setIsUserListPage(!isUserListPage)
        setIsAddUserPage(!isAddUserPage)
        navigate("/add-user");
    }

    const editUserHandler = (data) => {
        navigate("/add-user",
            {
                state: {
                    data
                }
            });
    }

    const deleteUserHandler = () => {
        dispatch(remove(recordId))
        toast.success("User successfully deleted.", {
            autoClose: 3000,
        });
        handleClose()
    }
    return (
        <>
            <Header />
            <ToastContainer />
            {
                isUserListPage && (
                    <Container className='mt-5'>
                        <div className='text-end my-3'>
                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => addUserHandler()}>
                                Add New user
                            </button>
                        </div>
                        {
                            userList?.length === 0 ? <p>No data Available, Please add some users ;)</p> : (
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>S.No</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Username</TableCell>
                                                <TableCell>Mobile</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userList?.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{row.userName}</TableCell>
                                                    <TableCell>{row.userEmail}</TableCell>
                                                    <TableCell>{row.userUsername}</TableCell>
                                                    <TableCell>{row.userMobile}</TableCell>
                                                    <TableCell>{row.userRole}</TableCell>
                                                    <TableCell>
                                                        <button className='btn btn-link' onClick={() => editUserHandler(row)}>
                                                            Edit
                                                        </button>
                                                        <button className='btn btn-link' onClick={() => handleShow(row.userEmail)} >
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
                isAddUserPage && (
                    <AddUser />
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

export default UserList