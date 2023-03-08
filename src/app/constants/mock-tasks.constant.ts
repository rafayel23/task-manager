import shortid from 'shortid';
import { Task } from '../interfaces';


function offsetDays(offset: number): Date {
    const todayDate = new Date().getDate();
    const targetDate = new Date();
    targetDate.setHours(0,0,0,0);
    targetDate.setDate(todayDate + offset);
    return targetDate;
}


export const MOCK_TASKS: Task[] = [

    {
        title: 'Enroll for intern',
        description: 'Full-stack developer',
        deadline: new Date('08-25-2019'),
        placeName: 'Workfront',
        address: 'Northern Avenue 1',
        isDone: true,
        id: shortid.generate(),
    },
    {
        title: 'Wash car',
        description: 'Price 10$',
        deadline: offsetDays(1),
        placeName: 'Elite Wash',
        address: 'Azatutyan 1',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Buy products',
        description: 'Vegetables, fruits, juices',
        deadline: offsetDays(0),
        placeName: 'SAS',
        address: 'Abovyan 48',
        isDone: true,
        id: shortid.generate(),
    },
    {
        title: 'Help Ann with exams',
        description: 'Exams starting next week',
        deadline: offsetDays(4),
        placeName: 'Ann\'s place',
        address: 'Nalbandyan 24/3',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Go to dentist',
        description: 'Call before going',
        deadline: offsetDays(8),
        placeName: 'Sena dent',
        address: 'Vardanants 8',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Organize party',
        description: 'Invite at least 10 guests',
        deadline: offsetDays(-3),
        placeName: 'Ann\'s place',
        address: 'Nalbandyan 24/3',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Pay credit',
        description: '140.000 AMD',
        deadline: offsetDays(0),
        placeName: 'ACBA bank',
        address: 'Teryan 90',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Go to interview',
        description: 'For position: cashier',
        deadline: offsetDays(1),
        placeName: 'SAS',
        address: 'Tigran-mec 51',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Buy tires',
        description: 'Winter is coming :)',
        deadline: offsetDays(-1),
        placeName: 'Mec aniv',
        address: 'Nar-dos 29',
        isDone: true,
        id: shortid.generate(),
    },
    {
        title: 'Go to hairdresser',
        description: 'Time 1 hour, Price 5$',
        deadline: offsetDays(-10),
        placeName: 'Toma beauty salon',
        address: 'Teryan 90',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Pay for internet',
        description: '12000 AMD',
        deadline: offsetDays(0),
        placeName: 'UCOM',
        address: 'Abovyan 88/1',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Visit parents',
        description: 'Make prior arrangment',
        deadline: offsetDays(12),
        placeName: 'Parent\'s place',
        address: 'Gyumri, Lalayan 14',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Meeting with John',
        description: 'Discussion about business',
        deadline: offsetDays(6),
        placeName: 'Jazzve',
        address: 'Tumanyan 20',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Buy products',
        description: 'Feed for dog',
        deadline: offsetDays(2),
        placeName: 'Haf-haf',
        address: 'Amiryan 31',
        isDone: true,
        id: shortid.generate(),
    },
    {
        title: 'Gift for wife',
        description: 'Something from jewelery',
        deadline: offsetDays(0),
        placeName: 'Inori',
        address: 'Tumanyan 20',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Repair stuff',
        description: 'Costs approximately 2000$',
        deadline: offsetDays(40),
        placeName: 'At home',
        address: 'Lisinyan 4',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Update insurance',
        description: 'For 3-5 years',
        deadline: offsetDays(-2),
        placeName: 'Ingo Armenia',
        address: 'Abovyan 121',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Read React DOCS',
        description: 'Reading time: 2 days',
        deadline: offsetDays(6),
        placeName: 'At home',
        address: 'Lisinyan 4',
        isDone: false,
        id: shortid.generate(),
    },
    {
        title: 'Fix watches',
        description: 'Go to master',
        deadline: offsetDays(-4),
        placeName: 'Chronograph',
        address: 'Tumanyan 19/1',
        isDone: false,
        id: shortid.generate(),
    },

    
]