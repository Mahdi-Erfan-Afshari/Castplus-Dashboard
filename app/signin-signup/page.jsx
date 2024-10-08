'use client'
import { useRouter } from 'next/navigation'
import { nunito } from '../utils/fonts';
import { useState , useEffect, Suspense} from 'react';
import {VscEye, VscEyeClosed} from 'react-icons/vsc'
import GoogleSignInButton from '../components/GoogleSignInButton';
import Image from 'next/image';
import LogoWhite from '@/app/img/logo CastPlus white blue.svg'
import { useSession, signIn } from 'next-auth/react';
import Loading from '../components/Loading';

const LoginSignUpPage = () => {
	const { data:session } = useSession()
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(false);
	}, [session])
  return (
	<Suspense fallback={<Loading />}> 
	{loading ? <Loading /> :
		<div className='flex justify-center items-center h-[100vh]'>
			<div className={`${nunito.className} ${"flex justify-center"}`}>
				<div className="relative flex flex-col justify-center items-center md:w-[480px] sm:w-[550px] w-[340px] shadow-lg h-full overflow-hidden bg-white rounded-2xl my-12">
					<div className='flex items-end justify-center bg-Blue w-[800px] h-[400px] mt-[-290px] rounded-[50%]'>
						<Image className='w-12 mb-7' alt='' width='' src={LogoWhite} />
					</div>
					<p className='mt-2 text-gray-600'>Welcome To CastPlus</p>
					<div id="login-form" className="w-full mt-2 mb-6 px-5 sm:px-10">
						<GoogleSignInButton setLoading={setLoading} />
					</div>
				</div>
			</div>
		</div>
		}
	</Suspense>
  )
}

export default LoginSignUpPage