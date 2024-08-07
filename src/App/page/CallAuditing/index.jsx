import { CloudDownloadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Empty,
  Pagination,
  Radio,
  Row,
  Spin,
  Table,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BiIdCard } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { MdFilterAlt, MdListAlt } from "react-icons/md";
import getCardDataText from "../../component/UtilComponents/CardDataText";
import CustomBreadCrumbs from "../../component/UtilComponents/CustomBreadCrumbs";
import CustomCard from "../../component/UtilComponents/CustomCard";
import RenderFilterTag from "../../component/UtilComponents/RenderFilterTag";
import useWindowDimensions from "../../component/UtilComponents/useWindowDimensions";
import getArrayValues from "../../utils/getArrayValues";
import getChangedCountValues from "../../utils/getChangeCountObject";
import DrawerFilter from "./drawerFilter";
const fakeData = [
  {
    id: 1969506,
    lead_history__lead__lead_name: "Manasi Sakharkar",
    lead_history__lead_id: 14991033,
    lead_history__lead__lead_contact_no: "9503937970",
    lead_history__lead__branch__branch_name: "ORCHIDS Malad West",
    created_at: "2024-08-06T08:32:55.221474",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806083029_9503937970.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "DM",
    lead_history__lead__contact_source__sub_name: "direct",
    lead_history__call_duration: 113,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Namira Hanif Lambe",
  },
  {
    id: 1969507,
    lead_history__lead__lead_name: "chandar shekhar",
    lead_history__lead_id: 15247750,
    lead_history__lead__lead_contact_no: "7976996777",
    lead_history__lead__branch__branch_name: "ORCHIDS Saran Nagar",
    created_at: "2024-08-06T08:37:35.799151",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806083609_7976996777.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 42,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Shivani Rawat",
  },
  {
    id: 1969508,
    lead_history__lead__lead_name: "shridhar",
    lead_history__lead_id: 14616539,
    lead_history__lead__lead_contact_no: "9900244100",
    lead_history__lead__branch__branch_name: "ORCHIDS Jalahalli",
    created_at: "2024-08-06T08:45:17.821332",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806084428_9900244100.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 15,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "RIYA KUMARI",
  },
  {
    id: 1969509,
    lead_history__lead__lead_name: "Ramya",
    lead_history__lead_id: 15323277,
    lead_history__lead__lead_contact_no: "9880260064",
    lead_history__lead__branch__branch_name: "ORCHIDS Yelahanka",
    created_at: "2024-08-06T08:46:35.429141",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806084600_9880260064.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Stores",
    lead_history__call_duration: 7,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Priya Merina Dsouza",
  },
  {
    id: 1969510,
    lead_history__lead__lead_name: "Raghavendra",
    lead_history__lead_id: 15308022,
    lead_history__lead__lead_contact_no: "9502704720",
    lead_history__lead__branch__branch_name: "ORCHIDS Kapra",
    created_at: "2024-08-06T08:46:42.371132",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806084617_9502704720.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 3,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Jyothi Kiranmai",
  },
  {
    id: 1969511,
    lead_history__lead__lead_name: "rupali acham",
    lead_history__lead_id: 12639845,
    lead_history__lead__lead_contact_no: "9767542264",
    lead_history__lead__branch__branch_name: "ORCHIDS Manjari",
    created_at: "2024-08-06T08:51:25.813821",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806084956_9767542264.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Others",
    lead_history__call_duration: 42,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Manisha Nandu Sarkate",
  },
  {
    id: 1969512,
    lead_history__lead__lead_name: "Santhosh Kumar",
    lead_history__lead_id: 11306149,
    lead_history__lead__lead_contact_no: "9986047239",
    lead_history__lead__branch__branch_name: "ORCHIDS Jalahalli",
    created_at: "2024-08-06T08:51:34.672032",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806084919_9986047239.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 104,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "RIYA KUMARI",
  },
  {
    id: 1969513,
    lead_history__lead__lead_name: "Orchids@123",
    lead_history__lead_id: 15323096,
    lead_history__lead__lead_contact_no: "9705067779",
    lead_history__lead__branch__branch_name: "ORCHIDS Kapra",
    created_at: "2024-08-06T08:52:50.296701",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806085211_9705067779.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Stores",
    lead_history__call_duration: 6,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Jyothi Kiranmai",
  },
  {
    id: 1969514,
    lead_history__lead__lead_name: "Venkar praneeth",
    lead_history__lead_id: 15315872,
    lead_history__lead__lead_contact_no: "9538379019",
    lead_history__lead__branch__branch_name: "ORCHIDS Hennur",
    created_at: "2024-08-06T08:55:14.018065",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806085355_9538379019.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 45,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Lakshmi S",
  },
  {
    id: 1969516,
    lead_history__lead__lead_name: "tarate",
    lead_history__lead_id: 12992554,
    lead_history__lead__lead_contact_no: "9096400762",
    lead_history__lead__branch__branch_name: "ORCHIDS Manjari",
    created_at: "2024-08-06T08:59:46.458087",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806085810_9096400762.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 70,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Manisha Nandu Sarkate",
  },
  {
    id: 1969518,
    lead_history__lead__lead_name: "Pavan",
    lead_history__lead_id: 15326494,
    lead_history__lead__lead_contact_no: "9945631981",
    lead_history__lead__branch__branch_name: "ORCHIDS Horamavu",
    created_at: "2024-08-06T09:03:37.703490",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806090157_9945631981.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 49,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "A Pavithra",
  },
  {
    id: 1969519,
    lead_history__lead__lead_name: "Shanvi De ",
    lead_history__lead_id: 15308161,
    lead_history__lead__lead_contact_no: "6295821840",
    lead_history__lead__branch__branch_name: "ORCHIDS Masjid Bunder",
    created_at: "2024-08-06T09:03:58.021474",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806090159_6295821840.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "Value Leaf",
    lead_history__lead__contact_source__sub_name: null,
    lead_history__call_duration: 66,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Afsana Sayyed",
  },
  {
    id: 1969520,
    lead_history__lead__lead_name: "Sarangi",
    lead_history__lead_id: 14455680,
    lead_history__lead__lead_contact_no: "9746367802",
    lead_history__lead__branch__branch_name: "ORCHIDS Vijaya nagar",
    created_at: "2024-08-06T09:04:25.995129",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806090334_9746367802.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "Slash Incoming Call",
    lead_history__lead__contact_source__sub_name: null,
    lead_history__call_duration: 24,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Pooja Y",
  },
  {
    id: 1969521,
    lead_history__lead__lead_name: "Chandra Shekhar",
    lead_history__lead_id: 15289541,
    lead_history__lead__lead_contact_no: "9780085466",
    lead_history__lead__branch__branch_name: "ORCHIDS Thoraipakkam",
    created_at: "2024-08-06T09:05:23.088383",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806090404_9780085466.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 36,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Sumalatha M",
  },
  {
    id: 1969778,
    lead_history__lead__lead_name: "narender",
    lead_history__lead_id: 15315723,
    lead_history__lead__lead_contact_no: "9991600837",
    lead_history__lead__branch__branch_name: "ORCHIDS Sonipat",
    created_at: "2024-08-06T10:30:33.267745",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806102515_9991600837.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 274,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Neelam Jha",
  },
  {
    id: 1969780,
    lead_history__lead__lead_name: "manju",
    lead_history__lead_id: 15317068,
    lead_history__lead__lead_contact_no: "9896118236",
    lead_history__lead__branch__branch_name: "ORCHIDS New Braham Colony",
    created_at: "2024-08-06T10:31:04.397671",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806102858_9896118236.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 71,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Kiran",
  },
  {
    id: 1969782,
    lead_history__lead__lead_name: "santhosh",
    lead_history__lead_id: 15320380,
    lead_history__lead__lead_contact_no: "7760584493",
    lead_history__lead__branch__branch_name: "ORCHIDS Horamavu",
    created_at: "2024-08-06T10:31:28.063079",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103022_7760584493.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 19,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "A Pavithra",
  },
  {
    id: 1969784,
    lead_history__lead__lead_name: "asif khan",
    lead_history__lead_id: 15326459,
    lead_history__lead__lead_contact_no: "7829790019",
    lead_history__lead__branch__branch_name: "ORCHIDS Sahakar Nagar",
    created_at: "2024-08-06T10:31:48.469233",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806102916_7829790019.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 101,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Adarsha D",
  },
  {
    id: 1969785,
    lead_history__lead__lead_name: "sushil Kumar",
    lead_history__lead_id: 14843479,
    lead_history__lead__lead_contact_no: "9971237173",
    lead_history__lead__branch__branch_name: "ORCHIDS Thoraipakkam",
    created_at: "2024-08-06T10:31:50.545454",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103116_9971237173.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "DM",
    lead_history__lead__contact_source__sub_name: "FB Internal leadform",
    lead_history__call_duration: 4,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Sunita Thakur",
  },
  {
    id: 1969787,
    lead_history__lead__lead_name: "sreelatha",
    lead_history__lead_id: 15306887,
    lead_history__lead__lead_contact_no: "9949936352",
    lead_history__lead__branch__branch_name: "ORCHIDS Jubilee Hills",
    created_at: "2024-08-06T10:32:34.691365",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103157_9949936352.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "My School  gate",
    lead_history__lead__contact_source__sub_name: null,
    lead_history__call_duration: 11,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Ranjitha V Hiremath",
  },
  {
    id: 1969788,
    lead_history__lead__lead_name: "M dhoot",
    lead_history__lead_id: 15328959,
    lead_history__lead__lead_contact_no: "9823338846",
    lead_history__lead__branch__branch_name: "ORCHIDS TCH Aurangabad",
    created_at: "2024-08-06T10:32:35.258421",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103129_9823338846.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 34,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Shreya Joshi",
  },
  {
    id: 1969789,
    lead_history__lead__lead_name: "Shakira Banu",
    lead_history__lead_id: 15314993,
    lead_history__lead__lead_contact_no: "9092110305",
    lead_history__lead__branch__branch_name: "ORCHIDS Jakkur",
    created_at: "2024-08-06T10:32:42.988820",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103044_9092110305.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Mall",
    lead_history__call_duration: 89,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Pravallika K",
  },
  {
    id: 1969791,
    lead_history__lead__lead_name: "Santosh",
    lead_history__lead_id: 15314660,
    lead_history__lead__lead_contact_no: "9880041269",
    lead_history__lead__branch__branch_name: "ORCHIDS Hennur",
    created_at: "2024-08-06T10:32:50.474979",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103126_9880041269.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 38,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Lakshmi S",
  },
  {
    id: 1969793,
    lead_history__lead__lead_name: "Sahej khan",
    lead_history__lead_id: 14483630,
    lead_history__lead__lead_contact_no: "6378109448",
    lead_history__lead__branch__branch_name: "ORCHIDS Saran Nagar",
    created_at: "2024-08-06T10:33:11.095267",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.20/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103207_6378109448.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 18,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Shreshtha Gandhi",
  },
  {
    id: 1969794,
    lead_history__lead__lead_name: "viren",
    lead_history__lead_id: 15063468,
    lead_history__lead__lead_contact_no: "9920608805",
    lead_history__lead__branch__branch_name: "ORCHIDS Sion",
    created_at: "2024-08-06T10:33:15.986973",
    audit_done_datetime: null,
    lead_history__record_url:
      "https://cloudcc.airtellive.com:445/10.251.251.19/recordings/ho.k12.airtel.com/archive/2024/Aug/06/20240806103238_9920608805.mp3",
    rating: null,
    remarks: null,
    created_by_id: null,
    created_by__first_name: null,
    lead_history__lead__contact_source__source_name: "PRO Data",
    lead_history__lead__contact_source__sub_name: "Field Data",
    lead_history__call_duration: 7,
    sales_pitch_quality: null,
    persuasion_quality: null,
    objection_handling: null,
    calling_user: "Firdos Riyaz Shah",
  },
];
const defaultFilters = {
  academic_year: ["2024-25"],
  branch: [0],
  counsellor: [0],
  lead_source: [0],
  lead_category: [0],
  audit_status: false,
  date_range: [dayjs(), dayjs()],
};
const dropdownData = {
  academicYear: [
    { label: "2023-24", value: "2023-24" },
    { label: "2024-25", value: "2024-25" },
  ],
  branch: [
    { label: "All", value: 0 },
    { label: "Orchids BTM Layout", value: "btm-layout" },
    { label: "Orchids Banerghata", value: "banerghata" },
    { label: "Orchids Newtown", value: "newtown" },
  ],
  source: [
    { label: "All", value: 0 },
    { label: "DM - Website", value: "dm-website" },
    { label: "DM - Edustroke", value: "dm-edustroke" },
    {
      label: "Pro Data - Apartment",
      value: "pro-data-apartment",
    },
  ],
  auditStatus: [
    { label: "All", value: "-1" },
    { label: "Yes", value: true },
    { label: "No", value: false },
  ],
  counsellor: [],
};
const CallAuditing = () => {
  const [loading, setLoading] = useState(false);
  const [drawerData, setDrawerData] = useState({ show: false, data: null });
  const [showFilterView, setShowFilterView] = useState(false);
  const [callList, setCallList] = useState([]);
  const [filterData, setFilterData] = useState({
    ...defaultFilters,
  });
  const [pageData, setPageData] = useState({
    current: 1,
    pageSize: 15,
    total: 0,
  });
  const [isList, setIsList] = useState(true);
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (width <= 991) {
      setShowFilterView(false);
      setIsList(false);
    } else {
      setShowFilterView(true);
      setIsList(true);
    }
  }, [width]);

  const getCallList = () => {
    setLoading(true);
    setTimeout(() => {
      setCallList(fakeData);
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const checkFilterDifference = () => {
    return getChangedCountValues(
      {
        ...defaultFilters,
        date_range: [
          dayjs().format("YYYY-MM-DD"),
          dayjs().format("YYYY-MM-DD"),
        ],
      },
      {
        ...filterData,
        date_range: [
          dayjs(filterData?.date_range[0]).format("YYYY-MM-DD"),
          dayjs(filterData?.date_range[1]).format("YYYY-MM-DD"),
        ],
      }
    );
  };
  const renderFilterView = () => {
    return (
      <Row className="d-flex flex-row align-items-center" gutter={[4, 4]}>
        <Col>
          <Typography style={{ marginTop: 4 }} className="th-12 th-fw-500">
            Filter:
          </Typography>
        </Col>
        <Col>
          <RenderFilterTag
            label="Academic Year"
            value={getArrayValues(
              dropdownData?.academicYear?.filter((each) =>
                filterData?.academic_year?.includes(each?.value)
              ),
              "label"
            )?.join(", ")}
          />
        </Col>
        {!filterData?.branch?.includes(0) && (
          <Col>
            <RenderFilterTag
              label="Branch"
              value={getArrayValues(
                dropdownData?.branch?.filter((each) =>
                  filterData?.branch?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        )}
        {!filterData?.lead_source?.includes(0) && (
          <Col>
            <RenderFilterTag
              label="Source"
              value={getArrayValues(
                dropdownData?.source?.filter((each) =>
                  filterData?.lead_source?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        )}
        {!filterData?.counsellor?.includes(0) ? (
          <Col>
            <RenderFilterTag
              label="Lead Type"
              value={getArrayValues(
                dropdownData?.counsellor?.filter((each) =>
                  filterData?.counsellor?.includes(each?.value)
                ),
                "label"
              )?.join(", ")}
            />
          </Col>
        ) : null}

        <Col>
          <RenderFilterTag
            label="Date"
            value={
              dayjs(filterData?.date_range[0]).isSame(filterData?.date_range[1])
                ? dayjs(filterData?.date_range[0]).format("DD MMM YYYY")
                : `${dayjs(filterData?.date_range[0]).format(
                    "DD MMM YYYY"
                  )} to ${dayjs(filterData?.date_range[1]).format(
                    "DD MMM YYYY"
                  )}`
            }
          />
        </Col>
        {checkFilterDifference() && width > 768 ? (
          <Col className="pl-2" style={{ marginTop: 4 }}>
            {getClearFilters()}
          </Col>
        ) : null}
      </Row>
    );
  };
  const getClearFilters = () => {
    return (
      <Button
        size="small"
        type="link"
        style={{ whiteSpace: "normal" }}
        onClick={() => {
          setFilterData({ ...defaultFilters });
          getCallList();
        }}
      >
        Clear Filters
      </Button>
    );
  };
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Lead Name",
      dataIndex: "lead_history__lead__lead_name",
      key: "lead_name",
    },
    {
      title: "Contact No.",
      dataIndex: "lead_history__lead__lead_contact_no",
      key: "contact_no",
      render: (text) => (
        <span>{text.slice(0, -4).replace(/\d/g, "*") + text.slice(-4)}</span>
      ),
    },
    {
      title: "Branch",
      dataIndex: "lead_history__lead__branch__branch_name",
      key: "branch",
    },
    {
      title: "Source",
      dataIndex: "lead_history__lead__contact_source__source_name",
      key: "source",
    },
    {
      title: "Call Duration",
      dataIndex: "lead_history__call_duration",
      key: "call_duration",
      render: (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => <a>▶</a>,
    },
  ];
  return (
    <CustomCard>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <Row className="d-flex flex-column" gutter={[2, 2]}>
            <Col xs={24}>
              <Row className="d-flex flex-row justify-content-between">
                <Col>
                  <CustomBreadCrumbs data={["Call Auditing"]} />
                </Col>
                <Col>
                  <Row
                    className="d-flex flex-row align-items-center"
                    gutter={[8, 4]}
                  >
                    <Col>
                      <Button
                        size="small"
                        type="primary"
                        icon={<CloudDownloadOutlined size={18} />}
                      >
                        Today Report
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <Divider className="mt-2" />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Spin spinning={loading} tip="Loading">
            <Row
              className="d-flex flex-column flex-nowrap"
              style={{ minHeight: "60vh" }}
            >
              <Col xs={24} sm={24} md={24} lg={24}>
                <Row
                  className="d-flex flex-row justify-content-end align-items-center"
                  gutter={[8, 8]}
                >
                  <Col>
                    <Radio.Group
                      className="lead-radio"
                      options={[
                        { value: true, label: <MdListAlt size={20} /> },
                        { value: false, label: <BiIdCard size={20} /> },
                      ]}
                      onChange={(e) => {
                        setIsList(e.target.value);
                      }}
                      value={isList}
                      optionType="button"
                      buttonStyle="solid"
                    />
                  </Col>
                  <Col>
                    <Button
                      size="medium"
                      type="primary"
                      className="lead-button"
                      onClick={() => {
                        setDrawerData({ show: true, data: filterData });
                      }}
                      icon={<MdFilterAlt size={14} />}
                    >
                      Filter
                      {/* {checkFilterDifference()
                            ? `(${checkFilterDifference()})`
                            : ""} */}
                    </Button>
                  </Col>
                </Row>
              </Col>
              {width <= 768 ? (
                <Col xs={24} className={width < 576 ? "mt-2" : "mt-0"}>
                  <Row
                    className="d-flex flex-row justify-content-end align-items-center"
                    gutter={[4, 4]}
                  >
                    {checkFilterDifference() ? (
                      <Col xs={4} style={{ textAlign: "right" }}>
                        {getClearFilters()}
                      </Col>
                    ) : null}
                    <Col xs={4} style={{ textAlign: "right" }}>
                      <Button
                        type="link"
                        onClick={() => {
                          setShowFilterView(!showFilterView);
                        }}
                        style={{ whiteSpace: "normal" }}
                      >
                        {showFilterView ? "Hide Filters" : "Show Filters"}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              ) : null}
              {showFilterView ? (
                <Col xs={24} className={"mt-1"}>
                  {renderFilterView()}
                </Col>
              ) : null}
              {callList?.length > 0 ? (
                isList ? (
                  <Col xs={24} className={"mt-2"}>
                    <Table
                      columns={columns}
                      dataSource={fakeData}
                      rowKey="id"
                      pagination={{
                        ...pageData,
                      }}
                    />
                  </Col>
                ) : (
                  <>
                    <Col xs={24} className={"mt-2"}>
                      <Row className={"d-flex"} gutter={[8, 8]}>
                        {callList?.map((each, index) => (
                          <Col xs={24} sm={12} lg={8} key={index}>
                            <CustomCard style={{ height: "100%" }}>
                              <Row gutter={[4, 4]} className={"d-flex"}>
                                <Col xs={24}>
                                  <Row
                                    gutter={[4, 4]}
                                    className={"d-flex flex-nowrap"}
                                  >
                                    <Col xs={18}>
                                      <Row
                                        className={
                                          "d-flex flex-column flex-nowrap"
                                        }
                                      >
                                        <Col xs={24}>
                                          <Typography className="th-13 th-fw-500">
                                            {each?.lead_history__lead__lead_name ||
                                              "NA"}
                                          </Typography>
                                        </Col>
                                        <Col xs={24}>
                                          <Typography className="th-12">
                                            {"+917937363636"}
                                          </Typography>
                                        </Col>
                                        <Col xs={24}>
                                          <Typography
                                            className="th-12"
                                            style={{
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            {"anik.chowdhury@orchids.edu.in"}
                                          </Typography>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col xs={6}>
                                      <Row className="d-flex flex-row justify-content-end">
                                        <Tooltip title="Play Recording">
                                          <Button
                                            type="iconbutton"
                                            icon={<IoPlay size={25} />}
                                          />
                                        </Tooltip>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                                <Divider />
                                <Col xs={24}>
                                  <Descriptions column={1}>
                                    {getCardDataText(
                                      "Source",
                                      each?.lead_history__lead__contact_source__source_name ||
                                        "--"
                                    )}
                                    {getCardDataText(
                                      "Branch",
                                      each?.lead_history__lead__branch__branch_name ||
                                        "--"
                                    )}
                                    {getCardDataText(
                                      "Created Date",
                                      dayjs(each?.created_at).format(
                                        "DD MMM YYYY hh:mm a"
                                      )
                                    )}
                                    {getCardDataText(
                                      "Call Duration",
                                      `${
                                        Math.floor(
                                          each?.lead_history__call_duration / 60
                                        ) +
                                        "m " +
                                        (each?.lead_history__call_duration %
                                          60) +
                                        "s"
                                      }`
                                    )}
                                  </Descriptions>
                                </Col>
                                <Divider />
                              </Row>
                            </CustomCard>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col xs={24} className="mt-2 d-flex justify-content-center">
                      <Pagination
                        current={pageData?.page}
                        pageSize={pageData?.pageSize}
                        // onChange={handleCardChange}
                        total={pageData?.total}
                      />
                    </Col>
                  </>
                )
              ) : (
                <Col xs={24} className={"mt-2"}>
                  <CustomCard
                    style={{ minHeight: 200 }}
                    className={
                      "d-flex justify-content-center align-items-center"
                    }
                  >
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </CustomCard>
                </Col>
              )}
            </Row>
          </Spin>
        </Col>
      </Row>
      <DrawerFilter
        drawerData={drawerData}
        onSubmit={(values) => {
          setDrawerData({ show: false, data: null });
          setFilterData({ ...filterData, ...values });
          getCallList();
        }}
        dropdownData={dropdownData}
        closeDrawer={() => {
          setDrawerData({ show: false, data: null });
        }}
      />
    </CustomCard>
  );
};

export default CallAuditing;
