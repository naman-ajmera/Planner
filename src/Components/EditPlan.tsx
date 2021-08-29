import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDate } from '../Utility/DateFunction';

const EditPlan = (props: any) => {
    const [name, setName] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [frequency, setFrequency] = useState('');
    const [parentId, setParentId] = useState('');

    const history = useHistory();

    const { id } = props.match.params;
    const { REACT_APP_DEV_URL } = process.env;

    useEffect(() => {
        axios.get(`${REACT_APP_DEV_URL}/getPlanById/${id}`).then(res => {
            const { name, start_time, end_time, frequency, parentId } = res.data;
            setName(name);
            setFrequency(frequency);
            setStartTime(start_time.substr(11, 5));
            setEndTime(end_time.substr(11, 5));
            setParentId(parentId);
        });
    }, [id, REACT_APP_DEV_URL]);

    const onRadioButtonClick = (e: any) => {
        setFrequency(e.target.value);
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        axios
            .put(`${REACT_APP_DEV_URL}/updatePlanById/${id}`, {
                name,
                start_time: getDate(start_time),
                end_time: getDate(end_time),
                frequency,
                parentId
            })
            .then((res) => {
                alert('Plan Updated Successfully.!');
                history.push(`/all-plans`)
            });
    };

    return (
        <div className='form-container'>
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
                                checked={frequency === 'None'}
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
                                checked={frequency === 'Daily'}
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
                                checked={frequency === 'Weekly'}
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
                                checked={frequency === 'Monthly'}
                                name="radio-group"
                            />
                        </div>
                    </div>
                </div>
                <button className='submit-button' type="submit">{"Submit"}</button>
            </form>
        </div>
    );
}

export default EditPlan;