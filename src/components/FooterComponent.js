import React from "react";

const Footer = (props) => {
  return (
    <div className="bg-secondary mt-4">
      <div className="container">
        <div className="row row-content">
          <div className="col-12 col-lg-8 col-md-8">
            <h3 className="pt-3">Location Information</h3>
            <h5>Our Address</h5>
            <i>
            <address style={{fontFamily :"serif"}}>
              6789, Quang Trung Road
              <br />
              Building No. 2, lane 15 
              <br />
              Ha Noi
              <br/>
              Viet Nam
            </address>
            </i>
          </div>
          <div className="col-12 col-lg-4 col-md-4">
            <h5 className="pb-2 pt-4">Contact us: </h5>
            <div className="">
              <div className="btn-group" role="group">
                <a role="button" className="btn btn-warning">
                  <i className="fa fa-phone"> Call</i>
                </a>
                <a role="button" className="btn btn-primary">
                  <i className="fa fa-facebook-official">facebook</i> 
                </a>
                <a role="button" className="btn btn-danger" >
                  <i className="fa fa-google-plus"> Email</i>
                </a>
              </div>
            </div>
            <div>
              <i className="fa fa-phone pt-3"></i> : 0123 456 789
              <br />
              <i className="fa fa-facebook"></i> : ahihi.com
              <br />
              <i className="fa fa-envelope"></i> : mail123@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
