import React, {useEffect, useState} from 'react';
import APIService from "../API/APIService";
import {Button, Col, Container, Form, FormControl, Row, Stack, Table} from "react-bootstrap";
import ValidationErrors from "./ValidationErrors";
import {useNavigate} from "react-router";
import {CALCULATE_ROUTE, USER_ADDED, USER_DELETED, USER_EDITED, USER_NOT_FOUND} from "../utils/consts";

const UsersTable = ({setInfoMessage, users, fetchUsers}) => {

    const  navigate = useNavigate();

    const [editMode, setEditMode] = useState({
        status: false,
        rowId: 0
    });

    const [isTheEditingUserValid, setIsTheEditingUserValid] = useState(true);
    const [editableUserValidationErrors, setEditableUserValidationErrors] = useState([]);
    const [editableUser, setEditableUser] = useState({registrationDate: null, lastActivityDate:null});

    const [areTheAddedUsersValid, setAreTheAddedUsersValid] = useState(true);
    const [validationErrors, setValidationErrors] = useState([{failedElementNumber : 0, invalidFields: []}]);
    const [newUsers, setNewUsers] = useState([{id:1, registrationDate: null, lastActivityDate:null}]);
    const [rowsId, setRowsId] = useState(1);

    async function addUsers() {
        const response = await APIService.addUsers(newUsers.map((item => ({
            registrationDate: item.registrationDate,
            lastActivityDate: item.lastActivityDate
        }))))
        if (response.status === 400) {
            setAreTheAddedUsersValid(false);
            setValidationErrors(response.data);
        }
        else if (response.status === 200) {
            setInfoMessage({isSet: true, message: USER_ADDED, color: "green"})
            await fetchUsers()
        }
    }

    const getCountNewUsers = () => {
        return newUsers.length;
    }

    function convertJsonDateToDate (jsonDate){
        let date = new Date(jsonDate);
        return date.toLocaleDateString();
    }

    function addRowToNewUser() {
        setRowsId(rowsId + 1)
        setNewUsers([...newUsers, {id:rowsId + 1, registrationDate: null, lastActivityDate:null}])
    }

    const deleteNewUser = (id) => {
        setNewUsers(newUsers.filter(userRow => userRow.id !== id))
    }

    async function editUser(id) {
        const response = await APIService.editUser(id, {registrationDate: editableUser.registrationDate, lastActivityDate: editableUser.lastActivityDate})
        if (response.status === 400) {
            setIsTheEditingUserValid(false);
            setEditableUserValidationErrors(response.data);
        }
        else if (response.status === 404) {
            setInfoMessage({isSet: true, message: USER_NOT_FOUND, color: "red"})
            await fetchUsers()
        }
        else if (response.status === 200) {
            setInfoMessage({isSet: true, message: USER_EDITED, color: "green"})
            await fetchUsers()
        }
    }

    async function deleteUser(id) {
        const response = await APIService.deleteUser(id)
        if (response.status === 404){
            setInfoMessage({isSet: true, message: USER_NOT_FOUND, color: "red"})
            await fetchUsers()
        }
        else
        {
            setInfoMessage({isSet: true, message: USER_DELETED, color: "green"})
            await fetchUsers()

        }
    }

    function getErrorMessages(id, fieldName ) {
        let errorsForId = validationErrors.find(x => x.failedElementNumber === newUsers.findIndex(x => x.id === id) + 1)
        if (errorsForId === undefined){
            return undefined;
        }

        let errorsForField =  errorsForId.invalidFields.find(x => x.fieldName === fieldName)

        if (errorsForField === undefined){
            return undefined;
        }

        return errorsForField.errorMessages;

    }


    return (
        <Container className="mt-3">
            <Stack  direction="horizontal" gap={3} className="mb-3">
                <Button className="ms-auto" variant="info" onClick={() => {navigate(CALCULATE_ROUTE)}}>Calculate</Button>
                <Button variant="success" onClick={() => {addUsers()}}>Save</Button>
            </Stack>
            <Container>
                <Table striped bordered hover text-center className="justify-content-center">
                    <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Registration Date</th>
                        <th>Last activity date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        newUsers.map((item) => (
                            <tr key={item.id}>
                                <td className="col-1"></td>
                                <td className="col-5">
                                    <Form as={Col} xs={6}>
                                        <FormControl type="date" onChange={evt => {
                                            setNewUsers(newUsers.map(user => user.id === item.id ? {...user, registrationDate: evt.target.value} : user));
                                        }
                                        }/>
                                    </Form>
                                    <div style={ areTheAddedUsersValid === true ? {display: 'none'} : {}}>
                                        <ValidationErrors errorMessages={ getErrorMessages(item.id, "RegistrationDate")}>
                                        </ValidationErrors>
                                    </div>
                                </td>
                                <td className="col-5">
                                    <Stack direction="horizontal" gap={3}>
                                        <Form>
                                            <FormControl type="date" onChange={evt => {
                                                setNewUsers(newUsers.map(user => user.id === item.id ? {...user, lastActivityDate: evt.target.value} : user));
                                            }
                                            }/>
                                        </Form>
                                        <Button key={item.id} onClick={() => addRowToNewUser()}  variant="success">Add row for input new user</Button>
                                        <Button key={item.id} onClick={() => deleteNewUser(item.id)} style={ getCountNewUsers() === 1 ? {display: 'none'} : {}}  variant="danger">Delete</Button>
                                    </Stack>
                                    <div style={ areTheAddedUsersValid === true ? {display: 'none'} : {}}>
                                        <ValidationErrors  errorMessages={ getErrorMessages(item.id, "LastActivityDate")}>
                                        </ValidationErrors>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                    <tbody class="align-middle">
                    {
                        users.map((item) => (
                            <tr key={item.id}>
                                <td className="text-center">{item.id}</td>
                                <td>{
                                    editMode.status && editMode.rowId === item.id ?
                                        <Form as={Col} xs="6">
                                            <FormControl value={editableUser.registrationDate} type="date"
                                                         onChange={evt => {
                                                             setEditableUser({
                                                                 ...editableUser,
                                                                 registrationDate: evt.target.value
                                                             })
                                                         }
                                                         }
                                            />
                                            <div style={isTheEditingUserValid === true ? {display: 'none'} : {}}>
                                                <ValidationErrors
                                                    errorMessages={editableUserValidationErrors.find(e => e.fieldName === "RegistrationDate") === undefined ? undefined : editableUserValidationErrors.find(e => e.fieldName === "RegistrationDate").errorMessages}>
                                                </ValidationErrors>
                                            </div>
                                        </Form>
                                        :  convertJsonDateToDate(item.registrationDate)
                                }
                                </td>
                                <td>
                                    <Row>
                                        <Stack direction="horizontal">
                                            {
                                                editMode.status && editMode.rowId === item.id ?
                                                    <Col xs={4}>
                                                        <Form>
                                                            <FormControl value={editableUser.lastActivityDate} type="date"
                                                                         onChange={evt => {
                                                                             setEditableUser({...editableUser, lastActivityDate: evt.target.value});
                                                                         }
                                                                         }
                                                            />
                                                            <div style={ isTheEditingUserValid === true ? {display: 'none'} : {}}>
                                                                <ValidationErrors  errorMessages={editableUserValidationErrors.find(e => e.fieldName === "LastActivityDate") === undefined ? undefined : editableUserValidationErrors.find(e => e.fieldName === "LastActivityDate").errorMessages}>
                                                                </ValidationErrors>
                                                            </div>
                                                        </Form>
                                                    </Col>
                                                    :<Col>
                                                        <div> {convertJsonDateToDate(item.lastActivityDate)}</div>
                                                    </Col>
                                            }
                                            <div className="ms-auto">
                                                {
                                                    editMode.status && editMode.rowId === item.id ?
                                                        <div className="ms-auto">
                                                            <Button variant="danger" onClick={() => setEditMode({status: false, rowId: null})} className="m-lg-2">Cancel changes</Button>
                                                            <Button variant="success" onClick={() => editUser(item.id)} className="m-lg-2">Save changes</Button>
                                                        </div>
                                                        :
                                                        <div  className="ms-auto">
                                                            <Button variant="warning" onClick={() => {
                                                                setEditMode({status: true, rowId: item.id});
                                                                setEditableUser({registrationDate: null, lastActivityDate:null});
                                                                setIsTheEditingUserValid(true);
                                                            }}
                                                                    className="m-lg-2">Edit</Button>
                                                            <Button variant="danger" onClick={() => {deleteUser(item.id)}} className="m-lg-2">Delete</Button>
                                                        </div>
                                                }
                                            </div>
                                        </Stack>
                                    </Row>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
};

export default UsersTable;