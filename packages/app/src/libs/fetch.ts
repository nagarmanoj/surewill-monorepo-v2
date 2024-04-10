interface Init<Body> extends RequestInit {
  payload?: Body;
}

type Response<ReturnData> =
  | {
      success: false;
      error: string;
    }
  | {
      success: false;
      error: unknown;
    }
  | {
      success: true;
      data: ReturnData;
    };

export const apiFetch = async <ReturnData, Body>(
  url: string,
  init: Init<Body>
): Promise<Response<ReturnData>> => {
  try {
    const response = await fetch(url, {
      ...init,
      body: init.payload ? JSON.stringify(init.payload) : undefined,
      headers: {
        ...init.headers,
        ["Content-Type"]: "application/json",
      },
    });
    const data = (await response.json()) as ReturnData & {
      error?: Array<Zod.ZodError>;
    };

    // Zod validation error
    if (response.status === 422) {
      return { success: false, error: data?.error?.[0]?.message };
    }
    // Auth errors
    if (response.status === 401) {
      return { success: false, error: "Not authorized" };
    }

    // Other handled errors
    if (!`${response.status}`.startsWith("2")) {
      return { success: false, error: "Something went wrong" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
