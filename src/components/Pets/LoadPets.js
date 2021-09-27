import React from 'react';
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { loadPets } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class LoadPets extends React.Component {
  render() {
    const {
      handleSubmit,
      isSubmitting,
      values,
      handleBlur,
      handleChange
    } = this.props;

    const petList =  this.props.pets;

    // Removing Duplicates
    let filteredPetList = [];
    if(petList.length > 0){
        filteredPetList = petList.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
    }
    
    return (
      <div>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-2">
                    <h1>Pet Store</h1>
                    <label >Select Status</label>
                    <select
                        name="status"
                        value={values.color}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    >
                        <option value="">Select</option>
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Submit
                </button>
            </div>    
        </form>

        <table className="table table-striped">
        <thead>
            <tr>
                <th style={{ width: '30%' }}>ID</th>
                <th style={{ width: '30%' }}>Name</th>
                <th style={{ width: '30%' }}>Status</th>
                <th style={{ width: '10%' }}>Action</th>
            </tr>
        </thead>
        <tbody>
            {filteredPetList.length > 1 && filteredPetList.map(pet =>
                <tr key={pet.id}>
                    <td>{pet.id}</td>
                    <td>{pet.name}</td>
                    <td>{pet.status}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <Link to={`/pets/edit/${pet.id}`} className="btn btn-sm btn-warning mr-1">Edit</Link>
                        <Link to={`/pets/delete/${pet.id}`} className="btn btn-sm btn-danger mr-1">Delete</Link>
                    </td>
                </tr>
            )}
        </tbody>
        </table>
      </div>
    )
  }
};

const Form = withFormik({
   handleSubmit(values, {props, setSubmitting}) {
     const {loadPets} = props;
     loadPets(values.status).then(() => {
      setSubmitting(false);
     })
   }
})(LoadPets)

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadPets
}, dispatch);

const mapStateToProps = state => {
 return{
  pets: state.pets
 }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
