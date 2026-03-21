import { type Request, type Response, type NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { logger } from "./logger";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.substring(7);

  if (!supabaseUrl || !supabaseServiceKey) {
    logger.warn("Supabase credentials not configured, using token as user ID for development");
    try {
      const decoded = Buffer.from(token.split(".")[1], "base64").toString("utf-8");
      const payload = JSON.parse(decoded);
      req.userId = payload.sub;
      req.userEmail = payload.email;
      next();
      return;
    } catch {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
    req.userId = data.user.id;
    req.userEmail = data.user.email;
    next();
  } catch (err) {
    logger.error({ err }, "Auth error");
    res.status(401).json({ message: "Authentication failed" });
  }
}
