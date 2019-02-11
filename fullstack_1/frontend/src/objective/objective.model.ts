export interface Objective {
    id: number;
    title: string;
    start: number;
    target: number;
    current: number;
    start_date: string;
    end_date: string;
    parent_id?: number;
}
