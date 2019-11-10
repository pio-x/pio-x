type IRiddleState = "LOCKED" | "UNLOCKED" | "SOLVED";

export interface IRiddle {
    r_ID: number;
    pos_lat: number;
    pos_long: number;
    title: string;
    question: string;
    dep_ID: number;
    answer: string;
    answer_options: null | string[];
    answer_options_enabled: number;
    image_required: number;
    answer_required: number
    type: string;
    points: number;
    state: IRiddleState;
}
