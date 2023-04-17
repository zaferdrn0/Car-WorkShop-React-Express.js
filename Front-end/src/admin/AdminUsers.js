import React, { useEffect, useState } from "react";
import { backendFetchGET } from "../utils/backendFetch";
import TableList from "../components/TableList";

const AdminUsers = () => {

  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() =>{
    backendFetchGET("/getAdminUser", async (response) =>{
      const data = await response.json();
        setAdminUsers(data);
        
    })
    console.log(adminUsers)
  },[])

  return (
    <div className="table-admin">  
     <button className="ekle-admin">ekle</button>
      <table>
       <thead>
            <tr>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Numara</th>
              <th className='islemler-stun'>Islemler</th>
            </tr>
          </thead>
      {adminUsers.map((obj,index) =>{
       return(<TableList key = {index} username = {obj.username} email = {obj.email} phone = {obj.phone} 
         />) 
      })}
      </table>
    </div>
  );
};

export default AdminUsers;
