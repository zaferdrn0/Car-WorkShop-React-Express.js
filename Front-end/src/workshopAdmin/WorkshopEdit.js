import React, { useState } from "react";
import { backendFetchPOST } from "../utils/backendFetch";

const WorkshopEdit = () => {
  const [addressDescription, setAddressDescription] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [worktimeStart, setWorktimeStart] = useState("");
  const [worktimeEnd, setWorktimeEnd] = useState("");

  const Update = () => {
    backendFetchPOST(
      "/userUpdateWorkshop",
      {
        addressDescription: addressDescription,
        description: description,
        phone: phone,
        worktimeStart: worktimeStart,
        worktimeEnd: worktimeEnd,
      },
      async (response) => {
        const data = await response.json();
        console.log(data);
      }
    );
  };

  return (
    <div>
      <div>
        <h1>Name</h1>
      </div>
      <div>
        <div>
          <h3>Adres Acıklaması</h3>
          <input
            value={addressDescription}
            onChange={(event) => setAddressDescription(event.target.value)}
            placeholder="Adresin kolay olarak bulunması için tarif girin"
          />
        </div>
        <div>
          <h3>acıklama</h3>{" "}
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <h3>telefon</h3>{" "}
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div>
          <h3>calısma saati</h3>{" "}
          <input
            value={worktimeStart}
            onChange={(event) => setWorktimeStart(event.target.value)}
          />
          <input
            value={worktimeEnd}
            onChange={(event) => setWorktimeEnd(event.target.value)}
          />
        </div>
        <div>
          <button onClick={Update}>Guncelle</button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopEdit;
