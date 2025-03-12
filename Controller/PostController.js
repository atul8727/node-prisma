import { Prisma } from "@prisma/client";
import prisma from "../db/db.config.js";

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });

  return res.json({
    status: 200,
    data: newPost,
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

export const fetchUser = async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.json({
    status: 200,
    data: users,
  });
};

export const showUser = async (req, res) => {
  const userId = req.params.id;
  const getUser = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  res.json({
    status: 200,
    data: getUser,
  });
};
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  req.json({
    status: 200,
    data: "deleted successfully",
  });
};
