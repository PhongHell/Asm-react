import React, { Component } from 'react'
import {  Modal , Button ,ModalHeader ,ModalBody ,
  Label ,Input ,Col ,Row , Card ,CardImg ,CardText, } from 'reactstrap';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from "./LoadingComponent";

//form validator
const required = (val) => val&&val.length;
const maxLength = (len) =>(val) => !(val)|| (val.length <= len);
const minLength = (len) =>(val) => (val)&& (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

export default class StaffList extends Component{
  constructor(props){
    super(props);
      this.state ={
        isModalOpen : false,
        search : "",
        name: "",
        dob : "",
        startdate : "",
        department: "Sale",
        salaryscale:"",
        annualleave: "",
        overtime : "",
      }
    }
    toggleModal = ()=> {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
    }

    handleSearch = () =>{
      this.setState({
        search : this.search.value,
      })
  //console.log(this.search.value)
    }
    handleInputChange = (event) =>{
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
          [name] : value,
      })
    
  }
 
 handleSubmit = (values) => {

  console.log(values.name, this.state.dob,this.state.startdate, values.departmentId, values.salaryScale, values.annualLeave, values.overTime)
  this.props.postStaff(values.name, this.state.dob, this.state.startdate, values.departmentId, values.salaryScale, values.annualleave, values.overtime)
  this.setState({
    isModalOpen: !this.state.isModalOpen
  });
 };

    
   render(){
   
    const STAFFS = this.props.staffs.filter((staff) =>{
        if(this.state.search ==null ){
          return staff;  
        }
        else if(staff.name.toLowerCase().includes(this.state.search.toLowerCase())){
          return staff;
        }
      })
     .map((staff) => {
      return (
        <Link
          to={`/staff/${staff.id}`}
          className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
          style={{ textDecoration: "none" }}
        >
          <div key={staff.id}>
            <Card
              tag="li"
              className="mt-2 p-1"
            >
              <CardImg src={staff.image}></CardImg>
              <CardText>{staff.name}</CardText>
            </Card>
          </div>
        </Link>
      );
    }
    );
    if(this.props.isLoading){
      return(
        <div className="container">
          <div className="row " >
          <Loading /> 
          </div>     
        </div>   
      );
   }else if(this.props.errMes){
      return(
          <h4>{this.props.errMes}</h4>
      );
   }
  else
    return (
      <div className="container">
        <h1 className="pb-3 text-dark">Danh sách nhân viên</h1>
        <div className="pb-2 text-dark">
          <h4> Bấm vào tên nhân viên để xem thông tin chi tiết.</h4>
        </div>
        <div className="row"  >
        <div className="col-lg-1 col-md-3 m-2">
          <Button
            className="btn btn-primary "
            onClick={this.toggleModal}
          >
            +
          </Button>
          </div>
          <div className="col-lg-5 col-md-4 m-2 text-center">
         <Input type="text"  placeholder="Tìm kiếm theo tên nhân viên" 
            name="search"
            innerRef ={(input) => this.search = input}
           />
           <Button onClick={this.handleSearch} className="m-1" > Tìm kiếm</Button>
           </div>
           </div>
        <div className="bg-light" style={{ 'width' : '300px'}}>
        </div>
        <div className="row"> {STAFFS}</div>
        <Modal isOpen={this.state.isModalOpen} toggle ={this.toggleModal}>
          <ModalHeader  toggle ={this.toggleModal}>
            Thêm nhân viên
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <Row className="mt-2">
                <Label htmlFor="name" md={5}>
                  Tên nhân viên:{" "}
                </Label>
                <Col md={7}>
                  <Control.text model=".name"
                    id="name"
                    name="name"    
                    value={this.state.name} 
                    onChange={this.handleInputChange}
                    validators ={{
                      required ,maxLength : maxLength(15)
                   }  
                   }
                    /> 
                    <Errors 
                            className="text-danger"
                            model=".name"
                            show ="touched"
                            messages ={{
                                required : "",
                                maxLength : "Yêu cầu nhập ít hơn 15 ký tự"   
                            } 
                            }
                            />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="dob" md={5}>
                  Ngày sinh:{" "}
                </Label>
                <Col md={7}>
                  <Control model=".dob"
                    type='date'
                    id="dob"
                    name="dob" 
                    value={this.state.dob}       
                    onChange={this.handleInputChange}     
                    validators ={{
                      required , minLength :minLength(0)
                   }  
                   }
                  />
                 <Errors 
                            className="text-danger"
                            model=".dob"
                            show ="touched"
                            messages ={{
                                required : "yêu cầu nhập ",
                                minLength : "",    
                            } 
                            }
                            />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="startdate" md={5}>
                  Ngày bắt đầu:{" "}
                </Label>
                <Col >
                <Control model=".startdate"
                   type='date'
                    id="startdate"
                    name="startdate"    
                    value={this.state.startdate}       
                    onChange={this.handleInputChange}       
                    validators ={{
                      required , minLength :minLength(0)
                    
                   }  
                   }
                  />
                <Errors 
                      className="text-danger"
                      model=".startdate"
                      show ="touched"
                      messages ={{
                          required : "yêu cầu nhập",
                          minLength : "",    
                      } 
                      }
                      />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="department" md={5}>
                  Phòng ban:{" "}
                </Label>
                <Col md={5}>
                <Control.select
                    model=".departmentId"
                    id="departmentId"
                    name="departmentId"
                    className="form-control"
                    defaultValue="Dept01"
                  >
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>

                  
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="salaryscale" md={5}>
                  Hệ số lương:{" "}
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".salaryscale"
                    id="salaryscale"
                    name="salaryscale" 
                    value={this.state.salaryscale} 
                    onChange={this.handleInputChange}      
                    validators ={{
                      isNumber,               
                   }  
                   }
                  />
               <Errors 
                      className="text-danger"
                      model=".salaryscale"
                      show ="touched"
                      messages ={{
                          requiredVal : " ",                    
                          isNumber : "Yêu cầu nhập số ",                     
                      } 
                      }
                      />
                </Col>
              </Row>
              <Row className="mt-2">
                <Label htmlFor="annualleave" md={5}>
                  Số ngày nghỉ còn lại:{" "}
                </Label>
                <Col md={7}>
                  <Control.text 
                  model = ".annualleave"
                    id="annualleave"
                    name="annualleave"
                    value={this.state.annualleave} 
                    onChange={this.handleInputChange}                  
                    validators ={{
                      required,isNumber
                    }}
                  />
                  <Errors 
                      className="text-danger"
                      model=".annualleave"
                      show ="touched"
                      messages ={{
                          required : "",            
                          isNumber : "yêu cầu nhập số"
                      } 
                      }
                      />
                  
                </Col>
              </Row>
              <Row className="mt-1">
                <Label htmlFor="overtime" md={5}>
                  Số ngày làm thêm:{" "}
                </Label>
                <Col md={7}>
                  <Control.text
                  model=".overtime"
                    id="overtime"
                    name="overtime"
                    value={this.state.overtime} 
                    onChange={this.handleInputChange}                       
                    validators ={{
                      required,isNumber,              
                    }}
                  />
                <Errors
                  className="text-danger"
                  model = ".overtime"
                  show ="touched"
                  messages ={{
                      required : " ",            
                      isNumber : "Yêu cầu nhập sô"
                  } 
                  }
                
                />
                </Col>
              </Row>
              <Row className="mt-1">
                <Col md={{ size: 5, offset: 5 }}>
                  <Button type="submit">Thêm</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
   



