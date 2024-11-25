import prisma from "../config/prisma.js";

export const getUserTemplates = async (req) => {
  const page = parseInt(req.query.page) || 1;

  const templates = await getTemplatesByUserId(req.currentUser.id, page, 10);
  const totalCount = await prisma.template.count({
    where: { userId: req.currentUser.id },
  });

  return { templates, totalCount, currentPage: page };
};

export const getTemplatesByUserId = async (userId, page, offset = 10) => {
  const skip = page ? (page - 1) * offset : 0;
  const templates = await prisma.template.findMany({
    take: offset,
    skip,
    where: {
      userId: { equals: userId },
    },
  });
  return templates;
};
