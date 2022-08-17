import { AnalyticsData } from "../analytics-data";

export class GoogleAnalytics {
    private readonly _tokens: Set<string>;

    public constructor() {
        this._tokens = new Set<string>();
    }

    public addUniversalToken(gaToken: string): void {
        // ensure duplicates not added or processed
        if (this._tokens.has(gaToken)) {
            return;
        }

        this._tokens.add(gaToken);

        const gInstance: Gtag.Gtag | undefined = <any>gtag;

        if (gInstance) {
            gInstance("config", gaToken, {
                "custom_map": {
                    "dimension1": "application_id",
                    "dimension2": "application_title",
                    'dimension3': 'platform'
                }
            });

            gInstance("event", "app_dimension", { "platform": "Viewer" });
        }
    }

    public addToken(gaToken: string): void {
        // ensure duplicates not added or processed
        if (this._tokens.has(gaToken)) {
            return;
        }

        this._tokens.add(gaToken);

        const gInstance: Gtag.Gtag | undefined = <any>gtag;

        if (gInstance) {
            gInstance("config", gaToken, {
                "custom_map": {
                    "dimension1": "application_id",
                    "dimension2": "application_title",
                }
            });
        }
    }

    public write(event: "pageview" | "track", data: AnalyticsData): void {
        if (this._tokens.size <= 0) {
            return;
        }

        this._tokens.forEach((token: string) => {
            const gInstance: Gtag.Gtag | undefined = <any>gtag;

            if (gInstance) {
                if (event === "track") {
                    const eventCategory: string = data.get("eventCategory"); // 0
                    const eventAction: string = data.get("eventAction"); // 1
                    const eventLabel: string = data.get("eventLabel"); // 2

                    gInstance("event", eventAction, {
                        "send_to": token,
                        "event_category": eventCategory,
                        "event_label": eventLabel
                    });
                }

                if (event === "pageview") {
                    const eventCategory: string = data.get("eventCategory"); // 0
                    const eventLabel: string = data.get("eventLabel"); // 2

                    gInstance("event", "pageview", {
                        "send_to": token,
                        "event_category": eventCategory,
                        "event_label": eventLabel
                    });
                }
            }
        });
    }
}