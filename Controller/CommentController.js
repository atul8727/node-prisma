import prisma from "../db/db.config.js";

export const createComment = async (req, res, next) => {
  try {
    const { user_id, post_id, comment } = req.body;
    if (!user_id || !comment || !post_id) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    await prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });

    const post = await prisma.comment.create({
      data: { user_id: Number(user_id), post_id: Number(post_id), comment },
    });

    res.handleResponse({
      data: post,
      message: "Comment created successfully",
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;
    const { id } = req.params;
    if (!id || !user_id || !title || !description) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const post = await prisma.comment.update({
      where: { id: Number(id) },
      data: { user_id: Number(user_id), title, description },
    });
    res.handleResponse({
      data: post,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchComment = async (req, res, next) => {
  try {
    const Comment = await prisma.comment.findMany({
      include: {
        post: true,
      },
    });

    res.handleResponse({
      data: Comment,
      message: "Comment retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const findComment = async (req, res, next) => {
  try {
    const post = await prisma.comment.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!post) return next({ statusCode: 404, message: "Post not found" });

    res.handleResponse({
      data: post,
      message: "Post retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await prisma.comment.delete({ where: { id: Number(req.params.id) } });
    res.handleResponse({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
