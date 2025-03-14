import { Prisma } from "@prisma/client";
import prisma from "../db/db.config.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
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

  const newUser = await prisma.user.create({
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

export const fetchUser = async (req, res) => {
  const users = await prisma.user.findMany({
    // include: {
    //   //   post: true,
    //   post: {
    //     select: {
    //       title: true,
    //       comment_count: true,
    //     },
    //   },
    // },
    select: {
      _count: {
        select: {
          post: true,
          comment: true,
        },
      },
    },
  });

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
