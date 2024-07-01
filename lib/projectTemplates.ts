export const templates = [{ id: 1019731531, name: "Blank Project" }];

export const isTemplateId = (id: number) =>
  templates.some((template) => template.id === id);
