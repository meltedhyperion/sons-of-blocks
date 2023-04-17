import "dotenv/config";

const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || "";
const dbName = process.env.DB_NAME || "Sons-Of-Blocks";
const authToken = process.env.TOKEN;

if (!dbUri) {
  throw new Error("Requires Database URI in .env");
}

export { port, dbUri, dbName, authToken };
