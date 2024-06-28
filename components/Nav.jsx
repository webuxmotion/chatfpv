"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <img 
          src="/assets/images/logo.svg"
          alt="Elecu logo"
          width={30}
          height={30}
          className='object-contain' 
        />
        <p className='logo_text'>ELECU</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link 
              href="/create-prompt"
              className='black_btn'
            >
              Create Post
            </Link>

            <button type="button" onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image 
                src="/assets/images/profile.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && 
            Object.values(providers).map(provider => (
              <button
                type="button"
                key={provider.name}
                onClick={(() => signIn(provider.id))}
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav