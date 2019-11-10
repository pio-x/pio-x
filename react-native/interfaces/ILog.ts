type ILogType = "STATION" | "RIDDLE" | "MRX" | "OTHER" ;

export interface ILog {
    l_ID: number;
    timestamp: string;
    text: string;
    type: ILogType;
    FK_ID: number;
    t_ID: number;
    image: string;
}
