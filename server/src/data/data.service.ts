import { Error } from "../utils/error";
import { getDatabase } from "../utils/database";
import { Data } from "./data.model";

export const getAllUsersData = async (): Promise<Data> => {
  const db = await getDatabase();
  const data = await db.collection("data").find({ Verified: false }).toArray();
  console.log(data);
  return data;
};

export const getAllUserDataUsingMetamaskId = async (
  metamaskId: string
): Promise<Data> => {
  const db = await getDatabase();
  const data = await db.collection("data").findOne({ MetamaskID: metamaskId });
  return data;
};

export const updateUserDataByMetamaskId = async (
  metamaskId: string,
  data: Data
) => {
  const db = await getDatabase();

  const filter = { MetamaskID: metamaskId };
  const update = {};
  if (data.FirstName) update["FirstName"] = data.FirstName;
  if (data.MiddleName) update["MiddleName"] = data.MiddleName;
  if (data.LastName) update["LastName"] = data.LastName;
  if (data.DateOfBirth) update["DateOfBirth"] = data.DateOfBirth;
  if (data.BloodGroup) update["BloodGroup"] = data.BloodGroup;
  if (data.AadhaarNumber) update["AadhaarNumber"] = data.AadhaarNumber;
  if (data.PANCardNo) update["PANCardNo"] = data.PANCardNo;
  if (data.DriversLicenseNumber)
    update["DriversLicenseNumber"] = data.DriversLicenseNumber;
  if (data.FathersName) update["FathersName"] = data.FathersName;
  if (data.MothersName) update["MothersName"] = data.MothersName;
  if (data.Gender) update["Gender"] = data.Gender;
  if (data.ProfileImage) update["ProfileImage"] = data.ProfileImage;
  if (data.Signature) update["Signature"] = data.Signature;
  if (data.PhoneNumber) update["PhoneNumber"] = data.PhoneNumber;
  if (data.Email) update["Email"] = data.Email;
  update["LastChanged"] = Object.keys(data);
  update["Verified"] = false;
  const options = { upsert: false };
  await db.collection("data").updateOne(filter, { $set: update }, options);
};

export const isMetamaskIdNew = async (metamaskId: string): Promise<Boolean> => {
  if (!(await getAllUserDataUsingMetamaskId(metamaskId))) {
    console.log("here");
    return true;
  }
  return false;
};

export const addUserDataByMetamaskId = async (
  metamaskId: string,
  data: Data
) => {
  const db = await getDatabase();

  const add = {};
  add["MetamaskID"] = metamaskId;
  if (data.FirstName) add["FirstName"] = data.FirstName;
  if (data.MiddleName) add["MiddleName"] = data.MiddleName;
  if (data.LastName) add["LastName"] = data.LastName;
  if (data.DateOfBirth) add["DateOfBirth"] = data.DateOfBirth;
  if (data.AadhaarNumber) add["AadhaarNumber"] = data.AadhaarNumber;
  if (data.Email) add["Email"] = data.Email;
  add["LastChanged"] = Object.keys(data);
  add["Verified"] = false;

  const result = await db.collection("data").insertOne(add);
  return result;
};

export const verifyUserData = async (metamaskId: string) => {
  const db = await getDatabase();
  const update = {};
  (update["Verified"] = true), (update["LastChanged"] = []);
  await db
    .collection("data")
    .updateOne({ MetamaskID: metamaskId }, { $set: update }, { upsert: false });
  const data = await db.collection("data").findOne({ MetamaskId: metamaskId });
  return data;
};

export const verifyAccessToken = async (accessToken: string) => {
  if (accessToken == "government") {
    return true;
  }
  return false;
};
