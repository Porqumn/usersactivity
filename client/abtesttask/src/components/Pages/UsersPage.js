import React, { useEffect, useState} from 'react';
import APIService from "../../API/APIService";
import {Table, Button, Form, Col, Container, Row, Stack, FormControl} from "react-bootstrap";
import ValidationErrors from "../ValidationErrors";
import {useLocation, useNavigate} from "react-router";
import {CALCULATE_ROUTE, TABLE_ROUTE} from "../../utils/consts";
import {color} from "chart.js/helpers";
import UsersTable from "../UsersTable";
import Loader from "../UI/Loader";

const UsersPage = () => {

   const [infoMessage, setInfoMessage] = useState({isSet:false, message: null, color:null});
   const [users, setUsers] = useState([{id:null,registrationDate: null,lastActivityDate:null}]);
   const [isUsersLoading, setIsUsersLoading] = useState(false);


    useEffect(() => {
        fetchUsers()
    },[])

    async function fetchUsers() {
        setIsUsersLoading(true);
        const response = await APIService.getAll();
        setUsers(response.data);
        setIsUsersLoading(false);
    }


    return (
        <Container>
            {
                infoMessage.isSet && !isUsersLoading
                    ? <p className="mt-3 pl-3" style={{color: infoMessage.color, fontSize: "x-large"}}>{infoMessage.message}</p>
                    :<div></div>
            }
            {isUsersLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div> :
                <UsersTable infoMessage={infoMessage} setInfoMessage={setInfoMessage} users={users}
                            fetchUsers={fetchUsers}>
                </UsersTable>
            }
        </Container>
    );
}

export default UsersPage;