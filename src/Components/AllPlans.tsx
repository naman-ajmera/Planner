import axios from "axios";
import { useEffect, useState } from "react";
import PlanRow from './PlanRow';
import './Planner.css';
import moment from "moment";

const AllPlans = () => {
    const [plans, setPlans]: any[] = [] = useState([]);

    useEffect(() => {
        const now = moment();
        const expiredPlans: any[] = [];
        const nonExpiredPlans: any[] = [];
        axios.get("http://localhost:8080/api/getAllPlans").then(res => {
            res.data.forEach((item: any) => {
                const curr = moment(item.start_time);
                if (now > curr) {
                    expiredPlans.push(item.id);
                }
                else {
                    nonExpiredPlans.push(item);
                }
            });
            const sortedPlans = nonExpiredPlans.sort(function (a, b) {
                return moment(a.start_time).diff(moment(b.start_time));
            });
            setPlans(sortedPlans);
            expiredPlans.map(item => {
                return axios.delete(`http://localhost:8080/api/deleteById/${item}`)
            });
        });
    }, []);

    const removePlan = (index: number, id: number) => {
        const tempPlans = [...plans];
        tempPlans.splice(index, 1);
        setPlans(tempPlans);
        axios.delete(`http://localhost:8080/api/deleteById/${id}`);
    };

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
            {plans.length > 0 ? plans.map((item: any, index: any) => (
                <PlanRow removePlan={removePlan} plan={item} index={index} key={index} />
            )) : <div className='no-plans'>
                {'No Plans for today.!'}
            </div>}
        </div>
    );
}

export default AllPlans;