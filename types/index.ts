export interface TvShowData {
    score: number;
    show: {
      id: number;
      url: string;
      name: string;
      type: string;
      language: string;
      genres: string[];
      status: string;
      runtime: number | null;
      averageRuntime: number | null;
      premiered: string | null;
      ended: string | null;
      officialSite: string | null;
      schedule: {
        time: string;
        days: string[];
      };
      rating: {
        average: number | null;
      };
      weight: number;
      network: {
        id: number;
        name: string;
        country: {
          name: string;
          code: string;
          timezone: string;
        };
        officialSite: string | null;
      } | null;
      webChannel: {
        id: number;
        name: string;
        country: {
          name: string;
          code: string;
          timezone: string;
        } | null;
        officialSite: string | null;
      } | null;
      dvdCountry: null;
      externals: {
        tvrage: number | null;
        thetvdb: number | null;
        imdb: string | null;
      };
      image: {
        medium: string;
        original: string;
      } | null;
      summary: string | null;
      updated: number;
      _links: {
        self: {
          href: string;
        };
        previousepisode?: {
          href: string;
          name: string;
        };
        nextepisode?: {
          href: string;
          name: string;
        };
      };
    };
  }
  