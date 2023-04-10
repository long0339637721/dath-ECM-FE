import React from 'react'
import { useEffect, useState } from 'react'

function getTeacher(id) {
    var [classlist, setClasslist] = useState()
    useEffect(() => {
    const fetchData = async() =>{
        fetch('http://localhost:5000/user/' + id)
        .then(resp => resp.json())
        .then(data =>{
            setClasslist(data.user.FullName)
        })
    }
    fetchData()
    }, [])

    return classlist
}

export default getTeacher