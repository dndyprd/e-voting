export type Divisi = {
    id: number;
    name: string;
    code: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    is_voted?: boolean;
    divisi?: Divisi;
    [key: string]: unknown;
};

export type Auth = {
    user: User | null;
};
