import { Box } from '@mui/material'
import {Link } from 'react-router-dom'
const Contract = () => {
    return (
        <Box className="contract">
            <h1>Contract</h1>
            <p>“By clicking ACCEPT, you agree on the terms that all the prepared materials and recorded tutorials is owned and copyrighted by the platform and it is prohibited to be used externally or for personal use. The company also holds the right to deduct a clear 15% from the net profit of each video per trainee on the platform. All copyrights are reserved to their respective owners.”</p>
            <Link to="/instructorlobby">
                <h1> Accept</h1>
              </Link>
        </Box>
    )
}
export default Contract