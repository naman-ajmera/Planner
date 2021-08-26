import { useEffect, useState } from "react";
import axios from "axios";
import PlanRow from "./PlanRow";
import './Planner.css';
import moment from "moment";


const TodaysPlans = () => {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/getAllPlansForToday").then(res => {
            const sortedPlans = res.data.sort(function (a: any, b: any) {
                return moment(a.start_time).diff(moment(b.start_time));
            });
            setPlans(sortedPlans);
        });
    }, []);

    const removePlan = (index: number, id: number) => {
        const tempPlans = [...plans];
        tempPlans.splice(index, 1);
        setPlans(tempPlans);
        axios.delete(`http://localhost:8080/api/deleteById/${id}`);
    }

    return (
        <div>
            <div className='plan-row-header'>
                <div className='header'>{'Name'}</div>
                <div className='header'>{'Start Time'}</div>
                <div className='header'>{'End Time'}</div>
                <div className='header'>{'Frequency'}</div>
                <div className='header'>{'Update'}</div>
                <div className='header'>{'Delete'}</div>
            </div>
            {plans.length > 0 ? plans.map((item, index: any) => {
                return <PlanRow removePlan={removePlan} plan={item} index={index} key={index} />
            }) : <div className='no-plans'>
                {'No Plans for today.!'}
            </div>}
        </div>
    );
}

export default TodaysPlans;