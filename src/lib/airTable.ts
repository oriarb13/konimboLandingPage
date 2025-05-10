export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  //   key: string;
}

export interface AirtableResponse {
  records: {
    id: string;
    fields: Record<string, string>;
  }[];
}

export interface AirtableError {
  error: string;
  message?: string;
  statusCode?: number;
}

const config = {
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
  baseId: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID,
  tableName: process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME,
  apiUrl: "https://api.airtable.com/v0",
};

//config validation
const validateConfig = (): boolean => {
  const { apiKey, baseId, tableName } = config;

  if (!apiKey || !baseId || !tableName) {
    console.error("Missing Airtable config in .env.local");
    return false;
  }

  return true;
};

//test connection
export const testAirtableConnection = async (): Promise<boolean> => {
  if (!validateConfig()) return false;

  try {
    const { apiKey, baseId, tableName, apiUrl } = config;
    const url = `${apiUrl}/${baseId}/${tableName}?maxRecords=1`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error connecting to Airtable:", error);
    return false;
  }
};

//submit form to airtable
export const submitToAirtable = async (
  formData: FormData
): Promise<AirtableResponse> => {
  if (!validateConfig()) {
    throw new Error("Airtable config is invalid. Please check .env.local");
  }

  const { apiKey, baseId, tableName, apiUrl } = config;
  const url = `${apiUrl}/${baseId}/${tableName}`;

  //match fields to airtable structure
  const data = {
    records: [
      {
        fields: {
          "Full Name": formData.fullName,
          Email: formData.email,
          Phone: formData.phone,
          Message: formData.message,
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as AirtableError;
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    return (await response.json()) as AirtableResponse;
  } catch (error) {
    console.error("Airtable submission error:", error);
    throw error;
  }
};

const AirtableService = {
  testConnection: testAirtableConnection,
  submitForm: submitToAirtable,
};

export default AirtableService;
