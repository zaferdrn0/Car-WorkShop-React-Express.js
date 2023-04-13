import React from 'react'
import Header from '../components/Header'
import "./css/Home.css"
import {backendFetchPOST} from "../utils/backendFetch"
import { useNavigate } from "react-router-dom";
import ListCar from '../components/Box';

const Home = () => {
  const navigate = useNavigate();
    const selectMarka = async () =>{

      backendFetchPOST("/reqMarka",{},async (response)  =>{
        const result = await response.json();
        if(result.rota === "marka"){
          navigate("/marka")
        }
        if(result.rota === "login"){
          navigate("/login")
        }
      })
        
      
    }
  return (
    <>
    <div className='home'>
        <Header/>
        <div className='home-section-1'>
            <img src='./images/castrol.jpg' alt=''/>
            <div className='home-car-select'>
                <h2>Aracınıza Servis Bulmakta Zorlanıyor musunuz ?</h2>
               <div className='home-car-link'><a onClick={selectMarka} ><h3>Aracıma Uygun Servis Bulmak İstiyorum..</h3></a></div> 
                
            </div>
        </div>
        
    </div>
    </>
  )
}

export default Home