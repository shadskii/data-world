export type CountryCode =
  | "AFG"
  | "AGO"
  | "ALB"
  | "ARE"
  | "ARG"
  | "ARM"
  | "ATA"
  | "ATF"
  | "AUS"
  | "AUT"
  | "AZE"
  | "BDI"
  | "BEL"
  | "BEN"
  | "BFA"
  | "BGD"
  | "BGR"
  | "BHS"
  | "BIH"
  | "BLR"
  | "BLZ"
  | "BOL"
  | "BRA"
  | "BRN"
  | "BTN"
  | "BWA"
  | "CAF"
  | "CAN"
  | "CHE"
  | "CHL"
  | "CHN"
  | "CIV"
  | "CMR"
  | "COD"
  | "COG"
  | "COL"
  | "CRI"
  | "CUB"
  | "-99"
  | "CYP"
  | "CZE"
  | "DEU"
  | "DJI"
  | "DNK"
  | "DOM"
  | "DZA"
  | "ECU"
  | "EGY"
  | "ERI"
  | "ESP"
  | "EST"
  | "ETH"
  | "FIN"
  | "FJI"
  | "FLK"
  | "FRA"
  | "GAB"
  | "GBR"
  | "GEO"
  | "GHA"
  | "GIN"
  | "GMB"
  | "GNB"
  | "GNQ"
  | "GRC"
  | "GRL"
  | "GTM"
  | "GUY"
  | "HND"
  | "HRV"
  | "HTI"
  | "HUN"
  | "IDN"
  | "IND"
  | "IRL"
  | "IRN"
  | "IRQ"
  | "ISL"
  | "ISR"
  | "ITA"
  | "JAM"
  | "JOR"
  | "JPN"
  | "KAZ"
  | "KEN"
  | "KGZ"
  | "KHM"
  | "KOR"
  | "OSA"
  | "KWT"
  | "LAO"
  | "LBN"
  | "LBR"
  | "LBY"
  | "LKA"
  | "LSO"
  | "LTU"
  | "LUX"
  | "LVA"
  | "MAR"
  | "MDA"
  | "MDG"
  | "MEX"
  | "MKD"
  | "MLI"
  | "MMR"
  | "MNE"
  | "MNG"
  | "MOZ"
  | "MRT"
  | "MWI"
  | "MYS"
  | "NAM"
  | "NCL"
  | "NER"
  | "NGA"
  | "NIC"
  | "NLD"
  | "NOR"
  | "NPL"
  | "NZL"
  | "OMN"
  | "PAK"
  | "PAN"
  | "PER"
  | "PHL"
  | "PNG"
  | "POL"
  | "PRI"
  | "PRK"
  | "PRT"
  | "PRY"
  | "QAT"
  | "ROU"
  | "RUS"
  | "RWA"
  | "ESH"
  | "SAU"
  | "SDN"
  | "SDS"
  | "SEN"
  | "SLB"
  | "SLE"
  | "SLV"
  | "ABV"
  | "SOM"
  | "SRB"
  | "SUR"
  | "SVK"
  | "SVN"
  | "SWE"
  | "SWZ"
  | "SYR"
  | "TCD"
  | "TGO"
  | "THA"
  | "TJK"
  | "TKM"
  | "TLS"
  | "TTO"
  | "TUN"
  | "TUR"
  | "TWN"
  | "TZA"
  | "UGA"
  | "UKR"
  | "URY"
  | "USA"
  | "UZB"
  | "VEN"
  | "VNM"
  | "VUT"
  | "PSE"
  | "YEM"
  | "ZAF"
  | "ZMB"
  | "ZWE";

export const countryNames: Record<CountryCode, string> = {
  AFG: "Afghanistan",
  AGO: "Angola",
  ALB: "Albania",
  ARE: "United Arab Emirates",
  ARG: "Argentina",
  ARM: "Armenia",
  ATA: "Antarctica",
  ATF: "French Southern and Antarctic Lands",
  AUS: "Australia",
  AUT: "Austria",
  AZE: "Azerbaijan",
  BDI: "Burundi",
  BEL: "Belgium",
  BEN: "Benin",
  BFA: "Burkina Faso",
  BGD: "Bangladesh",
  BGR: "Bulgaria",
  BHS: "The Bahamas",
  BIH: "Bosnia and Herzegovina",
  BLR: "Belarus",
  BLZ: "Belize",
  BOL: "Bolivia",
  BRA: "Brazil",
  BRN: "Brunei",
  BTN: "Bhutan",
  BWA: "Botswana",
  CAF: "Central African Republic",
  CAN: "Canada",
  CHE: "Switzerland",
  CHL: "Chile",
  CHN: "China",
  CIV: "Ivory Coast",
  CMR: "Cameroon",
  COD: "Democratic Republic of the Congo",
  COG: "Republic of the Congo",
  COL: "Colombia",
  CRI: "Costa Rica",
  CUB: "Cuba",
  "-99": "Northern Cyprus",
  CYP: "Cyprus",
  CZE: "Czech Republic",
  DEU: "Germany",
  DJI: "Djibouti",
  DNK: "Denmark",
  DOM: "Dominican Republic",
  DZA: "Algeria",
  ECU: "Ecuador",
  EGY: "Egypt",
  ERI: "Eritrea",
  ESP: "Spain",
  EST: "Estonia",
  ETH: "Ethiopia",
  FIN: "Finland",
  FJI: "Fiji",
  FLK: "Falkland Islands",
  FRA: "France",
  GAB: "Gabon",
  GBR: "England",
  GEO: "Georgia",
  GHA: "Ghana",
  GIN: "Guinea",
  GMB: "Gambia",
  GNB: "Guinea Bissau",
  GNQ: "Equatorial Guinea",
  GRC: "Greece",
  GRL: "Greenland",
  GTM: "Guatemala",
  GUY: "Guyana",
  HND: "Honduras",
  HRV: "Croatia",
  HTI: "Haiti",
  HUN: "Hungary",
  IDN: "Indonesia",
  IND: "India",
  IRL: "Ireland",
  IRN: "Iran",
  IRQ: "Iraq",
  ISL: "Iceland",
  ISR: "Israel",
  ITA: "Italy",
  JAM: "Jamaica",
  JOR: "Jordan",
  JPN: "Japan",
  KAZ: "Kazakhstan",
  KEN: "Kenya",
  KGZ: "Kyrgyzstan",
  KHM: "Cambodia",
  KOR: "South Korea",
  OSA: "Kosovo",
  KWT: "Kuwait",
  LAO: "Laos",
  LBN: "Lebanon",
  LBR: "Liberia",
  LBY: "Libya",
  LKA: "Sri Lanka",
  LSO: "Lesotho",
  LTU: "Lithuania",
  LUX: "Luxembourg",
  LVA: "Latvia",
  MAR: "Morocco",
  MDA: "Moldova",
  MDG: "Madagascar",
  MEX: "Mexico",
  MKD: "Macedonia",
  MLI: "Mali",
  MMR: "Myanmar",
  MNE: "Montenegro",
  MNG: "Mongolia",
  MOZ: "Mozambique",
  MRT: "Mauritania",
  MWI: "Malawi",
  MYS: "Malaysia",
  NAM: "Namibia",
  NCL: "New Caledonia",
  NER: "Niger",
  NGA: "Nigeria",
  NIC: "Nicaragua",
  NLD: "Netherlands",
  NOR: "Norway",
  NPL: "Nepal",
  NZL: "New Zealand",
  OMN: "Oman",
  PAK: "Pakistan",
  PAN: "Panama",
  PER: "Peru",
  PHL: "Philippines",
  PNG: "Papua New Guinea",
  POL: "Poland",
  PRI: "Puerto Rico",
  PRK: "North Korea",
  PRT: "Portugal",
  PRY: "Paraguay",
  QAT: "Qatar",
  ROU: "Romania",
  RUS: "Russia",
  RWA: "Rwanda",
  ESH: "Western Sahara",
  SAU: "Saudi Arabia",
  SDN: "Sudan",
  SDS: "South Sudan",
  SEN: "Senegal",
  SLB: "Solomon Islands",
  SLE: "Sierra Leone",
  SLV: "El Salvador",
  ABV: "Somaliland",
  SOM: "Somalia",
  SRB: "Republic of Serbia",
  SUR: "Suriname",
  SVK: "Slovakia",
  SVN: "Slovenia",
  SWE: "Sweden",
  SWZ: "Swaziland",
  SYR: "Syria",
  TCD: "Chad",
  TGO: "Togo",
  THA: "Thailand",
  TJK: "Tajikistan",
  TKM: "Turkmenistan",
  TLS: "East Timor",
  TTO: "Trinidad and Tobago",
  TUN: "Tunisia",
  TUR: "Turkey",
  TWN: "Taiwan",
  TZA: "United Republic of Tanzania",
  UGA: "Uganda",
  UKR: "Ukraine",
  URY: "Uruguay",
  USA: "USA",
  UZB: "Uzbekistan",
  VEN: "Venezuela",
  VNM: "Vietnam",
  VUT: "Vanuatu",
  PSE: "West Bank",
  YEM: "Yemen",
  ZAF: "South Africa",
  ZMB: "Zambia",
  ZWE: "Zimbabwe",
};
