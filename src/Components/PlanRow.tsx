import './Planner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

interface IPlanRow {
    plan: any;
    removePlan: (index: number, id: number) => void;
    index: number;
}


const PlanRow = (props: IPlanRow) => {
    const { plan, removePlan, index } = props;
    const history = useHistory();

    return (
        <div className={`plan-row ${plan.frequency === 'None' ? 'none' : plan.frequency === 'Daily' ? 'daily' : plan.frequency === 'Weekly' ? 'weekly' : 'monthly'}`}>
            <div>{plan.name}</div>
            <div>{plan.start_time.substr(0, 10)}</div>
            <div>{plan.start_time.substr(11, 5)}</div>
            <div>{plan.end_time.substr(11, 5)}</div>
            <div>{plan.frequency}</div>
            <div><FontAwesomeIcon className='update-delete-icon' icon={faEdit} onClick={() => history.push(`/edit-plan/${plan.id}`)} /></div>
            <div><FontAwesomeIcon className='update-delete-icon' icon={faTrashAlt} onClick={() => removePlan(index, plan.id)} /></div>
        </div>
    );
}

export default PlanRow;