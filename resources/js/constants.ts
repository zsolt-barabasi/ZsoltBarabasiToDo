export enum ToDoPriority {
    P0,
    P1,
    P2,
}

export type Todo = {
    id: number;
    title: string;
    description: string;
    priority: ToDoPriority;
    status: boolean;
    updated_at?: string;
    created_at?: string;
};
