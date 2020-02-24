export interface KeyValuePair {
    id: number,
    name: string
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}

export interface Vehicle {
    id: number;
    make: KeyValuePair;
    model: KeyValuePair;
    features: KeyValuePair[];
    isRegistered: boolean;
    contact: Contact;
}

export interface SaveVehicle {
    id: number;
    makeId: any;
    modelId: any;
    features: number[];
    isRegistered: any;
    contact: Contact;
}