type Image = {
    url: string;
    width: number;
    height: number;
    mimeType: string;
    orientation: "landscape" | "portrait" | "square";
    aspectRatio: number;
    type: "main" | "photo" | "avatar";
};

type Info = {
    type: string;
    images: {
        type: string;
        data: Image[];
        count: number;
    };
    details: {
        type: string;
        data: {
            type: string;
            value: number;
        }[];
        count: number;
    };
    description: string;
    mainImage: Image;
    maxGuestCapacity: number;
    host: {
        name: string;
        avatar: Image;
        isSuperhost: boolean;
    };
    amenities: {
        type: string;
        data: {
            group: string;
            available: boolean;
            title: string;
            type: string;
        }[];
        count: number;
    };
    title: string;
    id: string;
    location: {
        lat: number;
        long: number;
        address: string;
        city: string;
        country: {
            code: string;
            title: string;
        };
        zip: string;
    };
    ratings: {
        accuracy: number;
        checkin: number;
        cleanliness: number;
        communication: number;
        location: number;
        value: number;
        guestSatisfactionOverall: number;
    };
    visibleReviewCount: number;
    available: boolean;
    price: number;
    currency: {
        code: string;
        symbol: string;
        name: string;
    };
    sleepingArrangements: {
        type: string;
        data: any[];
        count: number;
    };
};

export type Listing = {
    ref: string;
    category:string
    info: Info;
};

