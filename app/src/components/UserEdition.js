// @flow

import React, { useState, useEffect, useContext } from 'react';

import Input from 'fragments/Input';
import Button from 'fragments/Button';
import { Store } from 'store';
import { getUserProfile, updateUserProfile } from 'middlewares/userApiMiddleware';

import 'styles/UserEdition.scss';

import {
  STATUS_SUCCESS,
  STATUS_LOADING,
  STATUS_DEFAULT,
} from 'constants/statusConstants';

const UserEdition = () => {
  const [{ activeAccount, getUserStatus, updateUserStatus, user }, dispatch] = useContext(Store);
  const [nickname, setNickName] = useState(user.nickname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.count('render')
    if (getUserStatus === STATUS_DEFAULT) {
      getUserProfile({ activeAccount }, dispatch);
    }

    if (getUserStatus === STATUS_LOADING) {
      setLoading(true);
    }

    if (getUserStatus === STATUS_SUCCESS) {
      setNickName(user.nickname);
      setLoading(false);
    }
  }, [activeAccount, getUserStatus, user.nickname])


  const handleChange = (value: string) => {
    setNickName(value);
  }

  const handleSubmit = () => {
    updateUserProfile({ activeAccount, nickname }, dispatch);
  }

  if (!loading) {
    return (
      <div className='container'>
        <div className='container'>
          <h2>Ton Profil</h2>
          <h3>Ton adresse Ethereum :</h3>
          <p>{activeAccount}</p>
            <Input
              id='kjfklskjdk'
              label='Ton pseudo'
              initialValue={nickname}
              handleChange={handleChange}
            />
            <Button
              handleClick={handleSubmit}
            >
              Changer mes infos
            </Button>
        </div>
      </div>
    );
  }
  return <>Loading...</>
};

export default UserEdition;
