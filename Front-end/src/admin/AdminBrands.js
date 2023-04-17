import React, { useEffect, useState } from 'react'
import { backendFetchGET } from "../utils/backendFetch"
import TableList from '../components/TableList';

const AdminBrands = () => {
    
    const [brand, setBrand] = useState([]);

    useEffect(() =>{
        const getMarka = async () =>{
          await  backendFetchGET("/getMarka", async (response) =>{
                const data = await response.json();
                setBrand(data);
                console.log(data);
            })
        }
       getMarka();
    },[])

  return (
    <div className="table-admin">  
    <button className="ekle-admin">ekle</button>
     <table>
      <thead>
           <tr>
             <th>Model</th>
             <th>Islemler</th>
           </tr>
         </thead>
     {brand.map((obj,index) =>{
      return(<TableList key = {index} name = {obj.ad}
        />) 
     })}
     </table>
   </div>
  )
}

export default AdminBrands