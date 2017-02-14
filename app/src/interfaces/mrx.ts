export interface Mrx {
    x_ID: number;
    name: string;
    mrx_ID: number;
    locations: MrxLocation[];
}

export interface MrxLocation {
    xpos_lat: number;
    xpos_long: number;
    timestamp: string;
    description: string;
}
