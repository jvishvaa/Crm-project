/* eslint-disable */

import modules from "./moduleAccess";

const getRoutePathDetails = (path = "") => {
  let userLevelId = JSON.parse(localStorage.getItem("user"))?.user_level?.id;

  let pathName = path ? path : window.location.pathname;
  let myRouteData = [];
  modules?.map((each) => {
    if (each.children?.length) {
      each.children?.map((each1) => {
        if (each1.children?.length) {
          each1.children?.map((each2) => {
            myRouteData.push(each2);
          });
        } else {
          myRouteData.push(each1);
        }
      });
    } else {
      myRouteData.push(each);
    }
  });

  let mObj = myRouteData?.filter((a) =>
    a.route?.endsWith("/") && pathName?.endsWith("/")
      ? pathName.substring(0, pathName.length - 1) ===
        a.route.substring(0, pathName.length - 1)
      : !a.route?.endsWith("/") && pathName?.endsWith("/")
      ? pathName.substring(0, pathName.length - 1) === a.route
      : a.route?.endsWith("/") && !pathName?.endsWith("/")
      ? pathName === a.route.substring(0, pathName.length - 1)
      : pathName === a.route
  );

  return {
    add: mObj?.length
      ? mObj[mObj?.length - 1].permission?.is_add?.includes(userLevelId)
        ? true
        : false
      : false,
    view: mObj?.length
      ? mObj[mObj?.length - 1].permission?.is_view?.includes(userLevelId)
        ? true
        : false
      : true,
    modify: mObj?.length
      ? mObj[mObj?.length - 1].permission?.is_modify?.includes(userLevelId)
        ? true
        : false
      : false,
  };
};

export default getRoutePathDetails;
