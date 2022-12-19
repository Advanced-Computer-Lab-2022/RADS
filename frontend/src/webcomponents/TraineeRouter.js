import React from 'react'
import { Navigate } from 'react-router-dom'

const TraineeRouter = ({user, children}) =>{
   if(!user.isConnected){
     return <Navigate to="/login" replace/> 
   }else{
      if(user.role !== "TRAINEE"){
        return <Navigate to="/noaccess" replace/> 
      }
   }
   return children
}

export default TraineeRouter