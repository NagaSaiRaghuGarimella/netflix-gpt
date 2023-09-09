import React, {useState } from 'react'
import {IoMdArrowDropdown,IoMdArrowDropup} from 'react-icons/io';
import {AiOutlineProfile} from 'react-icons/ai';
import {MdTransferWithinAStation} from 'react-icons/md';
import {RiAccountBoxLine} from 'react-icons/ri';
import {BiHelpCircle} from 'react-icons/bi';
import {onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../redux-store/userSlice';

const Header = () => {
  const[show,setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user);

  const handleClickShow = () => {
    setShow(!show);
  }

  const handleSignOut = () =>{

    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });

  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // user sign in 
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid:uid, email: email, displayName:displayName, photoURL:photoURL}))
          navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });
      
},[])



  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="netflixlogo" />
        {user && (<div className='flex items-center'>
          <img src={user.photoURL} alt="usericon" className='w-10 h-10 rounded-lg'/>
          <div onClick={handleClickShow} className='text-3xl m-2 text-white'>
          {!show ? <IoMdArrowDropdown/>:<IoMdArrowDropup/>}
          {
         show && 
          (<div className='w-50 h-60 bg-black bg-opacity-70 cursor-pointer absolute right-10 top-24'>
            <ul className='p-2 text-sm'>
              <li className='flex p-2 hover:underline'><AiOutlineProfile className='mx-2 my-1'/><span>Manage Profile</span></li>
              <li className='flex p-2 hover:underline '><MdTransferWithinAStation className='mx-2 my-1'/><span>Transfer Profile </span></li>
              <li className='flex p-2 hover:underline'><RiAccountBoxLine className='mx-2 my-1'/><span>Account</span></li>
              <li className='flex p-2 hover:underline'><BiHelpCircle className='mx-2 my-1'/><span>Help Center</span></li>
            </ul>
            <p onClick = {handleSignOut} className='text-sm pl-5 hover:underline border-t-2 border-gray-800 pt-4'>Sign Out of Netflix</p>
          </div>)
           }
          </div>
        </div>)}
    </div>
  )
}

export default Header