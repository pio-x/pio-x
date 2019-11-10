export interface IMrx {
    x_ID: number;
    name: string;
    mrx_ID: number;
    locations: IMrxLocation[];
}

export interface IMrxLocation {
    xpos_lat: number;
    xpos_long: number;
    timestamp: string;
    description: string;
}
