import { useEffect } from "react"

export default function modalLoginSuccess({user}){

    return(
            <div className='modalLogin'>
                <div className='contentLogin'>
                    <h1>Welcome to Imerio Gym {user}</h1>
                    <p>You can go to explore the page</p>
            </div>
        </div>
    )
}