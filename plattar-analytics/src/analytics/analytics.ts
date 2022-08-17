import BasicHTTP from "../util/basic-http";
import { AnalyticsData } from "./analytics-data";
import { GoogleAnalytics } from "./google/google-analytics";

export class Analytics {
    private readonly _applicationID: string;
    private readonly _handlePageHide: () => void;
    private readonly _data: AnalyticsData;
    private readonly _ga: GoogleAnalytics;

    private _pageTime: Date | null = null;
    public origin: "production" | "staging" | "dev" = "production";
    public event: "track" | "pageview" = "track";

    /**
     * Use HTTP Request to write analytics, otherwise will use beacons
     */
    public isBeacon: boolean = false;

    constructor(applicationID: string) {
        this._applicationID = applicationID;
        this._data = new AnalyticsData();
        this._ga = new GoogleAnalytics();

        this._handlePageHide = () => {
            if (document.visibilityState === "hidden") {
                this._pageTime = new Date();
            }
            else if (this._pageTime) {
                const time2 = new Date();
                const diff = time2.getTime() - this._pageTime.getTime();

                const data: AnalyticsData = this.data;

                data.push("eventAction", "View Time");
                data.push("viewTime", diff);
                data.push("eventLabel", diff);

                this.write();

                this._pageTime = null;

                document.removeEventListener("visibilitychange", this._handlePageHide, false);
            }
        };
    }

    public get googleAnalytics(): GoogleAnalytics {
        return this._ga;
    }

    public query(query: any | null | undefined = null): Promise<any> {
        return new Promise<any>((accept, reject) => {
            if (!query) {
                return reject(new Error("Analytics.query() - provided query was null"));
            }

            const url: string = this.origin === "dev" ? "http://localhost:9000/2015-03-31/functions/function/invocations" : "https://oyywgrj9ki.execute-api.ap-southeast-2.amazonaws.com/main/analytics";

            const data = {
                type: "read",
                application_id: this._applicationID,
                event: this.event,
                data: query
            };

            BasicHTTP.exec("POST", url, data).then((result) => {
                accept(((result && result.results) ? result.results : {}));
            }).catch(reject);
        });
    }

    public write(): Promise<any> {
        return new Promise<any>((accept, reject) => {
            const data: AnalyticsData = this._data;

            const url: string = this.origin === "dev" ? "http://localhost:9000/2015-03-31/functions/function/invocations" : "https://oyywgrj9ki.execute-api.ap-southeast-2.amazonaws.com/main/analytics";

            data.push("applicationId", this._applicationID);

            const sendData = {
                type: "write",
                application_id: this._applicationID,
                origin: this.origin,
                event: this.event,
                data: data.data
            };

            if (this.isBeacon === false) {
                BasicHTTP.exec("POST", url, sendData).then((result) => {
                    accept(((result && result.results) ? result.results : {}));
                }).catch(reject);
            }
            else {
                BasicHTTP.execBeacon(url, sendData).then((result) => {
                    accept(((result && result.results) ? result.results : {}));
                }).catch(reject);
            }

            this.googleAnalytics.write(this.event, this.data);
        });
    }

    public startRecordEngagement(): void {
        document.addEventListener("visibilitychange", this._handlePageHide, false);
    }

    public get data(): AnalyticsData {
        return this._data;
    }
}