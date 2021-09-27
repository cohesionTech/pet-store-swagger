import { ErrorMessage, Field, FieldArray, Form, Formik, withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPet, editPet } from '../../actions';

class AddEditPets extends React.Component {
    state = {isError : false};
    componentDidMount() {
        this.props.getPet(this.props.match.params.petId).catch((error)=>{
            //Handling an exception since not all pets have details
            this.setState({isError : true});
        });
    }

    render() {
        const {
            errors,
            touched,
            handleSubmit
        } = this.props
        const pet = this.props.petDetail;
        console.log(pet);
        return (
            <>
            {/* This message will be shown in case of 404 exception */}

            {this.state.isError === true && <h1>Record Not Found</h1>}
            
            <h1>Pet Details</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group col-3">
                    <label>Status</label>
                    
                    <Field name="status" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                        <option value="">Select</option>
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group col-3">
                    <label>Name</label>
                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group col-3">
                    <label>ID</label>
                    <Field name="id" type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                    <ErrorMessage name="id" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group col-3">
                    <label>Category</label>
                    <Field name="category" type="text" className={'form-control' + (errors.category && touched.category ? ' is-invalid' : '')} />
                    <ErrorMessage name="category" component="div" className="invalid-feedback" />
                </div>

                <div className="form-group col-3">
                <label>Tags</label>
                <FieldArray 
                    name='tags'
                    render={({arrayHelpers,insert, remove, push}) => (
            	   <div>         
                        {pet?.tags?.length >=1 && pet.tags.map((pet, index) => (           
                            <div key={index}>       
                                <Field name={`tags.${index}.name`} className="form-control"/>         
                            </div>
                        ))}
                    </div>
            	  )}
            	/>
                </div>

                <div className="form-group col-3">
                <label>Photo Url</label>
                <FieldArray 
                    name='photoUrls'
                    render={({arrayHelpers,insert, remove, push}) => (
            	   <div>         
                        {pet?.photoUrls?.length >=1 && pet.photoUrls.map((url, index) => (           
                            <div key={index}>       
                                <Field name={`photoUrls.${index}`} className="form-control"/>         
                            </div>
                        ))}
                    </div>
            	  )}
            	/>
                </div>
            </div>
            </form>
            </>
        );
    }
};

const TForm = withFormik({
    enableReinitialize : true,
    mapPropsToValues : (props) => ({
        name: props.petDetail.name,
        status: props.petDetail.status,
        id:props.petDetail.id,
        category:props?.petDetail?.category?.name,
        tags: props.petDetail.tags,
        photoUrls: props.petDetail.photoUrls
    }),
    validate: values => {
        const errors = {};
    
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.id) {
            errors.id = 'Required';
        }
        if (!values.category) {
            errors.category = 'Required';
        }
    
        return errors;
      },
 })(AddEditPets)

 const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPet,
    editPet
}, dispatch);

 
 const mapStateToProps = (state) => {
  return{
   petDetail: state.pets
  }
 };

export default connect(
    mapStateToProps, mapDispatchToProps
)(TForm);