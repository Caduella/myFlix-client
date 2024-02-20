import  {useState}  from "react";
import { MovieCard } from "../movie-card/movie-card"
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const ProfileView = ({ user, token, movies, setUser }) => {

    const [username, setUsername] = useState(user.name)
    const [password, setPassword] = useState(user.password)
    const [email, setEmail] = useState(user.email)
    const [birthday, setBirthday] = useState(user.birthday)
    // const userURL = "https://myquickmovieapi.onrender.com/users"

    const favMov = user.FavoriteMovies ? movies.filter((movie) => user.FavoriteMovies.includes(movie._id)) : [];


    const handleUpdate = (event) => {
        event.preventDefault();
    
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        }
        
      fetch(`https://myquickmovieapi.onrender.com/users/${username}`, {   
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then(async (response) => {
      console.log(response)
			if (response.ok) {
        response.json();
        alert('Update successful.')
			} else {
        const e = await response.text()
        console.log(e)
				alert("Update failed.")
			}
		}).then((updatedUser) =>{
      if(updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
      }  
    })

    } 


    const handleDelete = () => {
		fetch(`https://myquickmovieapi.onrender.com/users/${username}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			if (response.ok) {
				setUser(null);
				alert("Your account has been deleted");
			} else {
				alert("something went wrong.")
			}
		})
	}

    return (
<>
<Container>
 
  <Row className="justify-content-center">      
    <Col md={6} >
      <h2 className="profile-title">Update info</h2>
      <Form className="my-profile" onSubmit={handleUpdate}>
        <Form.Group className="mb-2" controlId="formName">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group >
        <Form.Group className="mb-2" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required/>
        </Form.Group>
        <br/>
        <Button 
          variant="success" 
          className="update" 
          type="submit" 
          onClick={handleUpdate}>Update</Button>     
        <Button 
          variant="danger" 
          className="delete"
          onClick={handleDelete}>Delete Account</Button>
      </Form>
    </Col>
  </Row>
</Container>
<Container>
<Row className="justify-content-md-center align-items-center">
    <h2 className="profile-title">Favorite movies</h2>
      {favMov.map((movie) => {
        return (      
          <Col
            key={movie._id}
          className="m-4 justify-content-center align-items-center d-flex"
          >
            <MovieCard
              movie={movie}
              token={token}
              setUser={setUser}
              user={user}
            />
          </Col>
        );
      })}
  </Row>
  </Container>
</>
)
}