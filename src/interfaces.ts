import {PaymentMethodsType, VehicleTypes, StatusTypes} from "./definitions"

export interface IVehicle {
    type: VehicleTypes;
    id: number;
    status: StatusTypes;
    assignUser(userToAssign: IUser): boolean;
}

export interface IUser {
    name: string;
    surname: string;
    email: string;
    paymentMethod: PaymentMethodsType;
    bookVehicle(vehicleToAssign: IVehicle): void;
}

export interface ICity {
    name: string;
    availableVehicles: IVehicle[];
    addVehicle(vehicleToAdd: IVehicle): void;
}