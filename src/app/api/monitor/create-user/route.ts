// pages/api/admin/create-user.ts
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongoose-connect/connect-db";
import { UserCurd } from "@/lib/mongoose-connect/User";






export async function POST(req: Request) {
  try {
     await connectMongo();
    const body = await req.json();

  

    const newUser = await UserCurd.create({
      name: body.name,
      email: body.email,
      role: body.role || "user",
      image: body.image,
      bio: body.bio,
      plan: body.plan,
      discount: body.discount,
      article: body.article,
      isBlocked: body.isBlocked,
      emailVerified: body.emailVerified,
      createdAt: new Date(),
      updatedAt: new Date(),
      joinedAt: new Date(),
    });

    return NextResponse.json(newUser, { status: 201 });

  } catch (error: any) {

    // ✅ Handle duplicate email
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists " },
        { status: 409 }
      );
    }

    console.error("Create user error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// export async function POST(req: Request) {
//   try {
//     await connectMongo();
//     const body = await req.json();
    
//     const existingUser = await UserCurd.findOne({ email: body.email });

//     if (existingUser) {
//       return new Response(
//         JSON.stringify({ message: "Email already exists" }),
//         { status: 409 }
//       );
//     }
//     const newUser = await UserCurd.create({
//       name: body.name,
//       email: body.email,
//       role: body.role || "user" ,
//       status: body.status || "active",
//       discount: body.discount || 0,
//       image: body.image || "",
//       plan: body.plan || "free",
//       article: body.article || 0,
//       emailVerified: body.emailVerified || false,
//       joinedAt: new Date(),
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (err) {
//     console.error("Create user error:", err);
//     return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
//   }
// }