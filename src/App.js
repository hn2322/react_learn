import { useEffect, useState } from 'react';

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [money, setMoney] = useState(0);
    const [coinToUSD, setCoinToUSD] = useState({});
    const onChange = (event) => setMoney(event.target.value);
    const onSelect = (event) => {
        const selectedValue = JSON.parse(event.target.value);
        setCoinToUSD(selectedValue);
    };
    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers')
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
            <div>
                <label htmlFor="money">USD</label>
                <input
                    onChange={onChange}
                    value={money}
                    id="money"
                    type="number"
                    placeholder="Please enter ur USD..."
                />
            </div>
            <hr />
            <div>
                {loading ? (
                    <strong>Loading...</strong>
                ) : (
                    <div>
                        <select onChange={onSelect}>
                            <option value="-1">select coin</option>
                            {coins.map((coin) => (
                                <option
                                    key={coin.id}
                                    value={JSON.stringify({ sym: coin.symbol, price: coin.quotes.USD.price })}
                                >
                                    {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price.toFixed(4)} USD
                                </option>
                            ))}
                        </select>
                        <h2>
                            {money > 0
                                ? `You can buy ${coinToUSD.price > 0 ? (money / coinToUSD.price).toFixed(4) : null} 
                            ${coinToUSD.sym} for ${money} USD!`
                                : null}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
