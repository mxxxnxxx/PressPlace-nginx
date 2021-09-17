import React, { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import FollowButton from '../../components/atoms/FollowButton'
import { useCurrentUser } from '../../hooks'
import Follow from '../../hooks/useFollowUser'
import UnFollow from '../../hooks/useUnFollowUser'
import { UserProfile } from "../../types/userProfile"

// 使う親のcomponentからfollowButtonの初期値を決めるPropsをもらう
type Props = {
    followState?: boolean
    targetUser?: number
}
const EnhancedFollowButton: React.FC<Props> = ({
    followState,
    targetUser
}) => {
    // 以下はフォローボタンの状態 nullはログインをしていない状態でボタン自体がない状態
    const [followButton, setFollowButton] = useState(followState)
    const currentUser = useCurrentUser()

    const follow = useCallback(async (targetUser?: number) => {
        await Follow(targetUser)
        setFollowButton(true)
    }, [])

    const unFollow = useCallback(async (targetUser?: number) => {
        await UnFollow(targetUser)
        setFollowButton(false)
    }, [])

    // useEffect(
    //     () => {
    //         if (!(followState == undefined)) {
    //             () => setFollowButton(followState)
    //         }
    //     }
    //     , [])
    return (
        <FollowButton
            loginUserId={currentUser?.id}
            followButton={followButton}
            follow={follow}
            unFollow={unFollow}
            targetUser={targetUser}
        />
    )
}

export default EnhancedFollowButton
