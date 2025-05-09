// Mock data for development purposes

// Zones data
export const mockZones = [
  {
    id: "zone1",
    type: "demand",
    status: "fresh",
    upperRange: 2450.75,
    lowerRange: 2420.25,
    createdAt: "2023-06-15T10:30:00Z",
    presetRating: 4,
    userRating: null,
    stock: {
      id: "stock1",
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
    },
  },
  {
    id: "zone2",
    type: "supply",
    status: "tested",
    upperRange: 3950.0,
    lowerRange: 3920.5,
    createdAt: "2023-06-14T09:15:00Z",
    presetRating: 5,
    userRating: 4,
    stock: {
      id: "stock2",
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd.",
    },
  },
  {
    id: "zone3",
    type: "demand",
    status: "tested",
    upperRange: 1650.25,
    lowerRange: 1630.75,
    createdAt: "2023-06-13T14:45:00Z",
    presetRating: 3,
    userRating: null,
    stock: {
      id: "stock3",
      symbol: "INFY",
      name: "Infosys Ltd.",
    },
  },
  {
    id: "zone4",
    type: "supply",
    status: "fresh",
    upperRange: 1250.0,
    lowerRange: 1235.5,
    createdAt: "2023-06-12T11:20:00Z",
    presetRating: 4,
    userRating: 5,
    stock: {
      id: "stock4",
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
    },
  },
  {
    id: "zone5",
    type: "demand",
    status: "fresh",
    upperRange: 850.75,
    lowerRange: 840.25,
    createdAt: "2023-06-11T15:30:00Z",
    presetRating: 5,
    userRating: null,
    stock: {
      id: "stock5",
      symbol: "ICICIBANK",
      name: "ICICI Bank Ltd.",
    },
  },
  {
    id: "zone6",
    type: "supply",
    status: "tested",
    upperRange: 2150.5,
    lowerRange: 2130.0,
    createdAt: "2023-06-10T13:10:00Z",
    presetRating: 3,
    userRating: 2,
    stock: {
      id: "stock6",
      symbol: "SBIN",
      name: "State Bank of India",
    },
  },
]

// Demat accounts data
export const mockDematAccounts = [
  {
    id: "demat1",
    userId: "user1",
    brokerName: "Zerodha",
    accountId: "ZD1234567",
    apiKey: "zd_api_key_1",
    apiSecret: "zd_api_secret_1",
    isActive: true,
    availableFunds: 125000.5,
    holdingsValue: 450000.75,
    connectedOn: "2023-05-10T08:30:00Z",
  },
  {
    id: "demat2",
    userId: "user1",
    brokerName: "Upstox",
    accountId: "UP7654321",
    apiKey: "up_api_key_1",
    apiSecret: "up_api_secret_1",
    isActive: false,
    availableFunds: 75000.25,
    holdingsValue: 320000.5,
    connectedOn: "2023-04-15T10:45:00Z",
  },
  {
    id: "demat3",
    userId: "user1",
    brokerName: "Angel One",
    accountId: "AO9876543",
    apiKey: "ao_api_key_1",
    apiSecret: "ao_api_secret_1",
    isActive: true,
    availableFunds: 50000.75,
    holdingsValue: 180000.25,
    connectedOn: "2023-03-20T14:15:00Z",
  },
]

// Price alerts data
export const mockAlerts = [
  {
    id: "alert1",
    userId: "user1",
    stock: {
      id: "stock1",
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd.",
    },
    targetPrice: 2430.5,
    currentPrice: 2415.75,
    condition: "above",
    isActive: true,
    createdAt: "2023-06-14T09:30:00Z",
  },
  {
    id: "alert2",
    userId: "user1",
    stock: {
      id: "stock2",
      symbol: "TCS",
      name: "Tata Consultancy Services Ltd.",
    },
    targetPrice: 3930.25,
    currentPrice: 3945.5,
    condition: "below",
    isActive: true,
    createdAt: "2023-06-13T11:45:00Z",
  },
  {
    id: "alert3",
    userId: "user1",
    stock: {
      id: "stock3",
      symbol: "INFY",
      name: "Infosys Ltd.",
    },
    targetPrice: 1640.0,
    currentPrice: 1635.25,
    condition: "above",
    isActive: false,
    createdAt: "2023-06-12T14:20:00Z",
  },
  {
    id: "alert4",
    userId: "user1",
    stock: {
      id: "stock5",
      symbol: "ICICIBANK",
      name: "ICICI Bank Ltd.",
    },
    targetPrice: 845.5,
    currentPrice: 842.75,
    condition: "above",
    isActive: true,
    createdAt: "2023-06-11T10:15:00Z",
  },
]

