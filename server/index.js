import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import { google } from "googleapis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "5mb" }));

function loadServiceAccount() {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  if (!keyPath) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_KEY_PATH");
  }
  return JSON.parse(fs.readFileSync(keyPath, "utf-8"));
}

function buildRow(session, receivedAt) {
  const meta = session?.meta || {};
  const quizzes = session?.quizzes || {};
  const topicA = session?.topicA || {};
  const topicB = session?.topicB || {};

  const totalDurationMs =
    typeof meta.startTime === "number" ? receivedAt - meta.startTime : null;

  return {
    participant_id: session?.participant_id || null,
    conditionAssignment: session?.conditionAssignment || null,
    dominantModality: meta.determinedDominant || null,
    topicA_mode: topicA.mode || null,
    quizA_LTR: quizzes.quizA_LTR ?? null,
    quizA_score: quizzes.quizA_Score ?? null,
    quizB_score: quizzes.quizB_Score ?? null,
    topicB_choice: topicB.choice || topicB.firstChoice || null,
    topicB_switchCount: topicB.switchCount ?? null,
    totalDurationMs,
    raw_session_json: JSON.stringify(session)
  };
}

async function appendToSheet(row) {
  const credentials = loadServiceAccount();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  const sheets = google.sheets({ version: "v4", auth });

  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("Missing GOOGLE_SHEET_ID");

  const values = [[
    row.participant_id,
    row.conditionAssignment,
    row.dominantModality,
    row.topicA_mode,
    row.quizA_LTR,
    row.quizA_score,
    row.quizB_score,
    row.topicB_choice,
    row.topicB_switchCount,
    row.totalDurationMs,
    row.raw_session_json
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: process.env.GOOGLE_SHEET_RANGE || "Sheet1!A:K",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values }
  });
}

app.post("/api/submit", async (req, res) => {
  try {
    const session = req.body?.session;
    if (!session) {
      return res.status(400).json({ error: "Missing session" });
    }
    const receivedAt = Date.now();
    const row = buildRow(session, receivedAt);
    await appendToSheet(row);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
