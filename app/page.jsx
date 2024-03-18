// import DashboardPage from "./components/Dashboard"
import dynamic from 'next/dynamic';

const DynamicDashboardPage = dynamic(
	() => import('./components/Dashboard'),
	{ ssr: false }
);

export default function Home() {
	return (
		<main>
			<DynamicDashboardPage />
		</main>
	)
}
