"use client";
import { authClient } from "@/lib/auth/auth-client";
import { motion } from "framer-motion";
function GithubBtn() {
  const handleGitHubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log(data);
  };
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGitHubSignIn}
      className="w-full py-3 border rounded-full flex items-center justify-center gap-2 hover:bg-gray-50"
    >
      <img
        src="https://www.svgrepo.com/show/475654/github-color.svg"
        className="w-5"
      />
      Continue with GitHub
    </motion.button>
  );
}

export default GithubBtn;
