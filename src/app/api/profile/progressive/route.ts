import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Collection, Document } from "mongodb";
import { auth } from "@/lib/auth/auth";

type ProgressiveAnswers = {
  industry?: string;
  teamSize?: string;
  workType?: string;
  companyName?: string;
  websiteUrl?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizeUrl(url: string): string | null {
  const raw = url.trim();
  if (!raw) return "";
  try {
    // Allow user to paste "example.com" (add https://)
    const withProto =
      raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
    const u = new URL(withProto);
    return u.toString();
  } catch {
    return null;
  }
}

async function getSessionUser(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) return null;
  return session.user;
}

function getBetterAuthUserCollection(): { client: MongoClient; collection: Collection<Document> } {
  const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string);
  const db = client.db("Better_Auth");
  return { client, collection: db.collection("user") };
}

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const { client, collection } = getBetterAuthUserCollection();
  try {
    await client.connect();
    // BetterAuth stores a string `id` like "user_xxx" alongside the internal `_id`
    const doc = await collection.findOne({ id: user.id });

    return NextResponse.json({
      answers: {
        industry: (doc as any)?.industry || "",
        teamSize: (doc as any)?.teamSize || "",
        workType: (doc as any)?.workType || "",
        companyName: (doc as any)?.companyName || "",
        websiteUrl: (doc as any)?.websiteUrl || "",
      },
      profiling: {
        completedAt: (doc as any)?.profilingCompletedAt || null,
        updatedAt: (doc as any)?.profilingCompletedAt || null,
        version: 1,
      },
    });
  } finally {
    await client.close();
  }
}

export async function PUT(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as ProgressiveAnswers | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const industry = (body.industry ?? "").trim();
  const teamSize = (body.teamSize ?? "").trim();
  const workType = (body.workType ?? "").trim();
  const companyName = (body.companyName ?? "").trim();
  const websiteUrlRaw = (body.websiteUrl ?? "").trim();

  if (!isNonEmptyString(industry))
    return NextResponse.json({ error: "industry is required" }, { status: 400 });
  if (!isNonEmptyString(teamSize))
    return NextResponse.json({ error: "teamSize is required" }, { status: 400 });
  if (!isNonEmptyString(workType))
    return NextResponse.json({ error: "workType is required" }, { status: 400 });

  const websiteUrl = websiteUrlRaw ? normalizeUrl(websiteUrlRaw) : "";
  if (websiteUrlRaw && websiteUrl === null) {
    return NextResponse.json({ error: "websiteUrl is invalid" }, { status: 400 });
  }

  const { client, collection } = getBetterAuthUserCollection();
  const now = new Date();

  try {
    await client.connect();

    // Upsert ensures a document exists for this BetterAuth user id,
    // even if for some reason it wasn't created yet by the adapter.
    await collection.updateOne(
      { id: user.id },
      {
        $set: {
          industry,
          teamSize,
          workType,
          companyName,
          websiteUrl: websiteUrl || "",
          profilingCompletedAt: now,
        },
      },
      { upsert: true },
    );

    const updated = await collection.findOne({ id: user.id });

    return NextResponse.json({
      ok: true,
      answers: {
        industry: (updated as any)?.industry || "",
        teamSize: (updated as any)?.teamSize || "",
        workType: (updated as any)?.workType || "",
        companyName: (updated as any)?.companyName || "",
        websiteUrl: (updated as any)?.websiteUrl || "",
      },
      profiling: {
        completedAt: (updated as any)?.profilingCompletedAt || now,
        updatedAt: (updated as any)?.profilingCompletedAt || now,
        version: 1,
      },
    });
  } finally {
    await client.close();
  }
}

