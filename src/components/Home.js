import React from "react"
import Button from 'react-bootstrap/Button';
const Home = () => {
    return(
        <div>
            <Button variant="outline-success" href="/Users">Users</Button>{' '}
            <Button variant="outline-success" href="/Productos">Productos</Button>{' '}
            
        </div>
    )
}
export default Home