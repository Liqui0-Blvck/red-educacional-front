type Page = {
  to?: string;
  subPages?: { [key: string]: Page };
};

export const extractRoutes = (pages: { [key: string]: Page }): string[] => {
  let routes: string[] = [];

  const extract = (page: Page) => {
    if (page.to) {
      routes.push(page.to);
    }
    if (page.subPages) {
      Object.values(page.subPages).forEach(extract);
    }
  };

  Object.values(pages).forEach(extract);
  return routes;
};
