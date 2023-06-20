import React from 'react'
import { Routes, Route } from 'react-router-dom';
import RolesList from '../components/roles';
import UserList from '../components/users';
import AddUser from '../components/users/AddUser';
import { Provider } from 'react-redux'
import store from '../store/store';
import AddRole from '../components/roles/AddRole';

function AppRoutes() {
    return (
        <Provider store={store}>
            <Routes>
                <Route exact path='/' element={<UserList />} />
                <Route exact path='/users-list' element={<UserList />} />
                <Route exact path='/roles-list' element={<RolesList />} />
                <Route exact path='/add-user' element={<AddUser />} />
                <Route exact path='/add-role' element={<AddRole />} />
            </Routes>
        </Provider>
    )
}

export default AppRoutes