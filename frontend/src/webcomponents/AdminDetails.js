const AdminDetails = ({admin}) =>{
    return(
        <div className="admin-details">
            <h4><strong>username: {admin.userName}</strong></h4>
            <p><strong>password: </strong>{admin.password}</p>
           
        </div>
    )
}


export default AdminDetails;