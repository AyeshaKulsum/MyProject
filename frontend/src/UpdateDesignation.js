import React from "react";
import { useHistory } from "react-router-dom";
import { updateDesignation, getDesignationsById } from "./helper/designation"

class UpdateDesignation extends React.Component {
    // ({ match }) => 
    // {

    constructor(props) {
        super(props);
        console.log(props, 'props');
        this.state = {
            designation_name: '',
            designation_id: props.match.params.id
        };
    }

    componentDidMount() {
        console.log('Component Did mount');
        console.log(this.props);
        // this.setState(() => {
        //     designation_id: this.props.params.id
        // })
        this.preload(this.state.designation_id)
    }
    componentDidUpdate() {
        console.log('Component Did update');
    }

    // const[values, setValues] = useState({
    //     designation_name: '',
    // })
    preload = (designation_id) => {
        getDesignationsById(designation_id).then(des => {
            console.log(des, 'des');
            if (!des) {

            }
            else {

                this.setState({
                    designation_name: des.designation_name
                })

                // setValues({
                //     ...values,
                //     designation_name: des.designation_name
                // });
            }
        })
    }

    // useEffect(() => {
    //     preload(match.params.id)
    // }, [])
    onSubmit = event => {
        event.preventDefault();
        console.log(this.state.designation_name, 'this.state.designation_name')
        console.log(this.state.designation_id, 'this.state.designation_id')
        updateDesignation(this.state.designation_name, this.state.designation_id).then(data => {
            this.props.history.push('/designations')
            // if (!data) {
            //     // setValues({ ...values });
            // } else {
            //     // setValues({
            //     //     ...values,
            //     //     designation_name: ''
            //     // });

            //     this.setState({
            //         designation_name: ''
            //     })
            // }
        });
    }
    handleChange = name => event => {
        // event.preventDefault();
        console.log(this.state.designation_name, 'before')
        console.log(name, 'name')
        this.setState({
            designation_name: event.target.value
        })
        // setValues({ ...values,  });
        console.log(this.state.designation_name, 'after')
    }
    updateDesignationForm = () => (
        <div className="container">
            <div className="text-center">Update Designation</div>
            <form>
                <div className="form-group">
                    <input
                        onChange={this.handleChange("name")}
                        name="designation_name"
                        className="form-control"
                        placeholder="Designation Name"
                        value={this.state.designation_name}
                    />
                </div>

                <button
                    type="submit"
                    onClick={this.onSubmit}
                    className="btn btn-outline-success mb-3"
                >
                    Update Designation
                </button>
            </form>
        </div>
    );
    render() {
        return (
            <div>
                {this.updateDesignationForm()}
            </div>
        )
    }

}

export default UpdateDesignation;

// const UpdateDesignation = ({ match }) => {

//     const [values, setValues] = useState({
//         designation_name: '',
//     })
//     const preload = (designation_id) => {
//         getDesignationsById(designation_id).then(des => {
//             if (!des) {

//             }
//             else {
//                 setValues({
//                     ...values,
//                     designation_name: des.designation_name
//                 });
//             }
//         })
//     }
//     const { designation_name } = values;
//     useEffect(() => {
//         preload(match.params.id)
//     }, [])
//     const onSubmit = event => {
//         event.preventDefault();
//         updateDesignation({ designation_name }, match.params.id).then(data => {
//             if (!data) {
//                 // setValues({ ...values });
//             } else {
//                 setValues({
//                     ...values,
//                     designation_name: ''
//                 });
//             }
//         });
//     }
//     const handleChange = name => event => {
//         // event.preventDefault();
//         console.log(values, 'before')
//         console.log(name, 'name')
//         setValues({ ...values, designation_name: event.target.value });
//         console.log(values, 'after')
//     }
//     const updateDesignationForm = () => (
//         <div className="container">
//             <div className="text-center">Update Designation</div>
//             <form>
//                 <div className="form-group">
//                     <input
//                         onChange={handleChange("name")}
//                         name="designation_name"
//                         className="form-control"
//                         placeholder="Designation Name"
//                         value={designation_name}
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     onClick={onSubmit}
//                     className="btn btn-outline-success mb-3"
//                 >
//                     Update Designation
//                 </button>
//             </form>
//         </div>
//     );

//     return (
//         <div>
//             {updateDesignationForm()}
//         </div>
//     )
// }

// export default UpdateDesignation;