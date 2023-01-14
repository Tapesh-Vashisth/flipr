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
    const data: any[] = [];

    const b = req.query;
    // console.log(b);

    let companyName: string = '';

    if (b.name) {
        if (fs.existsSync(`./Data/${b.name.toString().toUpperCase()}.csv`)) {
            companyName = b.name.toString().toUpperCase();
            // console.log(companyName)
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
                    // console.log(obj);
                    data.push(obj);
                })
                .on("end", async function () {
                    const check = await Company.findOne({ companyName: companyName }).exec()
                    if (!check) {
                        const newCompany = await new Company({
                            companyName: companyName,
                            data: data
                        });
                        await newCompany.save();
                        return res.status(200).json({ message: 'company details added successfully' });
                    }
                    else {
                        return res.status(409).json({ message: 'company already exists' });
                    }
                })
                .on("error", function (error) {
                    return res.status(400).json({ message: error.message });
                });
        }
        else {
            return res.status(404).json({ message: 'company not found' });
        }
    }

}

const getCompanyDetails = async (req: Request, res: Response) => {
    const b = req.query;
    const name = b.name?.toString().toUpperCase();
    // console.log(b);
    const limit = Number(b.limit);
    let date=''
    if(b.date)
    {
        const range:number = 1;
        if(b.range)
        {
            const company = await Company.findOne({companyName:name},{data:{_id:0}});
            let parts:any|null = b.date?.toString().split('-');
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toDateString();
            const prev:any = new Date(date);
            const prev_date = new Date(prev-(Number(b.range))*86400000);
            console.log(prev_date);
            let maxi:number = Number.MIN_VALUE;
            let mini:number = Number.MAX_VALUE;

            const arr:any = company?.data;
            let info:any=[];
            arr.forEach((elem:any)=>{
                if(new Date(elem.date)>=prev_date && new Date(elem.date)<=new Date(date))
                {
                    info.push(elem);
                    maxi = Math.max(maxi,elem.data[3]);
                    mini = Math.min(mini,elem.data[3]);
                }
            })

            console.log(maxi,mini);
            info.push({max:maxi,min:mini})
            return res.status(200).json(info);
        }
        else
        {
            const company = await Company.findOne({companyName:name},{data:{_id:0}});
            let parts:any|null = b.date?.toString().split('-');
            date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toDateString();
            const prev:any = new Date(date);
            const prev_date = new Date(prev-(Number(range))*86400000);
            console.log(prev_date);
            let maxi:number = Number.MIN_VALUE;
            let mini:number = Number.MAX_VALUE;

            const arr:any = company?.data;
            let info:any=[];
            arr.forEach((elem:any)=>{
                if(new Date(elem.date)>=prev_date && new Date(elem.date)<=new Date(date))
                {
                    info.push(elem);
                    maxi = Math.max(maxi,elem.data[3]);
                    mini = Math.min(mini,elem.data[3]);
                }
            })

            console.log(maxi,mini);
            info.push({max:maxi,min:mini})
            return res.status(200).json(info);
        }
    }
    else
    {
        const company = await Company.findOne({companyName:name}).slice('data',limit);
        return res.status(200).json(company);
    }
}

export { setCompanyDetails, getCompanyDetails }