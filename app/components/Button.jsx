'use client'
import { forwardRef } from 'react'
import Link from 'next/link'

const Button = forwardRef(function Button(
  { variant = 'solid', color = 'gray', className, href, ...props },
  ref
) {
  className = 'hover:bg-blue-700 flex items-center justify-center text-md rounded-xl bg-Blue text-white w-full px-3 py-2 mt-3  duration-150'

  return href ? (
    <Link ref={ref} href={href} className={className} {...props} />
  ) : (
    <button ref={ref} className={className} {...props} />
  )
})

export default Button
