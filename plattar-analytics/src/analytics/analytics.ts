import BasicHTTP from "../util/basic-http";

export class Analytics {
    private readonly _applicationID: string;
    public origin: "production" | "staging" | "dev" = "production";
    public event: "track" | "pageview" = "track";

    constructor(applicationID: string) {
        this._applicationID = applicationID;
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
            }

            BasicHTTP.exec("POST", url, data).then((result) => {
                accept(((result && result.results) ? result.results : {}));
            }).catch(reject);
        });
    }
}