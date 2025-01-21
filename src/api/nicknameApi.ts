import { AxiosError } from "axios";
import { apiClient } from "./categoryApi";

interface NApiResponse {
    status: string;
    data: null;
    message: string;
}

interface NErrorResponse {
    error: string;
    message: string;
    statusCode: number;
}

export const validNickname = async (nickname: string): Promise<string> => {
    try {
        const response = await apiClient.get(`/api/users/nickname/availability?nickname=${nickname}`);

        // 성공적인 응답일 때
        if (response.data.status === 'success') {
            return response.data.message; // "사용가능한 닉네임입니다."
        }

        // 실패 시 서버에서 제공하는 메시지 반환
        return response.data.message || '유효성 검사에 실패했습니다.';
    } catch (error) {
        if (error instanceof AxiosError) {
            // 409 상태 코드인 경우 메시지 반환
            if (error.response) {
                // 오류가 response로 전달되는 경우
                if (error.response.status === 409) {
                    return error.response.data.message; // "이미 사용되고 있는 닉네임입니다."
                }
                return error.response.data.message || '유효성 검사에 실패했습니다.';
            }
        }

        // 네트워크 오류 등의 경우
        return '유효성 검사에 실패했습니다.'; // 일반적인 오류 메시지
    }
};
