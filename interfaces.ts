import {paymentMethodsType, vehicleTypes, statusTypes} from "./definitions"

export interface IVehicle {
    type: vehicleTypes;
    id: number;
    status: statusTypes;
    assignUser(userToAssign: IUser): boolean;
}

export interface IUser {
    name: string;
    surname: string;
    email: string;
    paymentMethod: paymentMethodsType;
    bookVehicle(vehicleToAssign: IVehicle): void;
}

export interface ICity {
    name: string;
    availableVehicles: IVehicle[];
    addVehicle(vehicleToAdd: IVehicle): void;
}