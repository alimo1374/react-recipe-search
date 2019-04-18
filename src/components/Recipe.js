import React, { Component } from 'react'

export default class Recipe extends Component {
  state={
      show:false
    };
    
  render() {
    
    const{
      image_url,
      title,
      source_url,
      publisher,
      recipe_id,
    }= this.props.recipe;
    const {handleDetails}=this.props;
    return (
     <React.Fragment>
        <div className="col-10 col-md-6 col-lg-4 mx-auto my-3">
          <div  className="card">
            <img src={image_url} 
            alt=""
            className="img-acard-top"
            style={{height:"14rem"}}/>
            <div className="card-body tet-capitalize">
              <h6>{title}</h6>
              <h6 className="text-warning text-slanted">
                Provided by {publisher}
              </h6>
            </div>
            <div className="card-footer">
              <button type="button"
              onClick={()=>handleDetails(0,recipe_id)} className="btn btn-primary text-capitalize">details</button>
              <a target="_blank" href={source_url} className="btn btn-success mx-2 text-capitalize">recipe url</a>
            </div>
          </div>
        </div>
     </React.Fragment>
    )
  }
}
