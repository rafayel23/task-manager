import { Task } from './task.interface';

export interface TodayTasksDialogActions {
    todayTasks: () => Task[];
    remove: (id: string) => void;
    markAsDone: (id: string) => void;
}
