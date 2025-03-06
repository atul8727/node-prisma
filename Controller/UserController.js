import primsa from "../db/db.config.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await primsa.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "User already exist",
    });
  }

  const newUser = await primsa.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  return res.json({
    status: 200,
    data: newUser,
    msg: "created successfully",
  });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;

  const { name, email, password } = req.body;

  await primsa.user.update({
    where: {
      id: Number(userId),
    },

    data: {
      name,
      email,
      password,
    },
  });

  return res.json({
    status: 200,
    message: "user Updated",
  });
};
