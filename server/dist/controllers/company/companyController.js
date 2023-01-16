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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyDetails = exports.setCompanyDetails = void 0;
const Company_1 = __importDefault(require("../../models/Company"));
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const setCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [];
    const b = req.query;
    // console.log(b);
    let companyName = '';
    if (b.name) {
        if (fs_1.default.existsSync(`./Data/${b.name.toString().toUpperCase()}.csv`)) {
            companyName = b.name.toString().toUpperCase();
            // console.log(companyName)
            fs_1.default.createReadStream(`./Data/${companyName}.csv`)
                .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                const obj = { date: '', data: [] };
                obj.date = new Date(row[0]).toDateString();
                const arr = [];
                for (let i = 1; i < row.length; i++) {
                    arr.push(row[i]);
                }
                obj.data = (arr);
                // console.log(obj);
                data.push(obj);
            })
                .on("end", function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const check = yield Company_1.default.findOne({ companyName: companyName }).exec();
                    if (!check) {
                        const newCompany = yield new Company_1.default({
                            companyName: companyName,
                            data: data
                        });
                        yield newCompany.save();
                        return res.status(200).json({ message: 'company details added successfully' });
                    }
                    else {
                        return res.status(409).json({ message: 'company already exists' });
                    }
                });
            })
                .on("error", function (error) {
                return res.status(400).json({ message: error.message });
            });
        }
        else {
            return res.status(404).json({ message: 'company not found' });
        }
    }
});
exports.setCompanyDetails = setCompanyDetails;
const getCompanyDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log("company data");
    const b = req.query;
    const name = (_a = b.name) === null || _a === void 0 ? void 0 : _a.toString().toUpperCase();
    console.log("b is : ", b);
    const limit = Number(b.limit);
    let date = '';
    if (b.date) {
        const range = 1;
        if (b.range) {
            const company = yield Company_1.default.findOne({ companyName: name }, { data: { _id: 0 } });
            let parts = (_b = b.date) === null || _b === void 0 ? void 0 : _b.toString().split('-');
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toDateString();
            const prev = new Date(date);
            const prev_date = new Date(prev - (Number(b.range)) * 86400000);
            console.log(prev_date);
            let maxi = Number.MIN_VALUE;
            let mini = Number.MAX_VALUE;
            const arr = company === null || company === void 0 ? void 0 : company.data;
            let info = [];
            arr.forEach((elem) => {
                if (new Date(elem.date) >= prev_date && new Date(elem.date) <= new Date(date)) {
                    info.push(elem);
                    maxi = Math.max(maxi, elem.data[3]);
                    mini = Math.min(mini, elem.data[3]);
                }
            });
            console.log(maxi, mini);
            info.push({ max: maxi, min: mini });
            return res.status(200).json(info);
        }
        else {
            const company = yield Company_1.default.findOne({ companyName: name }, { data: { _id: 0 } });
            let parts = (_c = b.date) === null || _c === void 0 ? void 0 : _c.toString().split('-');
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toDateString();
            const prev = new Date(date);
            const prev_date = new Date(prev - (Number(range)) * 86400000);
            console.log(prev_date);
            let maxi = Number.MIN_VALUE;
            let mini = Number.MAX_VALUE;
            const arr = company === null || company === void 0 ? void 0 : company.data;
            let info = [];
            arr.forEach((elem) => {
                if (new Date(elem.date) >= prev_date && new Date(elem.date) <= new Date(date)) {
                    info.push(elem);
                    maxi = Math.max(maxi, elem.data[3]);
                    mini = Math.min(mini, elem.data[3]);
                }
            });
            console.log(maxi, mini);
            info.push({ max: maxi, min: mini });
            return res.status(200).json(info);
        }
    }
    else {
        const company = yield Company_1.default.findOne({ companyName: name }).slice('data', limit);
        return res.status(200).json(company);
    }
});
exports.getCompanyDetails = getCompanyDetails;
