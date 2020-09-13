import { SET_IS_LOADING } from './index'


export const setIsLoading = (id) => {
    return {
        type: SET_IS_LOADING,
        id
    }
}
