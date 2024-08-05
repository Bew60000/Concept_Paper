function Validation(UserMember) {
    let err ={}
    const email_pattern = /^[\s@]+@[^s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   
    
    if(UserMember.Name === '' ){
        err.Name = "กรุณาใส่ Name"
    }
    else {
        err.Name= ""
    }

    if(UserMember.LastName === '' ){
        err.LastName = "กรุณาใส่ LastName"
    }
    else {
        err.LastName= ""
    }

    
    if(UserMember.Password === '' ){
        err.Password = "กรุณาใส่ Password"
    }
    else {
        err.Password= ""
    }

    
    if(UserMember.Email === '' ){
        err.Email = "กรุณาใส่ Email"
    }
    else {
        err.Email= ""
    }

    
    if(UserMember.Phone === '' ){
        err.Phone = "กรุณาใส่ Phone"
    }
    else {
        err.Phone= ""
    }

    return err;
}

export default Validation;