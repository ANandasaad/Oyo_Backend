"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelBusinessLogic = void 0;
const config_1 = require("../config");
const http_errors_1 = require("http-errors");
exports.HotelBusinessLogic = {
    createHotel({ input }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { address, name, images, amenities } = input;
                    const create = yield config_1.prisma.hotel.create({
                        data: {
                            address,
                            name,
                            images: images ? images : [],
                            amenities,
                        },
                    });
                    return resolve(create);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    deleteHotel({ hotelId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isHotelExits = yield config_1.prisma.hotel.findUnique({
                        where: {
                            id: hotelId,
                        },
                    });
                    if (!isHotelExits)
                        throw new http_errors_1.NotFound("Hotel not found");
                    const deleteHotelById = yield config_1.prisma.hotel.delete({
                        where: {
                            id: hotelId,
                        },
                    });
                    return resolve(deleteHotelById);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    updateHotel() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    getHotelById({ hotelId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const isHotelExits = yield config_1.prisma.hotel.findUnique({
                        where: {
                            id: hotelId,
                        },
                    });
                    if (!isHotelExits)
                        throw new http_errors_1.NotFound("Hotel not found");
                    return resolve(isHotelExits);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    getAllHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const allHotels = yield config_1.prisma.hotel.findMany();
                    if (!allHotels.length)
                        throw new http_errors_1.NotFound("Hotel not found");
                    return resolve(allHotels);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    },
    bulkUploadHotel() {
        return __awaiter(this, void 0, void 0, function* () { });
    },
};
