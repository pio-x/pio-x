type RiddleState = "LOCKED" | "UNLOCKED" | "SOLVED";

export interface Riddle {
    r_ID: number;
    pos_lat: number;
    pos_long: number;
    question: string;
    dep_ID: number;
    answer: string;
    image_required: number;
    answer_required: number
    type: string;
    points: number;
    state: RiddleState;
}
