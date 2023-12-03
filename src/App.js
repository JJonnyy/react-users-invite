import React, {useEffect, useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

//Users: https://reqres.in/api/users

function App() {
    const[users, setUsers] = useState([]);
    const[invites, setInvites] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[success, setSuccess] = useState(false);
    const[searchValue, setSearchValue] = useState('');

    useEffect(()=>{
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => setUsers(json.data))
            .catch(err => {
                console.warn(err);
                alert("Ощибка списка пользователей")
            })
            .finally(() => setIsLoading(false));
    },[])

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    }
    const onClickInvite = (id) => {
        if(invites.includes(id)){
            setInvites((prev) => prev.filter(_id => _id !== id));
        } else{
            setInvites((prev) => [...prev, id]);
        }
    }
    const onClickSendInvites = () =>{
        if(invites.length !== 0){
            setSuccess(true)
        }
    }
    const closeModal = () =>{
        setSuccess(false)
    }

  return (
    <div className="App">
        {
            success ? (
                <Success count={invites.length} closeModal={closeModal}/>
            ): (
                <Users items={users}
                       isLoading={isLoading}
                       searchValue={searchValue}
                       onChangeSearchValue={onChangeSearchValue}
                       onClickInvite={onClickInvite}
                       invites={invites}
                       onClickSendInvites={onClickSendInvites}
                />
            )
        }
    </div>
  );
}

export default App;
