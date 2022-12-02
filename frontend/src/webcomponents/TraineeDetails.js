const TraineeDetails = ({Trainee}) =>{
    return(
        <div className="corpTrainee-details">
            <h4>The information of user: {Trainee.userName}</h4>
            <p><strong>First Name: </strong>{Trainee.firstName}</p>
            <p><strong>Last Name: </strong>{Trainee.lastName}</p>
            <p><strong>Country: </strong>{Trainee.country}</p>
            <p><strong>Phone Number: </strong>{Trainee.phoneNumber}</p>
            <p><strong>address: </strong>{Trainee.address}</p>
        </div>
    )
}


export default TraineeDetails;