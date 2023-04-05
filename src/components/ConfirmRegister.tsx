import React, {SyntheticEvent, useState} from 'react'
import useAuth from '../hooks/useAuth';
import { useGlobal } from '../providers/GlobalProvider';

const ConfirmRegister : React.FC = () => {
  const [code, setCode] = useState('');
  const { confirmRegister } = useAuth();

  const handleConfirmCode = (e : SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmRegister(code);
  }


  return (
    <div>
      <form onSubmit={handleConfirmCode}>
        <label htmlFor="code">Confirmation code</label>
        <input type="text" name='code' id='code' onChange={(e) => setCode(e.currentTarget.value)} value={code} required/>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  )
}

export default ConfirmRegister