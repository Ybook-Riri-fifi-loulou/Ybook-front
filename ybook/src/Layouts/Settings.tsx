import React, { SyntheticEvent, useState } from 'react'
import useProfil from '../hooks/useProfil';
import { useGlobal } from '../providers/GlobalProvider';

const Settings = () => {
  const {updateProfilInfos} = useProfil();
  const {userInfo} = useGlobal();
  const [firstname, setFirstname] = useState(userInfo!.firstname);
  const [lastname, setLastname] = useState(userInfo!.lastname);

  const handleForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfilInfos(firstname, lastname);
  }

  return (
    <div className='settings'>
      <div className="container">
        <h1 className='settings-title section-title'>Paramètres</h1>
        <p>Modifier vos informations :</p>
        <form onSubmit={handleForm}>
          <div className='mb-3'>
            <label htmlFor="exampleFormControlInput1" className="form-label">Nom de famille</label>
            <input type="text" className="form-control w-25" name="lastname" id="lastname" value={lastname} onChange={(e) => setLastname(e.currentTarget.value)} />
          </div>
          <div className='mb-3'>
            <label htmlFor="exampleFormControlInput1" className="form-label">Prénom</label>
            <input type="text" className="form-control w-25" id="firstname" name='firstname' value={firstname} onChange={(e) => setFirstname(e.currentTarget.value)} />
          </div>
          <div className="mb-3">
            <button type='submit' className='btn btn-primary'>Modifier</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings