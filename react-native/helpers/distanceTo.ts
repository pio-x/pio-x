
export default function distanceTo(lat1: number|null, lon1: number|null, lat2: number|null, lon2: number|null): number {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	if (lat1 == null || lat2 == null || lon1 == null || lon2 == null) {
		return 999999;
	}
	else {
		let radlat1 = Math.PI * lat1/180;
		let radlat2 = Math.PI * lat2/180;
		let theta = lon1-lon2;
		let radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1609.344;
		return Math.round(dist);
	}
}
