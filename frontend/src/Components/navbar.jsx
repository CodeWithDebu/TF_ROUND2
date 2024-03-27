import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
import { UserAuth } from "../Context/AuthContext";
import './navbar.css'

const Navbars = () => {
  const { googleSignIn, user, logOut } = UserAuth();
  const [setShowSignOut] = useState(false);


  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className="bg-color-blue">
      <Container>
        <Navbar.Brand>MOODLE</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user?.displayName ? (
            <div className="singin">
              <div className="logou_rect1">
                {/*  */}
                  <img src={user.photoURL} alt={user.displayName} />
                  <h6>{user.displayName}</h6>
                
              </div>
              <div
                className="btn btn-danger"
                onClick={handleSignOut}
              >
                Sign Out
              </div>
            </div>
          ) : (
            <div onClick={handleGoogleSignIn} className="singin">
              <div className="idk">Sign in</div>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars

{/* <div
                  className="logou_rect2"
                  onMouseEnter={() => setShowSignOut(true)}
                  onMouseLeave={() => setShowSignOut(true)}
                > */}