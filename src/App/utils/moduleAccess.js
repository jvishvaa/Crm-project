import {
  TbDatabase,
  TbFileUpload,
  TbLayoutDashboard,
  TbUser,
  TbUserSquare,
} from "react-icons/tb";
import { GrGroup, GrMapLocation, GrStatusPlaceholder } from "react-icons/gr";
import { LuUserPlus } from "react-icons/lu";
import { lazy } from "react";
import { RiOpenSourceLine, RiUserStarLine } from "react-icons/ri";
import { SiCoinmarketcap } from "react-icons/si";
import { FaUsersViewfinder } from "react-icons/fa6";
import {
  AiOutlineForm,
  AiOutlineFundView,
  AiOutlineUserSwitch,
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
} from "react-icons/ai";
import { MdOutlineEventNote, MdRoute } from "react-icons/md";

const modules = [
  {
    key: "1",
    icon: <TbLayoutDashboard />,
    label: "Dashboard",
    route: "/",
    permission: {
      is_view: [1, 2, 3, 4, 5],
    },
    component: lazy(() => import("../page/Dashboard")),
    is_route: true,
    is_sidebar: true,
  },
  {
    key: "2",
    route: "/profile",
    permission: {
      is_view: [1, 2, 3, 4, 5],
    },
    component: lazy(() => import("../page/Profile")),
    is_route: true,
    is_sidebar: false,
  },
  {
    key: "6",
    icon: <TbDatabase />,
    label: "Master Data",
    permission: {
      is_view: [1, 2, 3, 4, 5],
    },
    is_route: true,
    is_sidebar: true,
    children: [
      {
        key: "20",
        icon: <GrStatusPlaceholder />,
        label: "Activity Status",
        route: "/master-data/activity-status",
        permission: {
          is_view: [1, 2, 3, 4, 5],
          is_add: [1, 2, 3, 4, 5],
          is_modify: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/MasterData/ActivityStatus")),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "7",
        icon: <RiOpenSourceLine />,
        label: "Source Type",
        route: "/master-data/source-type",
        permission: {
          is_view: [1, 2, 3, 4, 5],
          is_add: [1, 2, 3, 4, 5],
          is_modify: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/MasterData/SourceType")),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "8",
        icon: <SiCoinmarketcap />,
        label: "Source",
        route: "/master-data/source",
        permission: {
          is_view: [1, 2, 3, 4, 5],
          is_add: [1, 2, 3, 4, 5],
          is_modify: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/MasterData/Source")),
        is_route: true,
        is_sidebar: true,
      },
    ],
  },
  {
    key: "24",
    icon: <TbUser />,
    label: "User Management",
    route: "/user-management",
    permission: {
      is_view: [1, 2, 3, 4, 5],
      is_modify: [1, 2, 3, 4, 5],
    },
    component: lazy(() => import("../page/UserManagement")),
    is_route: true,
    is_sidebar: true,
  },
  {
    key: "3",
    icon: <TbUserSquare />,
    label: "Lead Management",
    permission: {
      is_view: [1, 2, 3, 4, 5],
      is_add: [1, 2, 3, 4, 5],
      is_modify: [1, 2, 3, 4, 5],
    },
    is_route: true,
    is_sidebar: true,
    children: [
      {
        key: "5",
        icon: <LuUserPlus />,
        label: "Add Lead",
        route: "/lead-management/add-lead",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/LeadManagement/AddLead")),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "9",
        icon: <TbFileUpload />,
        label: "Bulk Upload Lead",
        route: "/lead-management/bulk-upload-lead",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/LeadManagement/BulkUploadLead")),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "10",
        route: "/lead-management/lead-details/:id",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/LeadManagement/LeadDetails")),
        is_route: true,
        is_sidebar: false,
      },
      {
        key: "4",
        icon: <GrGroup />,
        label: "All Leads",
        route: "/lead-management/all-leads",
        permission: {
          is_view: [1, 2, 3, 4, 5],
          is_add: [1, 2, 3, 4, 5],
          is_modify: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/LeadManagement/AllLeads")),
        is_route: true,
        is_sidebar: true,
      },
    ],
  },
  {
    key: "11",
    icon: <FaUsersViewfinder />,
    label: "Lead Assigning",
    permission: {
      is_view: [1, 2, 3, 4, 5],
      is_add: [1, 2, 3, 4, 5],
      is_modify: [1, 2, 3, 4, 5],
    },
    is_route: true,
    is_sidebar: true,
    children: [
      {
        key: "12",
        icon: <AiOutlineUsergroupAdd />,
        label: "Assign Leads To Counsellor",
        route: "/lead-assigning/assign-leads-to-counsellor",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() =>
          import("../page/LeadAssigning/AssignLeadToCounsellor")
        ),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "13",
        icon: <AiOutlineUserSwitch />,
        label: "Ressign Leads To Counsellor",
        route: "/lead-assigning/reassign-leads-to-counsellor",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() =>
          import("../page/LeadAssigning/ReassignLeadToCounsellor")
        ),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "14",
        icon: <AiOutlineUsergroupDelete />,
        label: "Unassign Leads From Counsellor",
        route: "/lead-assigning/unassign-leads-from-counsellor",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() =>
          import("../page/LeadAssigning/UnassignLeadFromCounsellor")
        ),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "15",
        icon: <RiUserStarLine />,
        label: "Regen and Assign Leads To Counsellor",
        route: "/lead-assigning/regen-and-assign-leads-to-counsellor",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() =>
          import("../page/LeadAssigning/RegenAndAssignDormantLeadToCounsellor")
        ),
        is_route: true,
        is_sidebar: true,
      },
    ],
  },
  {
    key: "16",
    icon: <MdRoute />,
    label: "Follow Up",
    route: "/lead-management/follow-up",
    permission: {
      is_view: [1, 2, 3, 4, 5],
      is_add: [1, 2, 3, 4, 5],
      is_modify: [1, 2, 3, 4, 5],
    },
    component: lazy(() => import("../page/FollowUp")),
    is_route: true,
    is_sidebar: true,
  },
  {
    key: "21",
    icon: <MdOutlineEventNote />,
    label: "Event Management",
    permission: {
      is_view: [1, 2, 3, 4, 5],
      is_add: [1, 2, 3, 4, 5],
      is_modify: [1, 2, 3, 4, 5],
    },
    is_route: true,
    is_sidebar: true,
    children: [
      {
        key: "22",
        icon: <GrMapLocation />,
        label: "Hotspots",
        route: "/event_management/hotspots",
        permission: {
          is_view: [1, 2, 3, 4, 5],
          is_add: [1, 2, 3, 4, 5],
          is_modify: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/EventManagement/Hotspots/")),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "23",
        icon: <MdOutlineEventNote />,
        label: "Events",
        route: "/event_management/events",
        permission: {
          is_view: [1, 2, 3, 4, 5],
          is_add: [1, 2, 3, 4, 5],
          is_modify: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/EventManagement/Events//")),
        is_route: true,
        is_sidebar: true,
      },
    ],
  },
  {
    key: "17",
    icon: <AiOutlineForm />,
    label: "Enquiry Form",
    permission: {
      is_view: [1, 2, 3, 4, 5],
      is_add: [1, 2, 3, 4, 5],
      is_modify: [1, 2, 3, 4, 5],
    },
    is_route: true,
    is_sidebar: true,
    children: [
      {
        key: "18",
        icon: <AiOutlineFundView />,
        label: "Digital Enquiry Form",
        route: "/enquiry-form/digital-enquiry-form",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() => import("../page/EnquiryForm/DigitalEnquiryForm")),
        is_route: true,
        is_sidebar: true,
      },
      {
        key: "19",
        route: "/enquiry-form/digital-enquiry-form/create-enquiry",
        permission: {
          is_view: [1, 2, 3, 4, 5],
        },
        component: lazy(() =>
          import("../page/EnquiryForm/DigitalEnquiryForm/CreateEnquiry")
        ),
        is_route: true,
      },
    ],
  },
];

export default modules;
