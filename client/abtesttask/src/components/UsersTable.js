import React, {useEffect, useState} from 'react';
import APIService from "../API/APIService";
import ValidationErrors from "./ValidationErrors";
import {useNavigate} from "react-router";
import {CALCULATE_ROUTE, USER_ADDED, USER_DELETED, USER_EDITED, USER_NOT_FOUND} from "../utils/consts";

const UsersTable = ({setInfoMessage, users, fetchUsers ,setUsers}) => {

    const  navigate = useNavigate();

    const [editMode, setEditMode] = useState({
        status: false,
        rowId: 0,
        field: ""
    });

    const [editableUsersId, setEditableUsersId] = useState([]);
    const [areUsersValid, setAreUsersValid] = useState(true);
    const [validationErrors, setValidationErrors] = useState([{failedElementId : 0, invalidFields: []}]);

    function convertToDate (dateToConvert){
        const date = new Date(dateToConvert);
        const localDate = date.toLocaleDateString();
        if (localDate == "Invalid Date"){
            return "";
        }
        return localDate;
    }

    function getErrorMessages(id, fieldName) {
        let errorsForId = validationErrors.find(x => x.failedElementId === id)
        if (errorsForId === undefined){
            return undefined;
        }

        let errorsForField =  errorsForId.invalidFields.find(x => x.fieldName === fieldName)

        if (errorsForField === undefined){
            return undefined;
        }

        return errorsForField.errorMessages;

    }


    async function editedUsers() {
        const editedUsers = users.filter(u => editableUsersId.includes(u.id));

        const response = await APIService.editUsers(editedUsers);

        if (response.status === 400) {
            setAreUsersValid(false);
            setValidationErrors(response.data);
        }
        else if (response.status === 404) {
            setInfoMessage({isSet: true, message: USER_NOT_FOUND, color: "red"})
            await fetchUsers()
        }
        else if (response.status === 200) {
            setInfoMessage({isSet: true, message: USER_EDITED, color: "green"})
            setValidationErrors([{failedElementId : 0, invalidFields: []}])
            await fetchUsers()
        }
    }

    return (
        <div className="uk-container" onClick={() => setEditMode({status: false, rowId: 0})}>
            <div className="uk-flex uk-align-right uk-margin-top">
                <button className="uk-button-large uk-border-pill uk-button-secondary uk-text-uppercase uk-margin-right" onClick={() => navigate(CALCULATE_ROUTE)}>
                    Calculate
                </button>
                <button className="uk-button-large uk-border-pill uk-button-primary uk-text-uppercase" disabled={editableUsersId.length === 0} onClick={() => editedUsers()}>
                    Save
                </button>
            </div>
            <table class="uk-table uk-table-hover uk-table-divider uk-table-middle">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Registration Date</th>
                        <th>Last activity date</th>
                    </tr>
                </thead>
                <tbody>

                {
                    users.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td className="uk-table-expand" onClick={(e) => {e.stopPropagation(); setEditMode({status: true, rowId: item.id ,field: "RegistrationDate"})}}>
                                {
                                    editMode.status && editMode.rowId == item.id && editMode.field == "RegistrationDate"
                                    ?
                                            <form className="uk-width-1-2">
                                                <input className="uk-input" type="date" value={item.registrationDate.substring(0, 10)} onChange={(e) => {
                                                    setUsers(users.map(user => user.id === item.id ? {...user, registrationDate: e.target.value} : user));
                                                    if (!editableUsersId.includes(item.id)){
                                                        setEditableUsersId([...editableUsersId, item.id])
                                                    }
                                                }}/>
                                            </form>
                                        :
                                        <div>
                                            {convertToDate(item.registrationDate)}
                                        </div>
                                    }
                                <div style={ areUsersValid === true ? {display: 'none'} : {}}>
                                    <ValidationErrors errorMessages={ getErrorMessages(item.id, "RegistrationDate")}>
                                    </ValidationErrors>
                                </div>
                            </td>
                            <td className="uk-table-expand" onClick={(e) => {e.stopPropagation(); setEditMode({status: true, rowId: item.id ,field: "LastActivityDate"})}}>
                                {
                                    editMode.status && editMode.rowId == item.id && editMode.field == "LastActivityDate"
                                        ?
                                            <form className="uk-width-1-2">
                                                <input className="uk-input" type="date" value={item.lastActivityDate.substring(0, 10)} onChange={(e) => {
                                                    setUsers(users.map(user => user.id === item.id ? {...user, lastActivityDate: e.target.value} : user));
                                                    if (!editableUsersId.includes(item.id)){
                                                        setEditableUsersId([...editableUsersId, item.id])
                                                    }
                                                }}/>
                                            </form>
                                        :
                                        <div>
                                            {convertToDate(item.lastActivityDate)}
                                        </div>
                                }
                                <div style={ areUsersValid === true ? {display: 'none'} : {}}>
                                    <ValidationErrors errorMessages={ getErrorMessages(item.id, "LastActivityDate")}>
                                    </ValidationErrors>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
        </div>
    );
};

export default UsersTable;