/** @format */

import modules from "../../../../utils/moduleAccess";

const menu = modules
  ?.filter((each) => each?.is_sidebar)
  ?.map((each) => {
    return {
      key: each?.key,
      icon: each?.icon,
      label: each?.label,
      ...(!each?.children ? { route: each?.route } : {}),
      user_level: each?.permission?.is_view,
      ...(each?.children
        ? {
            children: each?.children
              ?.filter((each1) => each1?.is_sidebar)
              ?.map((each1) => {
                return {
                  key: each1?.key,
                  icon: each1?.icon,
                  label: each1?.label,
                  ...(!each1?.children ? { route: each1?.route } : {}),
                  user_level: each1?.permission?.is_view,
                  ...(each1?.children
                    ? {
                        children: each1?.children
                          ?.filter((each2) => each2?.is_sidebar)
                          ?.map((each2) => {
                            return {
                              key: each2?.key,
                              icon: each2?.icon,
                              label: each2?.label,
                              ...(!each2?.children
                                ? { route: each2?.route }
                                : {}),
                              user_level: each2?.permission?.is_view,
                            };
                          }),
                      }
                    : {}),
                };
              }),
          }
        : {}),
    };
  });

export default menu;
