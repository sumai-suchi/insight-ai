import UserProfile from "@/lib/models/UserProfile";

export async function createUserProfile(betterAuthUser: any) {
  const existing = await UserProfile.findById(betterAuthUser.id);
  if (!existing) {
    await UserProfile.create({
      _id: betterAuthUser.id,
      name: betterAuthUser.name,
      email: betterAuthUser.email,
      role: "user",
      image: betterAuthUser.image || "default.jpg",
      bio: "",
      savedPosts: [],
    });
  }
}
