import SignUpForm from '@/src/components/auth/SignUpForm'
import Link from 'next/link'
import React from 'react'
import signUpImg from '../../../../public/signuppageimg.png'
import Image from 'next/image'
const SignUp = () => {
  return (
    <div>
      <div className="min-h-screen flex">
      {/* Left side - Illustration */}
  <div className="hidden md:flex md:w-1/2 relative items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-blue-200">
        <div className="relative w-full max-w-xl">
          <Image
            src={signUpImg}
            alt="loginPageImage"
            className="w-full h-auto"
          />

          {/* Overlay only on the image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100 mix-blend-multiply"></div>
        </div>
      </div>



      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-600">Start managing your tasks efficiently</p>
          </div>

          <SignUpForm />

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
