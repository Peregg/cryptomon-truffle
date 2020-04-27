// @flow

import React, { useState, useEffect, useContext } from 'react';

import Input from 'fragments/Input';
import Button from 'fragments/Button';

import wording from 'constants/wording';

import { Store } from 'store';
import { getUserProfile, updateUserProfile } from 'middlewares/userApiMiddleware';

import 'styles/UserEdition.scss';

import {
  STATUS_SUCCESS,
  STATUS_LOADING,
  STATUS_DEFAULT,
} from 'constants/statusConstants';

// $FlowFixMe
import upload from 'images/upload.webp';

const UserEdition = () => {
  const [{ activeAccount, getUserStatus, user, user: { avatar: userAvatar } }, dispatch] = useContext(Store);
  const [nickname, setNickName] = useState(user.nickname);
  const [avatar, setAvatar] = useState(user.avatar);
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
      setAvatar(user.avatar)
      setLoading(false);
    }
  }, [activeAccount, getUserStatus, user.nickname])


  const handleChange = (value: string) => {
    setNickName(value);
  }

  const handleUploadFile = (e: SyntheticInputEvent<EventTarget>) => {
    const reader = new FileReader();

    if (e.target.files.length === 1) {
      const file = e.target.files[0];
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let base64;

      canvas.width = 128;
      canvas.height = 128;
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image = new Image();
        image.src = (reader.result || '').toString();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, 128, 128);
          base64 = canvas.toDataURL();
          setAvatar(base64);
        };
        image.onerror = (error: any) => {
          alert("Votre image n'est pas au bon format !");
        };
      };
    };
  }

  const handleSubmit = () => {
    updateUserProfile({ activeAccount, nickname, avatar }, dispatch);
  }

  if (!loading) {
    return (
      <div className='container'>
        <div className='container'>
          <h2>{wording.your_profile}</h2>
          <div className='avatar-wrapper'>
            <img className='profile-pic' src={avatar || userAvatar} alt={nickname} />
            <span className='upload-overlay'>Changer</span>
            <div className='upload-button'>
            </div>
            <input className='upload-input' type='file' onChange={handleUploadFile}/>
          </div>
          <Input
            id='kjfklskjdk'
            label='Ton pseudo'
            initialValue={nickname}
            handleChange={handleChange}
          />
          <h3>{wording.your_address}</h3>
          <p>{activeAccount}</p>
          <Button
            handleClick={handleSubmit}
          >
            {wording.change_your_infos}
          </Button>
        </div>
      </div>
    );
  }
  return <>Loading...</>
};

export default UserEdition;
