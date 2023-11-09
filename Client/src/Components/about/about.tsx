
import React from "react";
import { NavLink } from "react-router-dom";

const AboutMe = () => {

    React.useEffect(() => {
        fetch("http://localhost:5000/express_backend",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            }
        )
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>About Me</h1>
            <p>My name is John Doe and I'm web developer</p>
            <NavLink to="/">Go to Home</NavLink>
        </div>

    )
}


export default AboutMe; 