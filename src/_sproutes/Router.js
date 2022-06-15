import { lazy } from "react";

//Lazy loading and code splitting
//Analytics
const Home = lazy(() => import("../_sppages/_spanalytics/home"));
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
            path: "/_spsettings/_spbigdata/values",
            name: "Values",

            icon: "mdi mdi-star",
            component: Value,
          },
          {
            path: "/_spsettings/_spbigdata/devices",
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
            path: "/_spsettings/_sphotspot/nas",
            name: "Nas",

            icon: "mdi mdi-star",
            component: Nas,
          },
          {
            path: "/_spsettings/_sphotspot/hotspots",
            name: "HotSpots",

            icon: "mdi mdi-star",
            component: HotSpots,
          },
          {
            path: "/_spsettings/_sphotspot/limitations",
            name: "Limitations",

            icon: "mdi mdi-star",
            component: Limitation,
          },
          {
            path: "/_spsettings/_sphotspot/customers",
            name: "Customers",

            icon: "mdi mdi-star",
            component: Customer,
          },
          {
            path: "/_spsettings/_sphotspot/exportCustomers",
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
            path: "/_spmaintenance/_splocations/countries",
            name: "Countries",

            icon: "mdi mdi-star",
            component: Country,
          },
          {
            path: "/_spmaintenance/_splocations/states",
            name: "States",

            icon: "mdi mdi-star",
            component: State,
          },
          {
            path: "/_spmaintenance/_splocations/cities",
            name: "Cities",

            icon: "mdi mdi-star",
            component: City,
          },
          {
            path: "/_spmaintenance/_splocations/zipCodes",
            name: "ZipCodes",

            icon: "mdi mdi-star",
            component: zipCode,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    pathTo: "/_spanalytics/home",
    name: "HOME",
    redirect: true,
  },
];
export default ThemeRoutes;
