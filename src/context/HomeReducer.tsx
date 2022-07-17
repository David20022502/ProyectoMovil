import { CHANGING_DATA, CHANGING_DATA_H, CHANGING_PAGE_STATUS, IS_AUTENTICATED, LOADING_END, LOADING_START, LOAD_FIREBASE_USER, LOAD_TAKITRI_USER } from "./HomeTypes";

export const HomeReducer = (state: any, action: any) => {
    const { payload, type } = action;
    switch (type) {

        case LOAD_FIREBASE_USER: {
            return {
                ...state,
                userFirebase: payload
            }
        }
        case LOAD_TAKITRI_USER: {
            return {
                ...state,
                userApp: payload
            }
        }
        case IS_AUTENTICATED: {
            console.log("is atenticated123", payload)
            return {
                ...state,
                isAutenticated: payload
            }
        }
        case LOADING_START:
            return {
                ...state,
                isLoading: true
            };

        case LOADING_END:
            return {
                ...state,
                isLoading: false
            };
        case CHANGING_DATA:
            return {
                ...state,
                isChangindData: payload
            };
        case CHANGING_DATA_H:
            return {
                ...state,
                isChangindH: payload
            };
            
        case CHANGING_PAGE_STATUS:
            return {
                ...state,
                pageStatus: payload
            };

        default: { return state; }

    }
}