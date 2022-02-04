import React, { createContext, useContext, useReducer } from 'react'
import { useQueryClient } from "react-query"
import { ActionType } from "../place/types/ActionType"
import { Inputs } from '../place/types/Inputs'
import { searchKey } from '../place/types/searchKey'

const SearchKeyContext = createContext({} as {
    searchKey: searchKey,
    dispatch: React.Dispatch<ActionType>
})

export function useSearchKeyContext() {
    return useContext(SearchKeyContext)
}

export function SearchKeyProvider({ children }: any) {

    const initialState = {
        name: '',
        address: '',
        comment: '',
        tag: ['']
    }

    const reducerFC = (keyWordState: searchKey, action: ActionType) => {
        // switchで処理を分ける
        // action.typeで処理を分岐
        // ...keyWordStateで処理前の状態を再現してからマージの処理を行う
        switch (action.type) {
            case 'set':
                return {
                    name: action.formData.name,
                    address: action.formData.address,
                    comment: action.formData.comment,
                    tag: action.formData.tag
                }
            case 'name':
                return { ...keyWordState, name: '' }
            case 'address':
                return { ...keyWordState, address: '' }
            case 'comment':
                return { ...keyWordState, comment: '' }
            case 'tag':
                keyWordState?.tag?.splice(action.index, 1, '')
                return { ...keyWordState, tag: keyWordState?.tag }

        }
    }

    const [searchKey, dispatch] = useReducer(reducerFC, initialState)

    const value = {
        searchKey,
        dispatch
    }
    return (
        <SearchKeyContext.Provider value={value}>
            {children}
        </SearchKeyContext.Provider>
    )
}
