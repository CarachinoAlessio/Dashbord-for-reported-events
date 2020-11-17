import { Gpx } from './FeedbackUtenti/Gpx'

export class ToInitialize{
    constructor(
        public idsegnalazione: string,
        public gpx: Gpx,
        public passedDays: number,
        public gravity: number,
    ) {
    }
}

/*export class ToInitialize {

    public gpx: Gpx;
    public passedDays: number;
    public gravity: number;
}*/
