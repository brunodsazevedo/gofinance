import axios from "axios";

interface Bank {
  id: number;
  name: string;
  institutionUrl: string;
  imageUrl: string;
  primaryColor: string;
  type: string;
  country: string;
  credentials: {
    name: string;
    label: string;
    type: 'text' | 'password' | 'number' | 'image' | 'select';
    assistiveText?: string;
    data?: string;
    placeholder?: string;
    validation?: string;
    validationMessage?: string;
    mfa?: boolean;
    options?: {
      value: string;
      label: string;
    }[];
  }[];
}

interface BankConnectionResponse {
  id: string;
  connectorId: number;
  status: string;
  executionStatus: string;
}

const { PLUGGY_CLIENT_ID } = process.env;
const { PLUGGY_CLIENT_SECRET } = process.env;

const pluggyApi = axios.create({
  baseURL: 'https://api.pluggy.ai',
});

export async function getApiKey() {
  try {
    const response = await pluggyApi.post('/auth', {
      clientId: PLUGGY_CLIENT_ID,
      clientSecret: PLUGGY_CLIENT_SECRET,
    });

    return response.data.apiKey as string;
  } catch (error) {
    throw (error);
  }
}

export async function getConnectToken() {
  try {
    const apiKey = await getApiKey();

    const response = await pluggyApi.post('/connect_token', {
      options: {
        clientUserId: PLUGGY_CLIENT_ID,
      }
    }, {
      headers: {
        'X-API-KEY': apiKey,
      }
    });

    return response.data.accessToken as string;
  } catch (error) {
    throw error;
  }
}

export async function listBanks() {
  try {
    const apiKey = await getApiKey();
    
    const response = await pluggyApi.get('/connectors', {
      headers: {
        'X-API-KEY': apiKey,
      }
    });

    const data:Bank[] = response.data.results;

    return data;
  } catch (error) {      
    throw error;
  }
}

export async function bank(id: number) {
  try {
    const apiKey = await getApiKey();
    const response = await pluggyApi.get(`/connectors/${id}`, {
      headers: {
        'X-API-KEY': apiKey,
      }
    });
    const data: Bank = response.data;

    return data;
  } catch (error) {
    throw (error);
  }
}

export async function createConnection(bankId: number, postData: any) {
  try {
    const accessToken = await getConnectToken();
    
    const response = await pluggyApi.post(`/items`, {
      connectorId: bankId,
      parameters: {
        ...postData,
      },
    }, {
      headers: {
        'X-API-KEY': accessToken,
      }
    });
    const data: BankConnectionResponse = response.data;

    return data;
  } catch (error) {
    throw error;
  }
}
