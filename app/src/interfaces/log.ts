type LOG_TYPE = "STATION" | "RIDDLE" | "MRX" | "OTHER" ;

export interface Log {
    l_ID: number;
    timestamp: string;
    text: string;
    type: LOG_TYPE;
    FK_ID: number;
    t_ID: number;
    image: string;
}
