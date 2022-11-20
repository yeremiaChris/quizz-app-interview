export const requiredAuthenticaton = async (context, cb) => {
  const user = context.req.cookies["user"];
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanet: false,
      },
    };
  }

  return cb({ user });
};
