import { API } from "../backend"


export const getDesignations = () => {
    return fetch(`${API}designation`, { method: 'GET' })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => { console.log(err) })
}

export const getDesignationsById = (id) => {
    return fetch(`${API}designation/${id}`, { method: 'GET' })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err => { console.log(err) })
}

export const addDesignation = (designation) => {
    console.log('ADD', designation);
    return fetch(`${API}designation`, {
        method: 'POST',
        // headers: {
        //     ACCEPT: 'application/json',
        //     'Content-Type': 'application/json',

        // },
        body: JSON.stringify({
            designation_name: designation.designation_name
        })
    })
        .then(response => {
            console.log(response);
        }).catch(err => { console.log(err) })
}


export const deleteDesignation = (id) => {
    console.log('delete', id);
    return fetch(`${API}designation/${id}`, { method: 'DELETE' })
        .then(response => {
            console.log(response);
        }).catch(err => { console.log(err) })
}


export const updateDesignation = (designation_name, id) => {
    console.log('UPDATE', designation_name);
    return fetch(`${API}designation?id=${id}`, {
        method: 'PUT',
        // headers: {
        //     username: 'Ayesha',
        // },
        body: JSON.stringify({
            designation_name
        })
    })
        .then(response => {
            console.log(response);
        }).catch(err => { console.log(err) })
}