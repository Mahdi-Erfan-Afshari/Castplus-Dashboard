import './globals.css'
import Header from './components/Header'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'
import Sidebar from "@/app/components/Sidebar"
import NavBar from '@/app/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Castplus Dashboard',
	description: 'Castplus Dashboard',
}

export default function RootLayout({ children }) {
  return (
	<html lang="en">
		<body className={`${inter.className} ${"bg-White"}`}>
			<Provider>
				<NavBar />
				{/* <Header /> */}
				<Sidebar />
				{children}
			</Provider>
		</body>
	</html>
  )
}
