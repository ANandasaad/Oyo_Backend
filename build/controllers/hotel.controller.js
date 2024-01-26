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
exports.HotelController = void 0;
const business_logic_1 = require("../business.logic");
exports.HotelController = {
    createHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = req.body;
                const response = yield business_logic_1.HotelBusinessLogic.createHotel({ input });
                res.json({
                    success: true,
                    message: "Hotel created successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hotelId = req.params.id;
                const response = yield business_logic_1.HotelBusinessLogic.deleteHotel({ hotelId });
                res.json({
                    success: true,
                    message: "Hotel deleted successfully",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    updateHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    },
    getHotelById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hotelId = req.params.id;
                const response = yield business_logic_1.HotelBusinessLogic.getHotelById({ hotelId });
                res.json({
                    success: true,
                    message: "Successfully retrieved hotel",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getAllHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield business_logic_1.HotelBusinessLogic.getAllHotels();
                res.json({
                    success: true,
                    message: "Successfully retrieved all",
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    bulkUploadHotel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) { }
        });
    },
};
