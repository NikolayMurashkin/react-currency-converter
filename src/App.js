import { useEffect, useState } from "react";
import './App.css';

const AppCourses = (props) => {
	const [amount, setAmount] = useState(props.amount);
	const [course, setCourse] = useState(0);
	const [changedAmount, setChangedAmount] = useState(0);
	const onChangeAmount = (e) => {
		setAmount(e.target.value)
	}

	const myHeaders = new Headers();
	myHeaders.append("apikey", "yd7oAQGLKV3dC3QT68QSlNwVHTp4p4V5");

	const requestOptions = {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders
	};

	const getCoursesData = async (currency) => {
		let res;

		await fetch(`https://api.apilayer.com/currency_data/convert?to=RUB&from=${currency}&amount=${amount}`, requestOptions)
			.then(response => response.json())
			.then(result => res = result)
			.catch(error => console.log('error', error));
		return res.info.quote;
	}

	useEffect(() => {
		setChangedAmount(amount * course + ' rub');
	}, [amount, course]);


	const getCourse = async (curr) => {
		const courseCurr = await getCoursesData(curr);
		setCourse(Math.round(courseCurr * 1));
	}
	const onReset = () => {
		setAmount(10);
		setCourse(0);
	}


	return (
		<div className="app">
			<div className="wrapper">
				<div className="changedAmount">{changedAmount}</div>
				<input
					className="amountInput"
					value={amount}
					onChange={onChangeAmount}
				/>
			</div>
			<div className="controls">
				<button onClick={() => getCourse('USD')}>USD</button>
				<button onClick={() => getCourse('EUR')}>EUR</button>
				<button onClick={() => getCourse('GBP')}>GBP</button>
				<button onClick={onReset}>RESET</button>
			</div>
		</div>
	);
};

export default AppCourses