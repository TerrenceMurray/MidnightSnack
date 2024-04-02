import { useState } from "react";
import { Button } from "./components/ui/button";

export default function App ()
{
	const [state, setState] = useState(0);
	return (
		<>
			<h1>Home</h1>
			<p>{state}</p>
			<Button onClick={() => setState(state + 1)}>Increment</Button>
			<Button onClick={() => setState(state - 1)}>Decrement</Button>
		</>
	);
}
