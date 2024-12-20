import { useEffect, useState } from "react";
import './home.css';
import { Link } from "react-router-dom";

function HomePage() {

  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    let l = localStorage.getItem('loggedUser');
    if (l !== undefined) {
      setLoggedInUser(JSON.parse(l));
    }
  }, []);

  return (
    <div className="content">
      <h1>{`Welcome back ${loggedInUser?.Username},`}</h1>
      <hr />
      <h3>{`Home`}</h3>
      <br />

      <div class="cards">
        <div class="card">
          <div class="container">
            <h4><b>Restaurants</b></h4>
            <p><Link to={{ pathname: `/restaurants` }}>List</Link></p>
            <p><Link to={{ pathname: `/restaurant/add` }}>Add New</Link></p>
          </div>
        </div>
        <div class="card">
          <div class="container">
            <h4><b>Users</b></h4>
            <p><Link to={{ pathname: `/users` }}>List</Link></p>
            <p><Link to={{ pathname: `/user/add` }}>Add New</Link></p>
          </div>
        </div>
      </div>

    </div>
  );
}
export default HomePage;
