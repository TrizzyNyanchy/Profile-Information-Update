import { useEffect, useState } from "react";
import './restaurant.css';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';

function RestaurantAdd() {

    const navigate = useNavigate();


    const [Name, setName] = useState();
    const [PhoneNumber, setPhone] = useState();
    const [Email, setEmail] = useState();
    const [Address, setAddress] = useState();
    const [Description, setDescription] = useState();

    const handleSubmit = () => {
        // here is what the button submit does
        // alert(JSON.stringify({
        //     Name, Phone, Email, Address, Description
        // }));
        saveRestaurantInfo(Name, PhoneNumber, Email, Address, Description);
    };


    const saveRestaurantInfo = (Name, PhoneNumber, Email, Address, Description) => {
        // let now implement api call to our nodejs service (SERVER).
        fetch('http://localhost:3200/restaurant-profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Name, PhoneNumber, Email, Address, Description})
        }).then((response)=>{
            // alert(response.body.json().message);
            if(response.status === 201){
                // if the restaurant was successfully created the redirect the admin to the lis of restaurants
                navigate('/restaurants');
            }
        }).catch(()=>{
            alert('An error has happend. Contact Admin.')
        }).finally(()=>{
            // we stop loading progress bars here

        });
    };

    return (
        <div className="content">
            <h1>Add Restaurant</h1>
            <hr />
            <h3>{`Fill form`}</h3>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" placeholder="Enter name of restaurant" onChange={(e) => setName(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td><input type="phone" placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="email" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td><textarea rows={3} onChange={(e) => setAddress(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td><textarea rows={5} onChange={(e) => setDescription(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><input type="reset" value={`Reset`} /></td>
                            <td><input type="button" value={`Save`} onClick={handleSubmit} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
export default RestaurantAdd;
