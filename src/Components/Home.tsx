import axios from "axios";
import { useState } from "react";

const Home = () => {
    const [name, setName] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [frequency, setFrequency] = useState(null);

    const getDate = (time: any) => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const newDate = new Date().getDate();
        const seconds = new Date().getSeconds();
        var formattedDate = "";
        formattedDate = `${year}-${month}-${newDate} ${time.split(":")[0]}:${time.split(":")[1]
            }:${seconds}`;

        return formattedDate;
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/savePlan", {
                name,
                start_time: getDate(start_time),
                end_time: getDate(end_time),
                frequency,
            })
            .then((res) => {
                setName('');
                setEndTime('');
                setStartTime('');
                setFrequency(null);
                alert('Plan created Successfully.!');
            });
    };

    const onRadioButtonClick = (e: any) => {
        setFrequency(e.target.value);
    };

    return (
        <div className='form-container'>
            {process.env.DEV_URL}
            <form onSubmit={formSubmit} className='form-wrapper'>
                <div className='form-row'>
                    <label>{"Name"}</label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                        type="text"
                    ></input>
                </div>
                <div className='form-row'>
                    <label>{"Start Time"}</label>
                    <input
                        id="start_time"
                        value={start_time}
                        onChange={(e) => setStartTime(e.target.value)}
                        required={true}
                        type="time"
                        className='input-time'
                    ></input>
                </div>
                <div className='form-row'>
                    <label>{"End Time"}</label>
                    <input
                        id="end_time"
                        value={end_time}
                        onChange={(e) => setEndTime(e.target.value)}
                        required={true}
                        type="time"
                        className='input-time'
                    ></input>
                </div>
                <div>
                    <div className='frequency-label'>
                        <label>{"Frequency"}</label>
                    </div>
                    <div className='frequency-row'>
                        <div>
                            <label>{"None"}</label>
                            <input
                                value={"None"}
                                onClick={(e) => onRadioButtonClick(e)}
                                required={true}
                                type="radio"
                                name="radio-group"
                            />
                        </div>
                        <div>
                            <label>{"Daily"}</label>
                            <input
                                value={"Daily"}
                                onClick={(e) => onRadioButtonClick(e)}
                                required={true}
                                type="radio"
                                name="radio-group"
                            />
                        </div>
                        <div>
                            <label>{"Weekly"}</label>
                            <input
                                value={"Weekly"}
                                onClick={(e) => onRadioButtonClick(e)}
                                required={true}
                                type="radio"
                                name="radio-group"
                            />
                        </div>
                        <div>
                            <label>{"Monthly"}</label>
                            <input
                                value={"Monthly"}
                                onClick={(e) => onRadioButtonClick(e)}
                                required={true}
                                type="radio"
                                name="radio-group"
                            />
                        </div>
                    </div>
                </div>
                <button className='submit-button' type="submit">{"Submit"}</button>
            </form>
        </div>
    );
};

export default Home;
