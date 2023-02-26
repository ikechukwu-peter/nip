export const capitalizeRoute = (route: string): string => {
  return (
    route.split("/")[1].charAt(0).toUpperCase() + route.split("/")[1].slice(1)
  );
};
