'use client'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {FaGoogle} from 'react-icons/fa'
import Button from './Button'

const GoogleSignInButton = ({ setLoading }) => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') ? searchParams.get('callbackUrl') : '/';

  return (
	<Button className='w-full select-none' onClick={() => { setLoading(true); signIn('google', { callbackUrl });}}>
		<FaGoogle className='text-lg me-2' />
		Continue with Google
    </Button>
  )
}

export default GoogleSignInButton
