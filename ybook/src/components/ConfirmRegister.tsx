import React, {SyntheticEvent, useState} from 'react'
import { useAuth } from '../providers/AuthContext';


const ConfirmRegister : React.FC = () => {
  const [code, setCode] = useState('');
  const { currentUser } = useAuth();

  const handleConfirmCode = (e : SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    currentUser?.confirmRegistration(code, true, function(err : any, result:any) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result :' + result);
    });
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