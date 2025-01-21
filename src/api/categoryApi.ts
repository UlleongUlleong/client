import axios from 'axios';

export interface Category {
    id: number;
    name: string;
}
interface CApiResponse<T> {
    status: string;
    data: T;
    message: string;
}
type CategoryApiResponse = CApiResponse<Category[]>;

export const apiClient = axios.create({
    baseURL: 'https://ulleong-idbiv.run.goorm.site',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const alcoholCategory = async (): Promise<Category[]> => {
    try {
        const response = await apiClient.get<CategoryApiResponse>('/api/categories/alcohol');
        return response.data.data;
    } catch (error) {
        console.log('alcoholCategory error :', error);
        throw error;
    }
}

export const moodsCategory = async (): Promise<Category[]> => {
    try {
        const response = await apiClient.get<CategoryApiResponse>('/api/categories/moods');
        return response.data.data;
    } catch (error) {
        console.log('moodsCategory error :', error);
        throw error;
    }
}

