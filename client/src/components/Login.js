import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [data, setData] = useState({});
    useEffect(async () => {
        try {
            const { data } = await axios.get('user/');
            setData(data);
        } catch (e) {
            console.log(e.message);
        }
    }, []);

    return (
        <div>
            <h1>{data.message}</h1>
        </div>
    );
}
