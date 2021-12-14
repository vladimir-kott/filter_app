import React, { useState } from "react"
import { paginate } from "../api/utils/paginate"
import Pagination from "./pagination"
import User from "./user"
import GroupList from "./groupList"
import api from "../api"

const Users = ({ users, ...rest }) => {
    const count = users.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState(api.professions.fetchAll())

    const handleProfessionSelect = (params) => {
        console.log(params)
    }

    const handlePageChange = (pageIndex) => {
        /*console.log('pageIndex', pageIndex)*/
        setCurrentPage(pageIndex)
    }
    
    const userCrop = paginate(users, currentPage, pageSize)
    return (
        <>
        <GroupList items = {professions} onItemSelect = {handleProfessionSelect}/>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Провфессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User {...rest} {...user} key = {user._id} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination itemCount={count} pageSize = {pageSize} currentPage = {currentPage} onPageChange = {handlePageChange}/>
        </>
    );
};

export default Users
