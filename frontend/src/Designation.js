import { useState, useEffect } from "react"
import { getDesignations, deleteDesignation } from "./helper/designation"
import { Link } from "react-router-dom";

const Designation = () => {
    const [designations, setDesignation] = useState([])

    const loadDesignation = () => [
        getDesignations().then(data => {
            if (!data) {
                console.log('error');
            }
            else {
                setDesignation(data)
                console.log('des', data);
            }
        })
    ]
    useEffect(() => {
        loadDesignation()
    }, [])

    const deleteThisDesignation = id => {
        deleteDesignation(id).then(data => {
            // if (!data) {
            // console.log(data.error);
            // console.log('error');
            // } else {
            loadDesignation();
            // }
        });
    };


    return (
        <div className="container">
            <div className="text-center title text-success">Designations</div>
            {/* {{ designations }} */}
            <div className="row"> <div className="col-9"></div>
                {/* <div className="float-right"> */}
                <button className="btn btn-primary col-3  text-center ">
                    <Link to="/create/designation" className="nav-link text-dark">
                        Create Designation
                    </Link>
                </button>
                <br />

                {/* </div> */}
            </div>


            {designations.map((designation, index) => {
                return (
                    <div key={index} className="row text-center mb-2 border border-success">
                        <div className="col-10">
                            <h3 className="text-success">{designation.designation_name}</h3>
                        </div>
                        <div className="col-1">
                            <Link
                                className="btn btn-success"
                                to={`/designation/update/${designation.id}`}
                            >
                                <span className="">Update</span>
                            </Link>
                        </div>
                        <div className="col-1">
                            <button
                                onClick={() => {
                                    deleteThisDesignation(designation.id);
                                }}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Designation;