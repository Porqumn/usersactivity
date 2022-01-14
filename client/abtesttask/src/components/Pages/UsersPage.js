import React, {useEffect, useState} from 'react';
import APIService from "../../API/APIService";
import UsersTable from "../UsersTable";
import Loader from "../UI/Loader";

const UsersPage = () => {


    const [infoMessage, setInfoMessage] = useState({isSet: false, message: null, color: null});
    const [users, setUsers] = useState([{id: null, registrationDate: null, lastActivityDate: null}]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);


    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        setIsUsersLoading(true);
        const response = await APIService.getUsers();
        setUsers(response.data);
        setIsUsersLoading(false);
    }


    return (
        <div className="uk-container">
            {
                infoMessage.isSet && !isUsersLoading
                    ? <div className="uk-container uk-margin-small-top"
                           style={{color: infoMessage.color, fontSize: "x-large"}}>{infoMessage.message}</div>
                    : <div></div>
            }
            {isUsersLoading
                ? <Loader/>
                :
                <UsersTable setInfoMessage={setInfoMessage} users={users} setUsers={setUsers}
                            etchUsers={fetchUsers}>
                </UsersTable>
            }
        </div>
    );
}

export default UsersPage;