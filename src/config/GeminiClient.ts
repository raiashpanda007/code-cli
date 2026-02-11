import { GoogleGenAI } from "@google/genai";
import { Cfg } from "./env";

export const EMBEDDING_CLIENT = new GoogleGenAI({ apiKey: Cfg.GEMINI_API_KEY, });