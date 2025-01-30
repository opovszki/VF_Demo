const API_BASE_URL = '/api';

const apiService = {
    getPosts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    getPostById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching post with id ${id}:`, error);
            throw error;
        }
    },

    getCommentsByPostId: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}/comments`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching comments for post with id ${id}:`, error);
            throw error;
        }
    },

    getPostsByTagName: async (tagName) => {
        try {
            const response = await fetch(`${API_BASE_URL}/tags/${tagName}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching posts with tag ${tagName}:`, error);
            throw error;
        }
    }
};

export default apiService;
