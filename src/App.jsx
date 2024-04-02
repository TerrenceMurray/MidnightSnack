import { useState } from 'react';

export default function App ()
{
	const [count, setCount] = useState(0);

	const increment = () => setCount((count) => (count + 1) % 11);
	const decrement = () => setCount((count) => (count - 1) % 11);

	return (
		<>
			<div className="flex gap-10 items-center">
				<button type="button" aria-label='update count' onClick={() => decrement()}>-</button>
				<div>{count}</div>
				<button type="button" aria-label='update count' onClick={() => increment()}>+</button>
			</div>
		</>
	);
}
