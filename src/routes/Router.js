import { lazy } from "react";
import AuthRoutes from "./AuthRoutes";

//Lazy loading and code splitting
//Analytics
const Home = lazy(() => import("../views/_spanalytics/home"));
const OnSite = lazy(() => import("../views/_spanalytics/onsite"));
const BigData = lazy(() => import("../views/_spanalytics/bigdata"));
const Presence = lazy(() => import("../views/_spanalytics/presence"));
const HotSpot = lazy(() => import("../views/_spanalytics/hotspot"));

//Marketing
const ContentManagement = lazy(() => import("../views/_spmarketing/contentmanagement"));
const CampaignEditor = lazy(() => import("../views/_spmarketing/campaigneditor"));
const SmartPoke = lazy(() => import("../views/_spmarketing/smartpoke"));

//Performance
const CampaignDetailed = lazy(() => import("../views/_spperformance/campaigndetailed"));
const CamapignEffectiveness = lazy(() => import("../views/_spperformance/campaigneffectiveness"));

//configurations
const Spot = lazy(() => import("../views/_spconfigurations/spots"));
const Zone = lazy(() => import("../views/_spconfigurations/zones"));
const Sensor = lazy(() => import("../views/_spconfigurations/sensors"));

//bigdata-settings
const Value = lazy(() => import("../views/_spsettings/bigdata/values"));
const Device = lazy(() => import("../views/_spsettings/bigdata/devices"));

//hotspot-settings
const Nas = lazy(() => import("../views/_spsettings/hotspot/nas"));
const HotSpots = lazy(() => import("../views/_spsettings/hotspot/hotspots"));
const Limitation = lazy(() => import("../views/_spsettings/hotspot/limitations"));
const Customer = lazy(() => import("../views/_spsettings/hotspot/customers"));
const exportCustomer = lazy(() => import("../views/_spsettings/hotspot/exportCustomers"));

//maintenances
const Brand = lazy(() => import("../views/_spmaintenance/brands"));
const businessType = lazy(() => import("../views/_spmaintenance/businessTypes"));
const Country = lazy(() => import("../views/_spmaintenance/locations/countries"));
const State = lazy(() => import("../views/_spmaintenance/locations/states"));
const City = lazy(() => import("../views/_spmaintenance/locations/cities"));
const zipCode = lazy(() => import("../views/_spmaintenance/locations/zipCodes"));

const auths = [].concat(AuthRoutes);

var ThemeRoutes = [
  {
    path: "/_spanalytics/home",
    name: "HOME",
    icon: "home",
    component: Home,
  },
  {
    collapse: true,
    path: "/_spanalytics",
    name: "ANALYTICS",
    state: "analyticpages",
    icon: "grid",
    badges: "side-badge badge badge-info",
    badgeno: "4",
    child: [
      {
        path: "/_spanalytics/onsite",
        name: "OnSite",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: OnSite,
      },
      {
        path: "/_spanalytics/bigdata",
        name: "BigData",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: BigData,
      },
      {
        path: "/_spanalytics/presence",
        name: "FootFall",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Presence,
      },
      {
        path: "/_spanalytics/hotspot",
        name: "HotSpot",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: HotSpot,
      },
    ],
  },
  {
    collapse: true,
    path: "/_spmarketing",
    name: "MARKETING",
    state: "marketingpages",
    icon: "calendar",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
      {
        path: "/_spmarketing/contentmanagement",
        name: "Content Management",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: ContentManagement,
      },
      {
        path: "/_spmarketing/campaigneditor",
        name: "Campaign Editor",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: CampaignEditor,
      },
      {
        path: "/_spmarketing/smartpoke",
        name: "SmartPoke",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: SmartPoke,
      },
    ],
  },
  {
    collapse: true,
    path: "/_spperformance",
    name: "PERFORMANCE",
    state: "performancepages",
    icon: "check-square",
    badges: "side-badge badge badge-info",
    badgeno: "2",
    child: [
      {
        path: "/_spperformance/campaigndetailed",
        name: "Campaign Detailed",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: CampaignDetailed,
      },
      {
        path: "/_spperformance/campaigneffectiveness",
        name: "Campaign Effectiveness",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: CamapignEffectiveness,
      },
    ],
  },
  {
    collapse: true,
    path: "/_spconfigurations",
    name: "CONFIGURATIONS",
    state: "configurationpages",
    icon: "map-pin",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
      {
        path: "/_spconfigurations/spots",
        name: "Spots",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Spot,
      },
      {
        path: "/_spconfigurations/zones",
        name: "Zones",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Zone,
      },
      {
        path: "/_spconfigurations/sensors",
        name: "Sensors",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Sensor,
      },
    ],
  },
  {
    collapse: true,
    path: "/_spsettings",
    name: "SETTINGS",
    state: "settingpages",
    icon: "settings",
    badges: "side-badge badge badge-info",
    badgeno: "2",
    child: [
      {
        collapse: true,
        name: "BigData",
        cstate: "bigdatapages",
        icon: "mdi mdi-file",
        subchild: [
          {
            path: "/_spsettings/bigdata/values",
            name: "Values",

            icon: "mdi mdi-star",
            component: Value,
          },
          {
            path: "/_spsettings/bigdata/devices",
            name: "Devices",

            icon: "mdi mdi-star",
            component: Device,
          },
        ],
      },
      {
        collapse: true,
        name: "HotSpot",
        cstate: "hotspotpages",
        icon: "mdi mdi-file",
        subchild: [
          {
            path: "/_spsettings/hotspot/nas",
            name: "Nas",

            icon: "mdi mdi-star",
            component: Nas,
          },
          {
            path: "/_spsettings/hotspot/hotspots",
            name: "HotSpots",

            icon: "mdi mdi-star",
            component: HotSpots,
          },
          {
            path: "/_spsettings/hotspot/limitations",
            name: "Limitations",

            icon: "mdi mdi-star",
            component: Limitation,
          },
          {
            path: "/_spsettings/hotspot/customers",
            name: "Customers",

            icon: "mdi mdi-star",
            component: Customer,
          },
          {
            path: "/_spsettings/hotspot/exportCustomers",
            name: "Export Customers",

            icon: "mdi mdi-star",
            component: exportCustomer,
          },
        ],
      },
    ],
  },
  {
    collapse: true,
    path: "/_spmaintenance",
    name: "MAINTENANCES",
    state: "maintenancepages",
    icon: "book-open",
    badges: "side-badge badge badge-success",
    badgeno: "3",
    child: [
      {
        path: "/_spmaintenance/brands",
        name: "Brands",

        icon: "mdi mdi-crop-free",
        component: Brand,
      },
      {
        path: "/_spmaintenance/businessTypes",
        name: "Business Types",

        icon: "mdi mdi-account-network",
        component: businessType,
      },
      {
        collapse: true,
        name: "Locations",
        cstate: "locationpages",
        icon: "mdi mdi-file",
        subchild: [
          {
            path: "/_spmaintenance/locations/countries",
            name: "Countries",

            icon: "mdi mdi-star",
            component: Country,
          },
          {
            path: "/_spmaintenance/locations/states",
            name: "States",

            icon: "mdi mdi-star",
            component: State,
          },
          {
            path: "/_spmaintenance/locations/cities",
            name: "Cities",

            icon: "mdi mdi-star",
            component: City,
          },
          {
            path: "/_spmaintenance/locations/zipCodes",
            name: "ZipCodes",

            icon: "mdi mdi-star",
            component: zipCode,
          },
        ],
      },
    ],
  },
  {
    path: "/authentication",
    name: "AUTHENTICATION",
    state: "openAuthentication",
    icon: "alert-triangle",
    badges: "side-badge badge badge-success",
    badgeno: "7",
    child: auths,
    collapse: true,
  },  
  {
    path: "/",
    pathTo: "/_spanalytics/home",
    name: "HOME",
    redirect: true,
  },
];
export default ThemeRoutes;
