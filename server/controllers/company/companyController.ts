import mongoose from "mongoose";
import Company from "../../models/Company";
import { Request, Response } from "express";
import fs from 'fs';
import { parse } from 'csv-parse'
interface returnType {
    date: string,
    data: any[]
}


const setCompanyDetails = async (req: Request, res: Response) => {
    console.log('Set Company Details')
    const data: any[] = [];
    
    const query = req.query;
    
    let companyName: string = '';
    
    if (query.name) {
        if (fs.existsSync(`./Data/${query.name.toString().toUpperCase()}.csv`)) {
            companyName = query.name.toString().toUpperCase();
            const check = await Company.findOne({ companyName: companyName }).exec()
            if (!check) {
                fs.createReadStream(`./Data/${companyName}.csv`)
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row: any) {
                    const obj: returnType = { date: '', data: [] };
                    obj.date = new Date(row[0]).toDateString();
                    const arr: any[] = [];
                    for (let i = 1; i < row.length; i++) {
                        arr.push(row[i]);
                    }
                    obj.data = (arr);
                    data.push(obj);
                })
                .on("end", async function () {
                    const newCompany = await new Company({
                        companyName: companyName,
                        data: data
                    });
                    await newCompany.save();
                    return res.status(200).json({ message: 'company details added successfully' });
                })
                    .on("error", function (error) {
                        return res.status(400).json({ message: error.message });
                    });
            }
            else {
                return res.status(409).json({ message: 'company already exists' });
            }
        }
        else {
            return res.status(404).json({ message: 'company not found' });
        }
    }
}

const getCompanyDetails = async (req: Request, res: Response) => {
    console.log('Get Company Details')
    const query = req.query;
    const name = query.name?.toString().toUpperCase();
    const limit = Number(query.limit);
    let date = ''
    if (query.date) {
        const range: number = 1;
        if (query.range) {
            const company = await Company.findOne({ companyName: name }, { data: { _id: 0 } });
            if (!company) return res.status(404).json({ message: 'company not found' });

            let parts: any | null = query.date?.toString().split('-');
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toDateString();
            const prev: any = new Date(date);
            const prev_date = new Date(prev - (Number(query.range)) * 86400000);
    
            let maxi: number = Number.MIN_VALUE;
            let mini: number = Number.MAX_VALUE;

            const arr: any = company?.data;
            let info: any = [];
            arr.forEach((elem: any) => {
                if (new Date(elem.date) >= prev_date && new Date(elem.date) <= new Date(date)) {
            
                    info.push(elem);
                    if (elem.data[3] != null) {
                        maxi = Math.max(maxi, elem.data[3]);
                        mini = Math.min(mini, elem.data[3]);
                    }
                }
        
            })


            if (maxi == Number.MIN_VALUE) {
                maxi = info[0].data[3];
            }

            if (mini == Number.MAX_VALUE) {
                mini = 0;
            }

            info.push({ max: maxi, min: mini })
            return res.status(200).json(info);
        }
        else {
            const company = await Company.findOne({ companyName: name }, { data: { _id: 0 } });
            if (!company) return res.status(404).json({ message: 'company not found' });
            let parts: any | null = query.date?.toString().split('-');
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toDateString();
            const prev: any = new Date(date);
            const prev_date = new Date(prev - (Number(range)) * 86400000);
    
            let maxi: number = Number.MIN_VALUE;
            let mini: number = Number.MAX_VALUE;

            const arr: any = company?.data;
            let info: any = [];
            arr.forEach((elem: any) => {
                if (new Date(elem.date) >= prev_date && new Date(elem.date) <= new Date(date)) {
                    info.push(elem);
                    maxi = Math.max(maxi, elem.data[3]);
                    mini = Math.min(mini, elem.data[3]);
                }
            })

            if (maxi == Number.MIN_VALUE) {
                maxi = info[0].data[3];
            }

            if (mini == Number.MAX_VALUE) {
                mini = 0;
            }
    
            info.push({ max: maxi, min: mini })
            return res.status(200).json(info);
        }
    }
    else {
        if (!limit) return res.status(400).json({ message: 'enter a valid query' });
        const company = await Company.findOne({ companyName: name }).slice('data', limit);
        if (!company) return res.status(404).json({ message: 'company not found' });
        return res.status(200).json(company);
    }
}

export { setCompanyDetails, getCompanyDetails }