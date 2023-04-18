import { Error } from "../utils/error";
import { Request, Response } from "express";
import { addUserDataByMetamaskId, getAllUserDataUsingMetamaskId, getAllUsersData, isMetamaskIdNew, updateUserDataByMetamaskId, verifyAccessToken, verifyUserData } from "./data.service";
import { Data } from "./data.model";
import { getAccessToken, getMetamaskToken } from "../utils/const";


export const getAllData = async(req: Request, res: Response) => {
    const metamaskId : string = getMetamaskToken(req)
    try {
        if(!metamaskId) {
            const error: Error = {
                errorKey: "MANDATORY_FIELDS_MISSING",
                message: "Mandatory fields are missing.",
            };
            return res.status(400).json(error);
        }
        const data: any = await getAllUserDataUsingMetamaskId(metamaskId);
        return res.status(200).json({data: data});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export const getAllUsers = async(req: Request, res: Response) => {
    const accessToken : string = getAccessToken(req)
    try {
        if(!accessToken) {
            const error: Error = {
                errorKey: "MANDATORY_FIELDS_MISSING",
                message: "Mandatory fields are missing.",
            };
            return res.status(400).json(error);
        }
        if (!(await verifyAccessToken(accessToken))) return res.status(403).json({'error': 'unauthorized request'})
        const data = await getAllUsersData()
        return res.status(200).json({data:data});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export const updateData = async(req: Request, res: Response) => {
    const metamaskId : string = getMetamaskToken(req)
    const data : Data = req.body
    try {
        if(!metamaskId) {
            const error: Error = {
                errorKey: "MANDATORY_FIELDS_MISSING",
                message: "Mandatory fields are missing.",
            };
            return res.status(400).json(error);
        }
        await updateUserDataByMetamaskId(metamaskId, data)
        return res.status(200).json({status:'updated'});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export const addData = async(req: Request, res: Response) => {
    const metamaskId : string = getMetamaskToken(req)
    const data : Data = req.body
    try {
        if(!metamaskId) {
            const error: Error = {
                errorKey: "MANDATORY_FIELDS_MISSING",
                message: "Mandatory fields are missing.",
            };
            return res.status(400).json(error);
        }
        if (!await isMetamaskIdNew(metamaskId)) return res.status(400).json({error:'account already exists'});
        await addUserDataByMetamaskId(metamaskId, data)
        return res.status(200).json({status:'added'});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export const verifyData = async(req: Request, res: Response) => {
    const metamaskId : string = getMetamaskToken(req)
    const accessToken: string = getAccessToken(req)
    try {
        if(!metamaskId || !accessToken) {
            const error: Error = {
                errorKey: "MANDATORY_FIELDS_MISSING",
                message: "Mandatory fields are missing.",
            };
            return res.status(400).json(error);
        }
        if (!(await verifyAccessToken(accessToken))) return res.status(403).json({'error': 'unauthorized request'})
        await verifyUserData(metamaskId)
        return res.status(200).json({status:'verified'});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}