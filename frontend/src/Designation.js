import { useState, useEffect } from "react"
import { getDesignations, deleteDesignation } from "./helper/designation"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDesignationsFromServer } from "./redux/actions/actionCreator";
import ACTIONS from "./redux/actions/actionsList";

import { BiEditAlt, BiPlusCircle } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
const Designation = () => {
    // const [designations, setDesignation] = useState([])
    const dispatch = useDispatch();
    const designations = useSelector(state => state.designations);
    // console.log("Designations from Store", storeDesignation)

    const loadDesignation = () => [

        getDesignations().then(data => {
            if (!data) {
                console.log('error');
            }
            else {
                setDesignation(data)
                dispatch({
                    type: ACTIONS.FETCH_DESIGNATION,
                    payload: data
                });
                console.log('des', data);
            }
        })
    ]
    useEffect(() => {
        dispatch(fetchDesignationsFromServer())
    }, [])

    const deleteThisDesignation = id => {
        deleteDesignation(id).then(data => {
            // if (!data) {
            // console.log(data.error);
            // console.log('error');
            // } else {
            // loadDesignation();
            // }
            dispatch(fetchDesignationsFromServer())
        });
    };


    return (
        <div className="container">
            <h2 className="text-center title text-bold">Designations</h2>
            <div className="row"> <div className="col-9"></div>
                {/* <button className="btn btn-primary col-3  text-center "> */}
                <Link to="/create/designation" className="nav-link text-dark">
                    <BiPlusCircle />
                </Link>

                {/* </button> */}
                <br />
            </div>


            {/* <div key={designation.designation_id} className="card text-white bg-dark border border-info">
                        <div className="card-header lead">Designation</div>
                        <div className="card-body">
                            <h3 className="text-success">{designation.designation_name}</h3>
                            <Link
                                className="btn btn-success"
                                to={`/designation/update/${designation.id}`}
                            >
                                <span className="">Update</span>
                            </Link>
                            <button
                                onClick={() => {
                                    deleteThisDesignation(designation.id);
                                }}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                        );
            })}
                    </div>
                )
            } */}

            <div className="row">
                {designations.map((designation) => {
                    return (
                        <div key={designation.designation_id} className="card col-3 mx-4 my-1 text-white bg-dark border border-info">
                            {/* <div className="card-header lead ">Designation</div> */}
                            <div className="card-body">
                                <h3 className="text-white text-center">{designation.designation_name}</h3>
                            </div>
                            {/* <AiTwotoneEdit></AiTwotoneEdit> */}



                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Link className="text-white"

                                    to={`/designation/update/${designation.id}`}
                                >
                                    <span style={{ width: '40px' }}> <BiEditAlt /></span>
                                </Link>
                                <Link className="text-white"> <AiFillDelete onClick={() => {
                                    deleteThisDesignation(designation.id);
                                }}></AiFillDelete></Link>
                            </div>

                            {/* <button

                                className="btn btn-danger"
                            >

                            </button> */}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default Designation;