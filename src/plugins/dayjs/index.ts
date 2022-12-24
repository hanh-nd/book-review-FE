import dayjs from 'dayjs';
import { displayPlugin } from './format';

dayjs.extend(displayPlugin);

export default dayjs;
