import React, { useState, useEffect } from "react";
import { addDesignation } from "./helper/designation"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

const AddDesignation = () => {

    const [values, setValues] = useState({
        designation_name: '',
        // formData: new FormData()
    })

    const history = useHistory();
    const { designation_name } = values;
    // const designation_name = useSelector(state => state.ADD_DESIGNATION.designation_name)
    // const dispatch = useDispatch()

    const onSubmit = event => {
        event.preventDefault();
        console.log('values', values)
        addDesignation({ designation_name }).then(data => {
            history.push('/designations')

            // if (!data) {
            //     // setValues({ ...values });
            // } else {
            //     // dispatch(onSubmit())
            //     setValues({
            //         ...values,
            //         designation_name: ''
            //     });
            //     history.push('/designations')
            // }
        });
    }
    const handleChange = name => event => {
        // formdata.set(name, event.target.value)
        event.preventDefault();
        console.log('target', event.target.value);
        setValues({ ...values, designation_name: event.target.value });
        // dispatch(handleChange(event.target.value))
        console.log('values1', values)
    }
    const createDesignationForm = () => (
        <div className="container">
            <div className="text-center">Add Designation</div>
            <form>
                <div className="form-group">
                    <input
                        onChange={handleChange("name")}
                        name="designation_name"
                        className="form-control"
                        placeholder="Designation Name"
                        value={designation_name}
                    />
                </div>

                <button
                    type="submit"
                    onClick={onSubmit}
                    className="btn btn-outline-success mb-3"
                >
                    Create Designation
                </button>
            </form>
        </div>
    );

    return (
        <div>
            {createDesignationForm()}
        </div>
    )
}

export default AddDesignation;