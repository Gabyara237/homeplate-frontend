const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;


const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch users: ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};


const getById = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch user ${userId}: ${text}`);
    }

    const data = await res.json();
    return data.user || data; 
  } catch (err) {
    console.error(`Error fetching user ${userId}:`, err);
    throw err;
  }
};


const updateProfile = async (userId, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload), 
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update user: ${text}`);
    }

    const data = await res.json();
    return data; 
  } catch (err) {
    console.error(`Error updating user ${userId}:`, err);
    throw err;
  }
};

export { index, getById, updateProfile };
