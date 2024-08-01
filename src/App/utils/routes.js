import modules from "./moduleAccess";

const routes = [];

modules
  ?.filter((each) => each?.is_route)
  ?.map((each) => {
    if (each?.children) {
      each?.children
        ?.filter((each1) => each1?.is_route)
        ?.map((each1) => {
          if (each1?.children) {
            each1?.children
              ?.filter((each2) => each2?.is_route)
              ?.map((each2) => {
                routes.push({
                  path: each2.route,
                  exact: true,
                  Component: each2.component,
                  user_levels: each2.permission?.is_view,
                });
              });
          } else {
            routes.push({
              path: each1.route,
              exact: true,
              Component: each1.component,
              user_levels: each1.permission?.is_view,
            });
          }
        });
    } else {
      routes.push({
        path: each.route,
        exact: true,
        Component: each.component,
        user_levels: each.permission?.is_view,
      });
    }
  });

export default routes;
