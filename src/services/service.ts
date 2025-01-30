
export interface DataInterface {
  id: number;
  userId: number,
  title: string,
  body: string
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}


interface getDataInterface {
  limit: number,
  page: number
}



export async function getData({limit, page}: getDataInterface): Promise<DataInterface[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Response Error');
    }

    const data: DataInterface[] = await response.json();    

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getAuthorName(userId: number): Promise<string> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Response Error');
    }

    const data: User = await response.json();    

    return data.name;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "";
  }
}

