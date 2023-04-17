import React, { useEffect, useState } from 'react'
import TableList from '../components/TableList'
import { backendFetchGET, } from "../utils/backendFetch"

const AdminModels = () => {
  const [brand,setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  

  

    const getBrands = async () =>{
      backendFetchGET("/getMarka", async (response) =>{
        const data = await response.json();
        setBrands(data);
      
      })
    }
    
 
      const changeMarka = (event) =>{
        const selectedBrand = event.target.value;
        setBrand(selectedBrand);
      }

      useEffect( ()  =>{
        getBrands()
        
       
      },[])

    

         useEffect(() => {
          // URLSearchParams oluşturmak için marka durumunu kullan
          const queryParams = new URLSearchParams({ marka: brand });
          const getModels = async () => {
            backendFetchGET("/getModel?" + queryParams.toString(), async (response) => {
              const data = await response.json()
              setModels(data)
            })
          }
          
          getModels()
        }, [brand]);

  return (
    <div className="table-admin">  
    <select onChange={changeMarka} >
    <option value="" disabled selected>Marka Seçiniz</option>
      {brands.map((brnd,index) =>{ return <option key={index} value={brnd.ad}>{brnd.ad}</option>})}
     
    </select>
    <button className="ekle-admin">ekle</button>
     <table>
      <thead>
           <tr>
             <th>marka</th>
             <th className='islemler-stun' >Islemler</th>
           </tr>
         </thead>
     {models.map((obj,index) =>{
      return(<TableList key = {index} name = {obj.ad}
        />) 
     })}
     </table>
   </div>
  )
}

export default AdminModels