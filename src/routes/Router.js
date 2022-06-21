import { lazy } from "react";
import AuthRoutes from "./AuthRoutes";


//Lazy loading and code splitting
//Analytics
const Home = lazy(() => import("../_sppages/home"));
const OnSite = lazy(() => import("../_sppages/_spanalytics/onsite"));
const BigData = lazy(() => import("../_sppages/_spanalytics/bigdata"));
const Presence = lazy(() => import("../_sppages/_spanalytics/presence"));
const HotSpot = lazy(() => import("../_sppages/_spanalytics/hotspot"));

//Marketing
const ContentManagement = lazy(() => import("../_sppages/_spmarketing/contentmanagement"));
const CampaignEditor = lazy(() => import("../_sppages/_spmarketing/campaigneditor"));
const SmartPoke = lazy(() => import("../_sppages/_spmarketing/smartpoke"));

//Performance
const CampaignDetailed = lazy(() => import("../_sppages/_spperformance/campaigndetailed"));
const CamapignEffectiveness = lazy(() => import("../_sppages/_spperformance/campaigneffectiveness"));

//configurations
const Spot = lazy(() => import("../_sppages/_spconfigurations/spots"));
const Zone = lazy(() => import("../_sppages/_spconfigurations/zones"));
const Sensor = lazy(() => import("../_sppages/_spconfigurations/sensors"));

//bigdata-settings
const Value = lazy(() => import("../_sppages/_spsettings/_spbigdata/values"));
const Device = lazy(() => import("../_sppages/_spsettings/_spbigdata/devices"));

//hotspot-settings
const Nas = lazy(() => import("../_sppages/_spsettings/_sphotspot/nas"));
const HotSpots = lazy(() => import("../_sppages/_spsettings/_sphotspot/hotspots"));
const Limitation = lazy(() => import("../_sppages/_spsettings/_sphotspot/limitations"));
const Customer = lazy(() => import("../_sppages/_spsettings/_sphotspot/customers"));
const exportCustomer = lazy(() => import("../_sppages/_spsettings/_sphotspot/exportCustomers"));

//maintenances
const Brand = lazy(() => import("../_sppages/_spmaintenance/brands"));
const businessType = lazy(() => import("../_sppages/_spmaintenance/businessTypes"));
const Country = lazy(() => import("../_sppages/_spmaintenance/_splocations/countries"));
const State = lazy(() => import("../_sppages/_spmaintenance/_splocations/states"));
const City = lazy(() => import("../_sppages/_spmaintenance/_splocations/cities"));
const zipCode = lazy(() => import("../_sppages/_spmaintenance/_splocations/zipCodes"));

const auths = [].concat(AuthRoutes);

var ThemeRoutes = [
  {
    path: "/home",
    name: "HOME",
    style: "block",
    state: "homepage",
    icon: "home",
    badges: "side-badge badge badge-info",
    component: Home,
  },
  {
    collapse: true,
    path: "/analytics",
    name: "ANALYTICS",
    style: "block",
    state: "analyticpages",
    icon: "activity",
    badges: "side-badge badge badge-info",
    badgeno: "4",
    child: [
      {
        path: "/analytics/onsite",
        name: "OnSite",
        mini: "B",
        icon: "mdi mdi-voice",
        component: OnSite,
      },
      {
        path: "/analytics/bigdata",
        name: "BigData",
        mini: "B",
        icon: "mdi mdi-database",
        component: BigData,
      },
      {
        path: "/analytics/presence",
        name: "FootFall",
        mini: "B",
        icon: "mdi mdi-walk",
        component: Presence,
      },
      {
        path: "/analytics/hotspot",
        name: "HotSpot",
        mini: "B",
        icon: "mdi mdi-wifi",
        component: HotSpot,
      },
    ],
  },
  {
    collapse: true,
    path: "/marketing",
    name: "MARKETING",
    style: "block",
    state: "marketingpages",
    icon: "message-circle",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
      {
        path: "/marketing/contentmanagement",
        name: "Content Management",
        mini: "B",
        icon: "mdi mdi-responsive",
        component: ContentManagement,
      },
      {
        path: "/marketing/campaigneditor",
        name: "Campaign Editor",
        mini: "B",
        icon: "mdi mdi-message-text",
        component: CampaignEditor,
      },
      {
        path: "/marketing/smartpoke",
        name: "SmartPoke",
        mini: "B",
        icon: "mdi mdi-hand-pointing-right",
        component: SmartPoke,
      },
    ],
  },
  {
    collapse: true,
    path: "/performance",
    name: "PERFORMANCE",
    style: "block",
    state: "performancepages",
    icon: "target",
    badges: "side-badge badge badge-info",
    badgeno: "2",
    child: [
      {
        path: "/performance/campaigndetailed",
        name: "Campaign Detailed",
        mini: "B",
        icon: "mdi mdi-format-indent-increase",
        component: CampaignDetailed,
      },
      {
        path: "/performance/campaigneffectiveness",
        name: "Campaign Effectiveness",
        mini: "B",
        icon: "mdi mdi-elevation-rise",
        component: CamapignEffectiveness,
      },
    ],
  },
  {
    collapse: true,
    path: "/configurations",
    name: "CONFIGURATIONS",
    style: "block",
    state: "configurationpages",
    icon: "layout",
    badges: "side-badge badge badge-info",
    badgeno: "3",
    child: [
      {
        path: "/configurations/spots",
        name: "Spots",
        mini: "B",
        icon: "mdi mdi-crosshairs-gps",
        component: Spot,
      },
      {
        path: "/configurations/zones",
        name: "Zones",
        mini: "B",
        icon: "mdi mdi-hexagon-multiple",
        component: Zone,
      },
      {
        path: "/configurations/sensors",
        name: "Sensors",
        mini: "B",
        icon: "mdi mdi-access-point",
        component: Sensor,
      },
    ],
  },
  {
    collapse: true,
    path: "/settings",
    name: "SETTINGS",
    style: "block",
    state: "settingpages",
    icon: "settings",
    badges: "side-badge badge badge-info",
    badgeno: "2",
    child: [
      {
        collapse: true,
        name: "BigData",
        cstate: "bigdatapages",
        icon: "mdi mdi-settings-box",
        subchild: [
          {
            path: "/settings/bigdata/values",
            name: "Values",

            icon: "mdi mdi-checkbox-marked-circle",
            component: Value,
          },
          {
            path: "/settings/bigdata/devices",
            name: "Devices",

            icon: "mdi mdi-cellphone",
            component: Device,
          },
        ],
      },
      {
        collapse: true,
        name: "HotSpot",
        cstate: "hotspotpages",
        icon: "mdi mdi-settings-box",
        subchild: [
          {
            path: "/settings/hotspot/nas",
            name: "Nas",

            icon: "mdi mdi-server",
            component: Nas,
          },
          {
            path: "/settings/hotspot/hotspots",
            name: "HotSpots",

            icon: "mdi mdi-rss-box",
            component: HotSpots,
          },
          {
            path: "/settings/hotspot/limitations",
            name: "Limitations",

            icon: "mdi mdi-ruler",
            component: Limitation,
          },
          {
            path: "/settings/hotspot/customers",
            name: "Customers",

            icon: "mdi mdi-account-location",
            component: Customer,
          },
          {
            path: "/settings/hotspot/exportCustomers",
            name: "Export Customers",

            icon: "mdi mdi-file-excel",
            component: exportCustomer,
          },
        ],
      },
    ],
  },
  {
    path: "/authentication",
    name: "AUTHENTICATION",
    state: "authentication",
    style: "none",
    icon: "user-check",
    badges: "side-badge badge badge-success",
    badgeno: "2",
    child: auths,
    collapse: true,
  },
  {
    collapse: true,
    path: "/maintenance",
    name: "MAINTENANCES",
    style: "block",
    state: "maintenancepages",
    icon: "tool",
    badges: "side-badge badge badge-success",
    badgeno: "3",
    child: [
      {
        path: "/maintenance/brands",
        name: "Brands",

        icon: "mdi mdi-crop-free",
        component: Brand,
      },
      {
        path: "/maintenance/businessTypes",
        name: "Business Types",

        icon: "mdi mdi-store",
        component: businessType,
      },
      {
        collapse: true,
        name: "Locations",
        cstate: "locationpages",
        icon: "mdi mdi-map",
        subchild: [
          {
            path: "/maintenance/locations/countries",
            name: "Countries",

            icon: "mdi mdi-flag",
            component: Country,
          },
          {
            path: "/maintenance/locations/states",
            name: "States",

            icon: "mdi mdi-map-maker",
            component: State,
          },
          {
            path: "/maintenance/locations/cities",
            name: "Cities",

            icon: "mdi mdi-map-maker-circle",
            component: City,
          },
          {
            path: "/maintenance/locations/zipCodes",
            name: "ZipCodes",

            icon: "mdi mdi-mailbox",
            component: zipCode,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    pathTo: "/home",
    name: "HOME",
    redirect: true,
  },
];
export default ThemeRoutes;
