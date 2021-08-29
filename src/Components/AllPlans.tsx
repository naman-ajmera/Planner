import axios from "axios";
import { useEffect, useState } from "react";
import PlanRow from './PlanRow';
import './Planner.css';
import moment from "moment";

const AllPlans = () => {
    const [plans, setPlans] = useState([]);

    const { REACT_APP_DEV_URL } = process.env;

    useEffect(() => {
        const now = moment().format('YYYY-MM-DD');
        const expiredPlans: any[] = [];
        const nonExpiredPlans: any[] = [];
        axios.get(`${REACT_APP_DEV_URL}/getAllPlans`).then(res => {
            res.data.forEach((item: any) => {
                const curr = moment(item.start_time).format('YYYY-MM-DD');
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
            setPlans(plans => plans.concat(...sortedPlans))
            expiredPlans.map(item => {
                return axios.delete(`${REACT_APP_DEV_URL}/deleteById/${item}`)
            });
        });
    }, [setPlans, REACT_APP_DEV_URL]);

    const removePlan = (index: number, id: number) => {
        const tempPlans = [...plans];
        tempPlans.splice(index, 1);
        setPlans(tempPlans);
        axios.delete(`${REACT_APP_DEV_URL}/deleteById/${id}`);
    };

    return (
        <div>
            <div className='plan-row-header'>
                <div className='header'>{'Name'}</div>
                <div className='header'>{'Date'}</div>
                <div className='header'>{'Start Time'}</div>
                <div className='header'>{'End Time'}</div>
                <div className='header'>{'Frequency'}</div>
                <div className='header'>{'Update'}</div>
                <div className='header'>{'Delete'}</div>
            </div>
            {plans.length > 0 ? plans.map((item: any, index: any) => (
                <PlanRow removePlan={removePlan} plan={item} index={index} key={index} />
            )) : <div className='no-plans'>
                {'No Plans Exists.!'}
            </div>}
        </div>
    );
}

export default AllPlans;