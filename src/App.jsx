import Routes from './routes';
import ContextProvider from './services/context';
import GlobalStyles from './theme/globalStyles';

function App() {
	return (
		<ContextProvider>
			<GlobalStyles />
			<div className="App">
				<Routes />
			</div>
		</ContextProvider>
	);
}

export default App;
