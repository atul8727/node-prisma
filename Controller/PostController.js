import prisma from "../db/db.config.js";

export const createPost = async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;
    if (!user_id || !title || !description) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const post = await prisma.post.create({
      data: { user_id: Number(user_id), title, description },
    });

    const formattedPost = {
      ...post,
      comment_count: post.comment_count.toString(), // Convert BigInt to string
    };

    res.handleResponse({
      data: formattedPost,
      message: "Post created successfully",
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { user_id, title, description } = req.body;
    const { id } = req.params;
    if (!id || !user_id || !title || !description) {
      return next({
        statusCode: 400,
        message: "All fields are required",
      });
    }

    const post = await prisma.post.update({
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

export const fetchPosts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 1;

    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 100) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      skip: skip,
      take: limit,
      include: {
        comment: {
          include: {
            user: true,
          },
        },
      },
    });

    const formattedPosts = posts.map((post) => ({
      ...post,
      comment_count: post.comment_count.toString(), // Convert BigInt to string
    }));

    const totalpost = await prisma.post.count();
    const totalPages = Math.ceil(totalpost / limit);

    res.handleResponse({
      data: formattedPosts,
      message: "Posts retrieved successfully",
      meta: {
        totalPages: totalPages,
        current: page,
        limit: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const findPost = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
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

export const deletePost = async (req, res, next) => {
  try {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.handleResponse({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const searchPost = async (req, res, next) => {
  try {
    let query = req.param.q;
    const post = await prisma.post.findMany({
      where: {
        description: {
          search: query,
        },
      },
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
