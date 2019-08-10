export interface Task {
    title: string,
    description: string,
    isDone: boolean,
    deadline: Date,
    placeName: string,
    address: string,
    id?: string,
}