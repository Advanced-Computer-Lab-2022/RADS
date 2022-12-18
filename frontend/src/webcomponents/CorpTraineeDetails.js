const CorpTraineeDetails = ({corpTrainee}) =>{
    return(
        <div className="corpTrainee-details">
            <h4>The information of user: {corpTrainee.userName}</h4>
            <p><strong>First Name: </strong>{corpTrainee.firstName}</p>
            <p><strong>Last Name: </strong>{corpTrainee.lastName}</p>
            <p><strong>Country: </strong>{corpTrainee.country}</p>
            <p><strong>Phone Number: </strong>{corpTrainee.phoneNumber}</p>
            <p><strong>address: </strong>{corpTrainee.address}</p>
            <p><strong>courses: </strong>{corpTrainee.courses}</p>
        </div>
    )
}


export default CorpTraineeDetails;