export interface IVehicle {
    type: "bike" | "scooter" | "electric scooter";
    id: number;
    status: "available" | "in use";
    assignUser(userToAssign: IUser): boolean;
}

export interface IUser {
    name: string;
    surname: string;
    email: string;
    paymentMethod: "paypal" | "mooney" | "card";
    bookVehicle(vehicleToAssign: IVehicle): void;
}

export interface ICity {
    name: string;
    availableVehicles: IVehicle[];
    addVehicle(vehicleToAdd: IVehicle): void;
}