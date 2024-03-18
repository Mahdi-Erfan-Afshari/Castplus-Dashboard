import { Suspense } from 'react'
import DashboardPage from "./components/Dashboard"
// import dynamic from 'next/dynamic';

// const DynamicDashboardPage = dynamic(
// 	() => import('./components/Dashboard'),
// 	{ ssr: false }
// );

export default function Home() {
	return (
		<main>
			<Suspense>
				<DashboardPage />
   			</Suspense>
			{/* <DynamicDashboardPage /> */}
		</main>
	)
}
