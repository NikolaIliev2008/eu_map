const countryNeighbors = {
    // North America
    "CA": ["US"], // Canada
    "US": ["CA", "MX"], // United States
    "MX": ["US", "GT", "BZ"], // Mexico
    "GT": ["MX", "BZ", "SV", "HN"], // Guatemala
    "BZ": ["MX", "GT"], // Belize
    "SV": ["GT", "HN"], // El Salvador
    "HN": ["GT", "SV", "NI"], // Honduras
    "NI": ["HN", "CR"], // Nicaragua
    "CR": ["NI", "PA"], // Costa Rica
    "PA": ["CR", "CO"], // Panama

    // South America
    "AR": ["CL", "BO", "PY", "BR", "UY"], // Argentina
    "BO": ["PE", "BR", "PY", "AR", "CL"], // Bolivia
    "BR": ["SR", "GY", "VE", "CO", "PE", "BO", "PY", "AR", "UY"], // Brazil
    "CL": ["PE", "BO", "AR"], // Chile
    "CO": ["PA", "VE", "BR", "PE", "EC"], // Colombia
    "EC": ["CO", "PE"], // Ecuador
    "GY": ["VE", "BR", "SR"], // Guyana
    "PY": ["BO", "BR", "AR"], // Paraguay
    "PE": ["EC", "CO", "BR", "BO", "CL"], // Peru
    "SR": ["GY", "BR", "GF"], // Suriname
    "UY": ["AR", "BR"], // Uruguay
    "VE": ["CO", "BR", "GY"], // Venezuela

    // Africa
    "DZ": ["TN", "LY", "NE", "ML", "MR", "EH", "MA"], // Algeria
    "AO": ["CD", "ZM", "NA"], // Angola
    "BJ": ["TG", "BF", "NE", "NG"], // Benin
    "BW": ["NA", "ZM", "ZW", "ZA"], // Botswana
    "BF": ["ML", "NE", "BJ", "TG", "GH", "CI"], // Burkina Faso
    "BI": ["RW", "TZ", "CD"], // Burundi
    "CM": ["NG", "TD", "CF", "GA", "GQ", "CG"], // Cameroon
    "CF": ["TD", "SD", "SS", "CD", "CG", "CM"], // Central African Republic
    "TD": ["LY", "SD", "CF", "CM", "NG", "NE"], // Chad
    "CD": ["CF", "SS", "UG", "RW", "BI", "TZ", "ZM", "AO", "CG"], // Democratic Republic of the Congo
    "DJ": ["ER", "ET", "SO"], // Djibouti
    "EG": ["LY", "SD"], // Egypt
    "GQ": ["CM", "GA"], // Equatorial Guinea
    "ER": ["SD", "ET", "DJ"], // Eritrea
    "ET": ["ER", "SD", "SS", "KE", "SO", "DJ"], // Ethiopia
    "GA": ["GQ", "CM", "CG"], // Gabon
    "GH": ["CI", "BF", "TG"], // Ghana
    "GN": ["CI", "LR", "SL", "GW", "ML", "SN"], // Guinea
    "KE": ["ET", "SS", "TZ", "UG"], // Kenya
    "LS": ["ZA"], // Lesotho
    "LR": ["GN", "CI", "SL"], // Liberia
    "LY": ["TN", "DZ", "NE", "SD", "TD", "EG"], // Libya
    "MG": [], // Madagascar (Island)
    "MW": ["TZ", "MZ", "ZM"], // Malawi
    "ML": ["SN", "MR", "DZ", "NE", "BF", "CI", "GN"], // Mali
    "MA": ["DZ", "EH"], // Morocco
    "MZ": ["ZW", "ZA", "SZ", "MW", "TZ"], // Mozambique
    "NA": ["ZA", "BW", "ZM", "AO"], // Namibia
    "NE": ["DZ", "LY", "TD", "BF", "BJ", "NG", "ML"], // Niger
    "NG": ["BJ", "NE", "TD", "CM"], // Nigeria
    "RW": ["BI", "TZ", "CD", "UG"], // Rwanda
    "SN": ["GN", "ML", "MR"], // Senegal
    "SL": ["GN", "LR"], // Sierra Leone
    "SO": ["ET", "DJ", "KE"], // Somalia
    "ZA": ["NA", "BW", "ZW", "MZ", "SZ", "LS"], // South Africa
    "SS": ["SD", "ET", "UG", "CD", "KE"], // South Sudan
    "SD": ["EG", "LY", "TD", "SS", "ET", "ER"], // Sudan
    "TZ": ["KE", "UG", "RW", "BI", "CD", "ZM", "MW", "MZ"], // Tanzania
    "TG": ["GH", "BJ", "BF"], // Togo
    "UG": ["SS", "KE", "TZ", "RW", "CD"], // Uganda
    "ZM": ["TZ", "MW", "AO", "CD", "NA", "ZW"], // Zambia
    "ZW": ["ZA", "BW", "ZM", "MZ"], // Zimbabwe

    // Asia
    "AF": ["IR", "PK", "TM", "UZ", "TJ", "CN"], // Afghanistan
    "AM": ["GE", "IR", "TR", "AZ"], // Armenia
    "AZ": ["GE", "IR", "AM", "RU"], // Azerbaijan
    "CN": ["MN", "RU", "KZ", "KG", "TJ", "AF", "PK", "IN", "NP", "BT", "MM", "LA", "VN"], // China
    "IN": ["PK", "CN", "NP", "BT", "MM", "BD"], // India
    "IR": ["IQ", "AF", "AM", "AZ", "TM", "PK", "TR"], // Iran
    "IQ": ["SY", "JO", "SA", "KW", "IR", "TR"], // Iraq
    "IL": ["EG", "JO", "LB", "SY"], // Israel
    "JP": [], // Japan (Island)
    "KZ": ["RU", "KG", "UZ", "TM", "CN"], // Kazakhstan
    "PK": ["AF", "IR", "IN", "CN"], // Pakistan
    "SA": ["IQ", "JO", "KW", "OM", "QA", "AE", "YE"], // Saudi Arabia
    "TH": ["MM", "LA", "KH", "MY"], // Thailand
    "VN": ["CN", "LA", "KH"], // Vietnam

    // Oceania
    "AU": [], // Australia (Island)
    "NZ": [], // New Zealand (Island)
    "PG": ["ID"], // Papua New Guinea

    //Europe
    "AD": ["ES", "FR"], // Andorra
    "AL": ["ME", "RS", "MK", "GR"], // Albania
    "AT": ["DE", "CZ", "SK", "HU", "SI", "IT", "CH", "LI"], // Austria
    "BA": ["HR", "ME", "RS"], // Bosnia and Herzegovina
    "BE": ["FR", "LU", "DE", "NL"], // Belgiu
    // m
    "BG": ["RO", "RS", "MK", "GR", "TR"], // Bulgaria
    "BY": ["PL", "LT", "LV", "RU", "UA"], // Belarus
    "CH": ["FR", "DE", "AT", "IT", "LI"], // Switzerland
    "CY": [], // Cyprus (Island)
    "CZ": ["DE", "PL", "SK", "AT"], // Czech Republic
    "DE": ["DK", "PL", "CZ", "AT", "CH", "FR", "LU", "BE", "NL"], // Germany
    "DK": ["DE"], // Denmark
    "EE": ["LV", "RU"], // Estonia
    "ES": ["PT", "FR", "AD"], // Spain
    "FI": ["SE", "NO", "RU"], // Finland
    "FR": ["BE", "LU", "DE", "CH", "IT", "MC", "ES", "AD"], // France
    "GR": ["AL", "MK", "BG", "TR"], // Greece
    "HR": ["SI", "HU", "RS", "BA", "ME"], // Croatia
    "HU": ["AT", "SK", "UA", "RO", "RS", "HR", "SI"], // Hungary
    "IE": ["GB"], // Ireland
    "IT": ["FR", "CH", "AT", "SI", "SM", "VA"], // Italy
    "LT": ["LV", "BY", "PL", "RU"], // Lithuania
    "LU": ["BE", "DE", "FR"], // Luxembourg
    "LV": ["EE", "LT", "BY", "RU"], // Latvia
    "MC": ["FR"], // Monaco
    "MD": ["RO", "UA"], // Moldova
    "ME": ["HR", "BA", "RS", "AL"], // Montenegro
    "MK": ["AL", "RS", "BG", "GR"], // North Macedonia
    "MT": [], // Malta (Island)
    "NL": ["BE", "DE"], // Netherlands
    "NO": ["SE", "FI", "RU"], // Norway
    "PL": ["DE", "CZ", "SK", "UA", "BY", "LT", "RU"], // Poland
    "PT": ["ES"], // Portugal
    "RO": ["UA", "MD", "BG", "SR", "HU"], // Romania
    "RS": ["HU", "RO", "BG", "MK", "ME", "BA", "HR"], // Serbia
    "RU": ["NO", "FI", "EE", "LV", "LT", "PL", "BY", "UA"], // Russia (Europe)
    "SE": ["NO", "FI"], // Sweden
    "SI": ["AT", "HU", "HR", "IT"], // Slovenia
    "SK": ["CZ", "PL", "UA", "HU", "AT"], // Slovakia
    "SM": ["IT"], // San Marino
    "TR": ["BG", "GR"], // Turkey (Europe)
    "UA": ["PL", "SK", "HU", "RO", "MD", "BY", "RU"], // Ukraine
    "UK": ["IE"], // United Kingdom
    "VA": ["IT"], // Vatican City

    //added
    "XK": ["AL", "ME", "RS", "MK"], // Kosovo
    "IS": [], // Iceland (Island)
    "LI": ["AT", "CH"], // Liechtenstein
    "GE": ["RU", "AM", "AZ", "TR"], // Georgia



    "AE": ["SA", "OM"],
    "AG": [],
    "AI": [],
    "AS": [],
    "AW": [],
    "AX": ["FI", "SE"],
    "BB": [],
    "BD": ["IN", "MM"],
    "BH": ["SA", "QA"],
    "BL": ["MF", "GP"],
    "BN": ["MY"],
    "BM": [],
    "BQ": [],
    "BS": [],
    "BT": ["IN", "CN"],
    "BV": [],
    "CC": [],
    "CG": ["AO", "CD", "GA"],
    "CI": ["LR", "GH", "BF", "ML"],
    "CK": [],
    "CU": [],
    "CV": [],
    "CW": [],
    "CX": [],
    "DM": [],
    "DO": ["HT"],
    "EH": ["MA", "DZ", "MR"],
    "FJ": [],
    "FK": [],
    "FM": [],
    "FO": [],
    "GB": ["IE"],
    "GD": [],
    "GF": ["BR", "SR", "GY"],
    "GG": [],
    "GI": ["ES"],
    "GL": [],
    "GM": ["SN"],
    "GP": ["BL", "MF"],
    "GS": [],
    "GU": [],
    "GW": ["SN"],
    "HK": ["CN"],
    "HM": [],
    "HT": ["DO"],
    "ID": ["MY", "TL", "PG"],
    "IM": [],
    "IO": [],
    "JE": [],
    "JM": [],
    "JO": ["IQ", "SA", "SY", "IL"],
    "JU": [],
    "KG": ["CN", "KZ", "TJ", "UZ"],
    "KH": ["TH", "VN", "LA"],
    "KI": [],
    "KM": [],
    "KN": [],
    "KP": ["CN", "KR", "RU"],
    "KR": ["KP"],
    "KW": ["IQ", "SA"],
    "KY": [],
    "LA": ["TH", "VN", "KH", "CN", "MM"],
    "LB": ["SY", "IL"],
    "LC": [],
    "LK": [],
    "MF": ["BL", "GP"],
    "MH": [],
    "MO": ["CN"],
    "MM": ["BD", "IN", "CN", "LA", "TH"],
    "MN": ["CN", "RU"],
    "MP": [],
    "MQ": [],
    "MR": ["DZ", "EH", "ML", "SN"],
    "MS": [],
    "MU": [],
    "MV": [],
    "MY": ["TH", "ID", "BN"],
    "NC": [],
    "NF": [],
    "NP": ["CN", "IN"],
    "NR": [],
    "NU": [],
    "OM": ["SA", "AE", "YE"],
    "PF": [],
    "PH": [],
    "PM": [],
    "PN": [],
    "PR": [],
    "PS": ["IL", "JO"],
    "PW": [],
    "QA": ["SA", "BH"],
    "RE": [],
    "SB": [],
    "SC": [],
    "SG": ["MY"],
    "SH": [],
    "SJ": [],
    "ST": [],
    "SX": [],
    "SY": ["TR", "IQ", "JO", "IL", "LB"],
    "SZ": ["ZA", "MZ"],
    "TC": [],
    "TF": [],
    "TJ": ["AF", "CN", "KG", "UZ"],
    "TK": [],
    "TL": ["ID"],
    "TM": ["AF", "IR", "KZ", "UZ"],
    "TN": ["DZ", "LY"],
    "TO": [],
    "TT": [],
    "TV": [],
    "TW": [],
    "UM-DQ": [],
    "UM-FQ": [],
    "UM-HQ": [],
    "UM-JQ": [],
    "UM-MQ": [],
    "UM-WQ": [],
    "UZ": ["AF", "KZ", "KG", "TJ", "TM"],
    "VC": [],
    "VG": [],
    "VI": [],
    "VU": [],
    "WF": [],
    "WS": [],
    "YE": ["SA", "OM"],
    "YT": []
};

console.log(countryNeighbors);

//when the page is loaded , then the magic number have to be calculated and shown
// window.onload = function ()

//     console.log("The entire page is fully loaded.");


// ;