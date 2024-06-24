export type Root = Root2[];

export interface Root2 {
    day: number;
    list: List[];
}

export interface List {
    id: number;
    code: string;
    names: Names;
    genres: string[];
    type: Type;
    status: Status;
    player: Player;
    posters: Posters;
}

export interface Names {
    ru: string;
}

export interface Type {
    episodes?: number;
}

export interface Status {
    code: number;
}

export interface Player {
    episodes: Episodes;
}

export interface Episodes {
    first: number;
    last: number;
    string: string;
}
export interface Posters {
    small: Small;
    medium: Medium;
    original: Original;
}
export interface Small {
    url: string;
    raw_base64_file: any;
}

export interface Medium {
    url: string;
    raw_base64_file: any;
}

export interface Original {
    url: string;
    raw_base64_file: any;
}
