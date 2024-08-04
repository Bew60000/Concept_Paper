function Validation(UserMember) {
    let err ={}
    const email_pattern = /^[\s@]+@[^s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(UserMember.name === '' ){
        err.name = "Pls Enter your name"
    }
    else {
        err.name= ""
    }
}